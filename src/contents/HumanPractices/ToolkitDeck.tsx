import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import "./ToolkitDeck.css";

/**
 * Section 5.3 — "Tools other teams can reuse" (what_route_revealed.html's
 * "Aces up our sleeve" deck). Identity: a genuine fanned hand of 8 playing
 * cards — rotated, overlapping, arced by distance from centre — ported
 * directly from the prototype's own fan geometry (spread/step/ty formula)
 * and card faces (dark gradient front with corner "A♠" marks and a big
 * suit glyph; cream back with suit/counter, title, gist). Two deliberate
 * departures from the prototype, both previously approved:
 *   (a) clicking, or pressing Enter/Space on, a card opens its modal
 *       directly in one action — the 3D flip survives only as a decorative
 *       hover/focus animation, never a required intermediate step, and the
 *       prototype's separate "Open full card" button is gone (the whole
 *       card is the trigger);
 *   (b) inside the modal, the original's two tabs are replaced by both
 *       panes shown at once in a 32/68 desktop split with prev/next arrows
 *       + an "N / 8" counter for circular navigation, and each card's
 *       typed template text is kept in component state so switching cards
 *       and back doesn't lose it.
 * The modal's header/nav chrome is original to this port (not reused from
 * Model/FactorExplorer, which caused clipping when force-fit here).
 */

type Suit = "♠" | "♣" | "♦" | "♥";

const SUIT_NAME: Record<Suit, string> = {
  "♠": "Spades",
  "♣": "Clubs",
  "♦": "Diamonds",
  "♥": "Hearts",
};

interface ToolCard {
  id: string;
  suit: Suit;
  title: string;
  gist: string;
  full: string;
  flow?: string;
  templateHint: string;
  template: string;
}

const TOOLS: ToolCard[] = [
  {
    id: "compass",
    suit: "♠",
    title: "The rePhlow Guiding Compass",
    gist: "Six values, each run through Anticipate, Reflect, Engage, Act.",
    full: "We adapted the EPSRC's AREA Framework into six evaluable values (environmental restoration, circularity, biosafety by design, industrial feasibility, scientific robustness, access and fairness), each following its own Anticipate, Reflect, Engage, Act cycle. Any team can take this six-question structure and replace our values with whichever are relevant to their own project, provided each value must be evaluable through evidence, not merely stated as an intention.",
    flow: "What could this cause? → What are we assuming? → Whose knowledge are we missing? → What must change in the design?",
    templateHint: "Fill in one value at a time.",
    template:
      "VALUE NAME:\n\nWHAT THIS VALUE MEANS:\n\nANTICIPATE — What could this cause?\n\nREFLECT — What are we assuming?\n\nENGAGE — Whose knowledge are we missing?\n\nACT — What must change in the design?\n\nWHAT CHANGED IN THE PROJECT:\n\nEVIDENCE TRAIL:",
  },
  {
    id: "checkpoint",
    suit: "♣",
    title: "The Responsibility Checkpoint",
    gist: "A three-state status system, applied to every identified risk.",
    full: "A three-state system (Addressed within current scope / Partially addressed / Open) applied to every identified risk, always following the same traceable sequence. This avoids two common failures in Human Practices: overpromising beyond what has been demonstrated, or hiding what remains unresolved.",
    flow: "Concern raised → value at stake → evidence and stakeholder perspective → design response → evidence generated → remaining limitation.",
    templateHint: "One card per identified risk or concern.",
    template:
      "CONCERN RAISED:\n\nVALUE AT STAKE:\n\nEVIDENCE AND STAKEHOLDER PERSPECTIVE:\n\nDESIGN RESPONSE:\n\nEVIDENCE GENERATED:\n\nREMAINING LIMITATION:\n\nSTATUS: [ ] Open  [ ] Partially addressed  [ ] Addressed",
  },
  {
    id: "maturity",
    suit: "♦",
    title: "The maturity scale",
    gist: "Designed, Built, Tested, Validated — traced to a real conversation with CEDEX.",
    full: "This emerged directly from our conversation with CEDEX, when we realised our colorimetric assay was not equivalent to an accredited reference method. It prevents a component tested once in the lab from being communicated with the same weight as one validated through recognised methods.",
    templateHint: "Label each component of your system.",
    template:
      "COMPONENT / CLAIM:\n\n[ ] DESIGNED — a justified technical proposal exists\n[ ] BUILT — the component has been physically assembled\n[ ] TESTED — data generated under stated conditions\n[ ] VALIDATED — evidence sufficiently robust for the claim being made\n\nNOTES:",
  },
  {
    id: "loop-closure",
    suit: "♥",
    title: "The loop-closure classification",
    gist: "Six stages, from a documented perspective to a completed iteration.",
    full: "Six stages for honestly classifying how far a stakeholder interaction has progressed. It allows a clear distinction between consultative Human Practices and genuinely Integrated Human Practices, and makes explicit when a loop remains open rather than presenting it as closed.",
    flow: "Perspective documented → decision changed → change implemented → change evaluated → returned to stakeholder → further iteration completed.",
    templateHint: "Classify one stakeholder interaction.",
    template:
      "STAKEHOLDER / INTERACTION:\n\nFURTHEST STAGE REACHED:\n[ ] Perspective documented\n[ ] Decision changed\n[ ] Change implemented\n[ ] Change evaluated\n[ ] Returned to stakeholder\n[ ] Further iteration completed\n\nWHAT WOULD CLOSE THE LOOP FURTHER:",
  },
  {
    id: "decision-rules",
    suit: "♠",
    title: "Three decision rules",
    gist: "Reversibility, safety-first, and simplicity — for resolving tensions between values.",
    full: "When our six values pointed in different directions (for example, chromosomal integration versus plasmid-based reversibility), we did not rely on a fixed hierarchy, but on three explicit rules: prevent irreversible commitment while the evidence remains weak; give safety-related evidence priority over performance claims; prefer the simplest design that can answer the current experimental question without closing off later improvement. These rules are independent of organism or application and can be applied to any project involving biosafety trade-offs.",
    flow: "Avoid irreversible commitments while evidence remains limited → Prioritise safety evidence over performance gains → Use the simplest design able to answer the current question.",
    templateHint: "Apply to a specific design tension.",
    template:
      "THE TENSION (option A vs. option B):\n\nDOES OPTION A RISK AN IRREVERSIBLE COMMITMENT?\n\nWHICH OPTION HAS STRONGER SAFETY EVIDENCE?\n\nWHICH OPTION IS THE SIMPLEST ANSWER TO THE CURRENT QUESTION?\n\nDECISION:",
  },
  {
    id: "stakeholder-template",
    suit: "♥",
    title: "The stakeholder template",
    gist: "A 4-part interview shape used for every entry in Stakeholders & Voices.",
    full: "Every interview in Stakeholders & Voices follows the same structure. This template forces every conversation to end in a traceable design consequence, rather than remaining a loose quote or a group photo.",
    flow: "Why we contacted this stakeholder → what we learned → what changed in rePhlow → what this opened next.",
    templateHint: "One card per stakeholder conversation.",
    template:
      "STAKEHOLDER / DATE:\n\nWHY WE CONTACTED THEM:\n\nWHAT WE LEARNED:\n\nWHAT CHANGED IN THE PROJECT:\n\nWHAT THIS OPENED NEXT:",
  },
  {
    id: "alternatives",
    suit: "♦",
    title: "Comparing against non-biotech alternatives",
    gist: "Defining where in the nutrient cycle each approach acts, and why they're complementary.",
    full: "Before justifying why synthetic biology was relevant, we explicitly compared rePhlow against constructed wetlands and agricultural nutrient-loss policy. Any team can apply this same exercise to avoid presenting synthetic biology as the only possible solution to an environmental or social problem.",
    templateHint: "One row per alternative approach.",
    template:
      "ALTERNATIVE APPROACH:\n\nWHERE IT ACTS IN THE CYCLE:\n\nWHAT IT DOES WELL:\n\nWHERE OUR PROJECT DIFFERS OR COMPLEMENTS IT:\n\nWHY BOTH CAN COEXIST:",
  },
  {
    id: "skill-gap",
    suit: "♣",
    title: "Skill-gap analysis",
    gist: "Grow the team only in response to a limitation the project itself revealed.",
    full: "Our team grew from eight to eleven members not out of ambition, but because each addition responded to a limitation the project itself had revealed: design and communication, modelling and software, encapsulation and hardware. We recommend other teams repeat this exercise explicitly at the start of the project: first define the problem, then ask what expertise is missing to address it responsibly.",
    templateHint: "Repeat for each gap identified.",
    template:
      "PROBLEM / TASK:\n\nEXPERTISE CURRENTLY MISSING:\n\nWHO WE BROUGHT IN (OR NEED TO):\n\nWHAT LIMITATION THIS ADDRESSES:",
  },
];

/** Prototype's exact fan geometry: 8 cards spread across 78°, drooping
 * further from the centre by the square of their distance from it. */
const N = TOOLS.length;
const SPREAD = 78;
const STEP = SPREAD / (N - 1);
const FAN_GEOMETRY = TOOLS.map((_, i) => {
  const angle = -SPREAD / 2 + STEP * i;
  const dist = Math.abs(i - (N - 1) / 2);
  const ty = dist * dist * 3.2;
  return { angle, ty };
});

type FanStyle = CSSProperties & {
  "--a": string;
  "--ty": string;
  "--z": number;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 10 16" aria-hidden="true">
      <path
        d={direction === "left" ? "M8 2 2 8l6 6" : "M2 2l6 6-6 6"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolkitDeck() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Record<string, string>>(() =>
    Object.fromEntries(TOOLS.map((t) => [t.id, t.template])),
  );
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openIndex = openId ? TOOLS.findIndex((t) => t.id === openId) : -1;
  const openTool = openIndex >= 0 ? TOOLS[openIndex] : null;

  function openModal(id: string, trigger: HTMLElement) {
    lastFocused.current = trigger;
    setOpenId(id);
  }

  function closeModal() {
    setOpenId(null);
  }

  function goToOffset(offset: number) {
    if (openIndex < 0) return;
    const nextIndex = (openIndex + offset + TOOLS.length) % TOOLS.length;
    setOpenId(TOOLS[nextIndex].id);
  }

  useEffect(() => {
    if (!openTool) return;
    document.body.classList.add("modal-open");
    closeButtonRef.current?.focus();

    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") goToOffset(-1);
      if (e.key === "ArrowRight") goToOffset(1);
    }
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", onKeydown);
      lastFocused.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openTool]);

  function handleCardClick(id: string, trigger: HTMLElement) {
    openModal(id, trigger);
  }

  function handleCardKeyDown(
    event: ReactKeyboardEvent<HTMLDivElement>,
    id: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(id, event.currentTarget);
    }
  }

  return (
    <div className="hp-toolkit" id="s5-toolkit">
      <h3>Tools other teams can reuse</h3>
      <p>
        RePhlow did not only produce a technology; it produced a method. These
        eight tools were already applied and tested inside our own project,
        portable regardless of organism, problem or stage of development. Click
        a card to open it.
      </p>

      <div className="hp-toolkit__table" role="list">
        {TOOLS.map((tool, i) => {
          const { angle, ty } = FAN_GEOMETRY[i];
          return (
            <div
              role="listitem"
              key={tool.id}
              className="hp-toolkit__card"
              style={
                {
                  "--a": `${angle}deg`,
                  "--ty": `${ty}px`,
                  "--z": i,
                } as FanStyle
              }
              tabIndex={0}
              aria-label={`Ace of ${SUIT_NAME[tool.suit]}: ${tool.title}. Press to open.`}
              onClick={(e) => handleCardClick(tool.id, e.currentTarget)}
              onKeyDown={(e) => handleCardKeyDown(e, tool.id)}
            >
              <div className="hp-toolkit__card-inner">
                <div className="hp-toolkit__face hp-toolkit__face--front">
                  <div className="hp-toolkit__frame" aria-hidden="true" />
                  <span className="hp-toolkit__corner hp-toolkit__corner--tl">
                    A{tool.suit}
                  </span>
                  <span className="hp-toolkit__suit-glyph">{tool.suit}</span>
                  <span className="hp-toolkit__ace-label">
                    Ace of {SUIT_NAME[tool.suit]}
                  </span>
                  <span className="hp-toolkit__corner hp-toolkit__corner--br">
                    A{tool.suit}
                  </span>
                </div>
                <div className="hp-toolkit__face hp-toolkit__face--back">
                  <div className="hp-toolkit__top-row">
                    <span className="hp-toolkit__suit-mini">{tool.suit}</span>
                    <span className="hp-toolkit__num">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(N).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="hp-toolkit__card-title">{tool.title}</p>
                  <p className="hp-toolkit__card-gist">{tool.gist}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="hp-toolkit__hand-note">
        Eight cards, one hand. Every one began as a real decision inside
        rePhlow, not a principle we wrote down in advance —{" "}
        <strong>take whichever suits your hand</strong>.
      </p>

      {openTool && (
        <div className="hp-toolkit-modal">
          <div className="hp-toolkit-modal__backdrop" onClick={closeModal} />
          <div
            className="hp-toolkit-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="toolkit-modal-title"
          >
            <button
              type="button"
              className="hp-toolkit-modal__arrow hp-toolkit-modal__arrow--prev"
              aria-label={`Previous: ${TOOLS[(openIndex - 1 + TOOLS.length) % TOOLS.length].title}`}
              onClick={() => goToOffset(-1)}
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="hp-toolkit-modal__arrow hp-toolkit-modal__arrow--next"
              aria-label={`Next: ${TOOLS[(openIndex + 1) % TOOLS.length].title}`}
              onClick={() => goToOffset(1)}
            >
              <ArrowIcon direction="right" />
            </button>

            <div className="hp-toolkit-modal__head">
              <span className="hp-toolkit-modal__suit-big" aria-hidden="true">
                {openTool.suit}
              </span>
              <div className="hp-toolkit-modal__head-text">
                <h2 id="toolkit-modal-title">{openTool.title}</h2>
                <p className="hp-toolkit-modal__subline">
                  Ace of {SUIT_NAME[openTool.suit]}
                  <span className="hp-toolkit-modal__counter">
                    {openIndex + 1} / {TOOLS.length}
                  </span>
                </p>
              </div>
              <button
                type="button"
                className="hp-toolkit-modal__close"
                aria-label="Close"
                ref={closeButtonRef}
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="hp-toolkit-modal__panes">
              <div className="hp-toolkit-modal__pane hp-toolkit-modal__pane--how">
                <h3>How we used it</h3>
                <p>{openTool.full}</p>
                {openTool.flow && (
                  <p className="hp-toolkit-modal__flow">{openTool.flow}</p>
                )}
              </div>
              <div className="hp-toolkit-modal__divider" aria-hidden="true" />
              <div className="hp-toolkit-modal__pane hp-toolkit-modal__pane--template">
                <h3>Your template</h3>
                <p className="hp-toolkit-modal__hint">
                  {openTool.templateHint}
                </p>
                <textarea
                  className="hp-toolkit-modal__textarea"
                  spellCheck={false}
                  value={templates[openTool.id]}
                  onChange={(e) =>
                    setTemplates((prev) => ({
                      ...prev,
                      [openTool.id]: e.target.value,
                    }))
                  }
                />
                <div className="hp-toolkit-modal__actions">
                  <button
                    type="button"
                    className="hp-toolkit-modal__btn hp-toolkit-modal__btn--primary"
                    onClick={() =>
                      navigator.clipboard?.writeText(templates[openTool.id])
                    }
                  >
                    Copy template
                  </button>
                  <button
                    type="button"
                    className="hp-toolkit-modal__btn hp-toolkit-modal__btn--secondary"
                    onClick={() =>
                      setTemplates((prev) => ({
                        ...prev,
                        [openTool.id]: openTool.template,
                      }))
                    }
                  >
                    Reset to blank
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
