import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { PageSectionNav } from "../components/PageSectionNav";
import type { PageSection } from "../components/PageSectionNav";
import {
  ENTRIES,
  GROUPS,
  IMG,
  BARCELONA_CAROUSEL,
  BARCELONA_VISIT,
  MALAGA_GALLERY,
  POSITION,
  SHOW_PLACEHOLDERS,
  STACK_RIGHT,
  STACK_WIDTH,
} from "./CollaborationPartnership/collaborationData";
import type {
  EntryId,
  GroupId,
} from "./CollaborationPartnership/collaborationData";
import {
  BarcelonaArt,
  BioOilsArt,
  CbmArt,
  CibArt,
  CompluArt,
  IgemDecor,
  IndustryDecor,
  IqogArt,
  KickoffArt,
  MalagaArt,
  MspArt,
  ResearchDecor,
  TcgArt,
} from "./CollaborationPartnership/DeskObjects";
import { CollaborationModal } from "./CollaborationPartnership/CollaborationModal";
import "./CollaborationPartnership/CollaborationPartnership.css";

/* --------------------------------------------------------------------------
   Collaboration and Partnership — three illustrated "tables" (iGEM
   community, research partners, industry & entrepreneurship). Each object
   on a table opens the full story for that collaboration in a dialog.
   Implements the Claude Design mock-up "Collaboration and Partnership v2".
   -------------------------------------------------------------------------- */

const SECTIONS: PageSection[] = (
  ["igem", "research", "industry"] as GroupId[]
).map((g, i) => ({
  id: GROUPS[g].sectionId,
  label: `${i + 1}. ${GROUPS[g].label}`,
}));

/** Below this table width the objects stack instead of sitting on a 16:10 table. */
const WIDE_MIN = 560;

const ART: Record<EntryId, ReactNode> = {
  kickoff: <KickoffArt />,
  malaga: <MalagaArt photo={MALAGA_GALLERY[0].src} />,
  msp: <MspArt />,
  tcg: <TcgArt />,
  barcelona: (
    <BarcelonaArt photo={BARCELONA_VISIT} slide={BARCELONA_CAROUSEL[1].src} />
  ),
  cbm: <CbmArt />,
  iqog: <IqogArt />,
  cib: <CibArt />,
  bio: <BioOilsArt />,
  complu: <CompluArt />,
};

const DECOR: Record<GroupId, ReactNode> = {
  igem: <IgemDecor />,
  research: <ResearchDecor />,
  industry: <IndustryDecor />,
};

export function CollaborationPartnership() {
  const colRef = useRef<HTMLDivElement>(null);
  const [wide, setWide] = useState(true);
  const [openId, setOpenId] = useState<EntryId | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = colRef.current;
    if (!el) return;
    const measure = () => setWide(el.getBoundingClientRect().width >= WIDE_MIN);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const open = (id: EntryId, e: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setOpenId(id);
  };
  const close = useCallback(() => {
    setOpenId(null);
    triggerRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <div className="page-with-section-nav cp-page">
        <PageSectionNav
          sections={SECTIONS}
          ariaLabel="Jump to Collaboration and Partnership table"
        />

        <div ref={colRef} className="cp-col">
          <p className="cp-notion-intro">
            <strong>Collaboration and partnerships</strong>, both{" "}
            <strong>within and beyond the iGEM community</strong>, have been
            essential to the development of rePhlow. By bringing together
            diverse perspectives, expertise and resources, these connections
            have helped us overcome technical challenges, refine our approach
            and explore the{" "}
            <strong>real-world potential of our solution</strong>. Beyond
            strengthening our project, they have shown us that meaningful
            scientific progress is driven by{" "}
            <strong>
              teamwork, knowledge-sharing and a shared commitment to innovation.
            </strong>
          </p>
          <p className="cp-intro">
            The objects on each table represent the teams and institutions we
            worked with.
          </p>

          {(Object.keys(GROUPS) as GroupId[]).map((g, i) => (
            <section
              key={g}
              id={GROUPS[g].sectionId}
              className={`cp-table-section cp-table-section--${g}`}
            >
              <header className="cp-table-head">
                <span
                  className="cp-table-head__num"
                  style={{ color: GROUPS[g].accent }}
                >
                  {i + 1}
                </span>
                <h2 className="cp-table-head__title">{GROUPS[g].label}</h2>
              </header>

              <div className="cp-table-frame">
                <div className={`cp-table${wide ? " cp-table--wide" : ""}`}>
                  {wide && DECOR[g]}
                  {ENTRIES.filter(
                    (e) =>
                      e.group === g && (!e.placeholder || SHOW_PLACEHOLDERS),
                  ).map((e) => {
                    const [l, t, w] = POSITION[e.id];
                    const style = wide
                      ? { left: `${l}%`, top: `${t}%`, width: `${w}%` }
                      : {
                          width: STACK_WIDTH[e.id],
                          alignSelf: STACK_RIGHT[e.id]
                            ? "flex-end"
                            : "flex-start",
                        };
                    return (
                      <button
                        key={e.id}
                        type="button"
                        className="cp-object"
                        style={style}
                        onClick={(ev) => open(e.id, ev)}
                        aria-label={`${e.title}${e.placeholder ? " (in preparation)" : ""} — open collaboration`}
                      >
                        {ART[e.id]}
                        <span className="cp-pill">
                          <span
                            className="cp-pill__plus"
                            style={{ background: GROUPS[g].accent }}
                          >
                            +
                          </span>
                          {e.pill}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Warm the cache for the Málaga strip so the dialog opens on real photos. */}
      <link rel="prefetch" href={IMG.compluConversation} />

      {openId && (
        <CollaborationModal
          openId={openId}
          onNavigate={setOpenId}
          onClose={close}
        />
      )}
    </>
  );
}
