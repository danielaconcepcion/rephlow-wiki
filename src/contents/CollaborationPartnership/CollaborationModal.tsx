import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { PhotoStrip } from "../../components/PhotoStrip";
import {
  BARCELONA_CAROUSEL,
  BARCELONA_VISIT,
  GROUPS,
  IMG,
  KICKOFF_DAYS,
  KICKOFF_GALLERY,
  MALAGA_GALLERY,
  VISIBLE_ENTRIES,
} from "./collaborationData";
import type { EntryId, GroupId, ProgrammeItem } from "./collaborationData";

/* --------------------------------------------------------------------------
   One dialog for every object on the tables. Prev/next (buttons or ←/→)
   steps through all visible entries across the three tables; Esc or the
   backdrop closes it and focus goes back to the object that opened it.
   -------------------------------------------------------------------------- */

const HEAD_BG: Record<GroupId, string> = {
  igem: "linear-gradient(135deg, #3a2c5c, #6E5A96)",
  research: "linear-gradient(135deg, #1c4a63, #2E7D86)",
  industry: "linear-gradient(135deg, #5c2c1c, #C9572F)",
};

export function CollaborationModal({
  openId,
  onNavigate,
  onClose,
}: {
  openId: EntryId;
  onNavigate: (id: EntryId) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const idx = VISIBLE_ENTRIES.findIndex((e) => e.id === openId);
  const cur = VISIBLE_ENTRIES[idx];
  const n = VISIBLE_ENTRIES.length;
  const prev = VISIBLE_ENTRIES[(idx - 1 + n) % n];
  const next = VISIBLE_ENTRIES[(idx + 1) % n];

  // Lock page scroll while open.
  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, []);

  // Each entry opens at the top, with focus on the close button.
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (bodyRef.current) bodyRef.current.scrollTop = 0;
  }, [openId]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onNavigate(prev.id);
      else if (e.key === "ArrowRight") onNavigate(next.id);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNavigate, prev.id, next.id]);

  if (!cur) return null;

  return (
    <div className="cp-modal">
      <div className="cp-modal__backdrop" onClick={onClose} />
      <div
        className="cp-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cp-modal-title"
      >
        <button
          type="button"
          className="cp-modal__step cp-modal__step--prev"
          aria-label={`Previous: ${prev.title}`}
          onClick={() => onNavigate(prev.id)}
        >
          ‹
        </button>
        <button
          type="button"
          className="cp-modal__step cp-modal__step--next"
          aria-label={`Next: ${next.title}`}
          onClick={() => onNavigate(next.id)}
        >
          ›
        </button>

        <div
          className="cp-modal__head"
          style={{ background: HEAD_BG[cur.group] }}
        >
          <h2 id="cp-modal-title" className="cp-modal__title">
            {cur.title}
          </h2>
          <p className="cp-modal__meta">
            {GROUPS[cur.group].table}
            <span className="cp-modal__counter">
              {idx + 1} / {n}
            </span>
          </p>
          <button
            ref={closeRef}
            type="button"
            className="cp-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div ref={bodyRef} className="cp-modal__body">
          <EntryBody id={cur.id} />
        </div>
      </div>
    </div>
  );
}

function EntryBody({ id }: { id: EntryId }) {
  switch (id) {
    case "kickoff":
      return <KickoffBody />;
    case "malaga":
      return <MalagaBody />;
    case "msp":
      return <MspBody />;
    case "tcg":
      return <TcgBody />;
    case "barcelona":
      return <BarcelonaBody />;
    case "cbm":
      return <CbmBody />;
    case "iqog":
      return <IqogBody />;
    case "cib":
      return <CibBody />;
    case "bio":
      return <BioBody />;
    case "complu":
      return <CompluBody />;
  }
}

/* --- shared bits -------------------------------------------------------- */

function Logo({
  src,
  alt,
  height = 64,
}: {
  src: string;
  alt: string;
  height?: number;
}) {
  return (
    <span className="cp-logo" style={{ height }}>
      <img src={src} alt={alt} />
    </span>
  );
}

/** Dashed box naming a file the team still has to upload. */
function Pending({
  file,
  label,
  className = "",
}: {
  file: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`cp-slot ${className}`}>
      <span className="cp-slot__file">{file}</span>
      <span className="cp-slot__label">{label}</span>
    </div>
  );
}

function AlsoIn({
  links,
  tone,
}: {
  links: [string, string][];
  tone: "teal" | "rust";
}) {
  return (
    <p className="cp-also">
      <span>Also in the wiki:</span>
      {links.map(([to, label]) => (
        <Link key={to + label} to={to} className={`cp-link cp-link--${tone}`}>
          {label}
        </Link>
      ))}
    </p>
  );
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="cp-stack">{children}</div>;
}

/* --- Table 1 ------------------------------------------------------------ */

function KickoffBody() {
  const [day, setDay] = useState(0);
  return (
    <Stack>
      <div className="cp-paper-head">
        <Logo src={IMG.kickoff} alt="iGEM Kick Off Madrid 2026" height={88} />
        <p className="cp-kicker">June 24th – 26th, 2026 · Madrid</p>
      </div>
      <p className="cp-lead">
        We hosted a meetup bringing together <strong>iGEM teams</strong> for
        conferences on synthetic biology, neurobiology, biophysics, scientific
        illustration, design, and biotechnology careers, alongside{" "}
        <strong>workshops on brainstorming</strong>, science communication, and
        project pitching, as well as a <strong>mini iGEM hackathon</strong> and
        interactive group activities.
      </p>
      <p>
        Discover what we achieved and how this initiative enhanced our
        collaborations.
      </p>
      <PhotoStrip photos={KICKOFF_GALLERY} alt="iGEM kick-off meetup, Madrid" />
      <p>
        The SEBBM, the Spanish Society for Biochemistry and Molecular Biology,
        supported us in the organization of our congress by helping us connect
        with the scientific community and strengthening the academic value of
        the event. As the main scientific society coordinating biochemistry and
        molecular biology activity in Spain, SEBBM’s collaboration gave our
        congress greater visibility and credibility, allowing us to reach
        students, researchers, and professionals interested in these fields.
      </p>
      <p>
        Thanks to SEBBM’s support, we were able to build a more solid and
        inspiring scientific program, creating a space where young researchers
        and students could learn, exchange ideas, and explore the impact of
        science beyond the laboratory.
      </p>
      <div className="cp-logo-row">
        <Logo src={IMG.sebbm} alt="SEBBM" height={72} />
        <Pending
          file="sponsor-logos.png"
          label="Other sponsors"
          className="cp-slot--logo"
        />
        <Logo src={IMG.rephlow} alt="rePhlow" height={72} />
      </div>

      <h3 className="cp-h3">iGEM Community Board</h3>
      <div className="cp-split">
        <p className="cp-split__text">
          We featured the <strong>iGEM Community Board</strong> at our meetup,
          creating a space where{" "}
          <strong>
            participants could share ideas, opportunities, questions, and
            resources with other teams
          </strong>
          . It encouraged interaction beyond the scheduled activities and helped
          strengthen connections within the wider iGEM community.
        </p>
        <figure className="cp-board cp-split__aside">
          <img
            src={IMG.communityBoard}
            alt="The iGEM Community Board at the kick-off meetup"
            loading="lazy"
          />
        </figure>
      </div>

      <h3 className="cp-h3">Programme</h3>
      <div role="tablist" aria-label="Meetup days" className="cp-days">
        {KICKOFF_DAYS.map((d, i) => (
          <button
            key={d.label}
            type="button"
            role="tab"
            aria-selected={i === day}
            className={`cp-days__tab${i === day ? " is-active" : ""}`}
            onClick={() => setDay(i)}
          >
            <span className="cp-days__label">{d.label}</span>
            <span className="cp-days__date">{d.date}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={KICKOFF_DAYS[day].label}>
        {KICKOFF_DAYS[day].segments.map((seg) => (
          <div key={seg.venue} className="cp-segment">
            <div className="cp-segment__venue">
              <span>{seg.venue}</span>
              <span className="cp-segment__rule" />
            </div>
            {seg.items.map((it, i) => (
              <ProgrammeRow key={i} item={it} />
            ))}
          </div>
        ))}
      </div>
    </Stack>
  );
}

function ProgrammeRow({ item }: { item: ProgrammeItem }) {
  if (item.type !== "session") {
    return (
      <div className="cp-row">
        <span className="cp-row__time">{item.time}</span>
        <span
          className={item.type === "plain" ? "cp-row__plain" : "cp-row__break"}
        >
          {item.label}
        </span>
      </div>
    );
  }
  const colon = item.label.indexOf(": ");
  const kind = colon > -1 ? item.label.slice(0, colon) : null;
  const title = colon > -1 ? item.label.slice(colon + 2) : item.label;
  return (
    <div className="cp-row cp-row--session">
      <span className="cp-row__time">{item.time}</span>
      <div className="cp-session">
        <div>
          {kind && <span className="cp-session__kind">{kind}</span>}
          <h4 className="cp-session__title">{title}</h4>
        </div>
        <p className="cp-session__summary">{item.summary}</p>
        {item.speakers.length > 0 && (
          <div className="cp-speakers">
            {item.speakers.map((sp) => (
              <div key={sp.name}>
                <p className="cp-speaker__name">{sp.name}</p>
                <p className="cp-speaker__bio">{sp.bio}</p>
                {sp.list && (
                  <ul className="cp-speaker__list">
                    {sp.list.map((li) => (
                      <li key={li.who}>
                        <strong>{li.who}</strong> {li.what}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MalagaBody() {
  return (
    <Stack>
      <p className="cp-lead">
        We participated in the <strong>iGEM European Meetup</strong> in Málaga,
        connecting with <strong>teams from across Europe</strong> to present our
        project, exchange feedback, discuss common challenges, and explore
        opportunities for collaboration through talks, poster sessions, and
        networking activities. It was also a great opportunity to support a{" "}
        <strong>fellow Spanish iGEM team</strong> while connecting with the
        wider European community.
      </p>
      <PhotoStrip
        photos={MALAGA_GALLERY}
        alt="iGEM European Meetup Málaga '26"
      />
    </Stack>
  );
}

function MspBody() {
  return (
    <Stack>
      <div className="cp-paper-head">
        <span className="cp-logo" style={{ height: 52, padding: "8px 12px" }}>
          <img src={IMG.maastricht} alt="Maastricht University" />
        </span>
        <p className="cp-paper-head__title">
          RePhlow: A modular synthetic-biology platform for phosphorus capture
          and valorisation from industrial wastewater
        </p>
      </div>
      <p>
        The <strong>MSP-Vector</strong> is an open-access, peer-reviewed journal
        exclusive to iGEM teams, organised annually by the Maastricht University
        iGEM team. We submitted an original research paper,{" "}
        <strong>
          "RePhlow: A modular synthetic-biology platform for phosphorus capture
          and valorisation from industrial wastewater,"
        </strong>{" "}
        covering three components of the project; the enzymatic immobilisation,
        the engineered <em>Pseudomonas putida</em> chassis, and the biocatalytic
        revalorisation.
      </p>
      <p>
        The paper went through a{" "}
        <strong>month-long double-blind peer review</strong> round, in which
        each participating team reviews three papers from other teams and is
        reviewed in turn. As part of this process,{" "}
        <strong>
          we reviewed three anonymous articles submitted by other iGEM teams
        </strong>
        , each against a graded rubric with written feedback and open questions.
      </p>
      <p className="cp-pull">
        Following the review round, our article was ranked among the{" "}
        <strong>three best submissions of this year's edition</strong> and has
        been forwarded to professional editors in synthetic biology publishing
        for further feedback, which will appear alongside the article when the
        journal is published in October.
      </p>
      <p>
        Participating in MSP-Vector gave the team direct{" "}
        <strong>experience with the mechanics of scientific publishing,</strong>{" "}
        drafting a research paper under review, evaluating the work of peers
        under the same rubric we were judged against, which is a different
        discipline from writing for the wiki.
      </p>
    </Stack>
  );
}

function TcgBody() {
  return (
    <div className="cp-split">
      <div className="cp-split__text cp-stack">
        <p className="cp-lead">
          As part of the collaborative and networking initiatives between iGEM
          teams, rePhlow actively participated in the{" "}
          <strong>Trading Card Game (TCG)</strong> project organized by iGEM
          RUBochum (CatPURr project).
        </p>
        <p>
          This initiative focused on creating a{" "}
          <strong>printable collection of trading cards</strong> representing
          various iGEM 2026 teams, their projects, and their official mascots,
          to be printed and distributed and exchanged during the Grand Jamboree
          in Paris, fostering{" "}
          <strong>scientific outreach, visual identity, and engagement</strong>{" "}
          across the international iGEM community.
        </p>
      </div>
      <figure className="cp-card cp-split__aside">
        <img src={IMG.tcgCard} alt="The rePhlow trading card" loading="lazy" />
      </figure>
    </div>
  );
}

function BarcelonaBody() {
  return (
    <Stack>
      <div className="cp-logo-row">
        <Logo src={IMG.vinesys} alt="Vinesys — iGEM UPF" height={72} />
        <Logo src={IMG.rephlow} alt="rePhlow" height={72} />
      </div>
      <p className="cp-lead">
        On September 17, we visited the Vinesys team (iGEM UPF) at the{" "}
        <strong>Barcelona Biomedical Research Park (PRBB)</strong>. Mariona, the
        team’s Group Leader, welcomed us and showed us around the campus and
        their laboratories.
      </p>
      <figure className="cp-photo">
        <img
          src={BARCELONA_VISIT}
          alt="The rePhlow team with Vinesys (iGEM UPF) at the PRBB in Barcelona"
          loading="lazy"
        />
      </figure>
      <p>
        During the visit, we talked through where each project stood, explored
        ways our teams could work together, and gave each other feedback as we
        entered the final stretch before the Grand Jamboree.
      </p>
      <p>
        One idea came up quickly. Our projects start from the same resource and
        tackle two sides of the same crisis: Vinesys works on the lack of fresh
        water, and we work on what happens when water carries too many
        nutrients. We decided to tell that story together in a joint Instagram
        carousel, <strong>“Two iGEM teams, one resource: water.”</strong>
      </p>
      <PhotoStrip
        photos={BARCELONA_CAROUSEL}
        alt="“Two iGEM teams, one resource: water” carousel"
      />
      <p>
        The post presents water as “a war on two fronts.” Each team introduces
        its problem with a figure from home. For Vinesys, it is the{" "}
        <strong>2024 drought that cut Catalonia’s grape harvest by 40%</strong>.
        For us, it is the{" "}
        <strong>
          2016 algal bloom that killed 85% of the Mar Menor’s seagrass
        </strong>
        . Each team then presents its solution. Vinesys engineers soil bacteria
        that help vineyard soils hold water, so vines keep going when the rain
        doesn’t come. rePhlow engineers bacteria, encapsulated in alginate
        beads, that capture phosphate from industrial wastewater before it
        reaches rivers and seas, turning a pollutant into a valuable resource.
        The carousel closes with a shared invitation to follow both teams on the
        road to the iGEM 2026 Grand Jamboree in Paris.
      </p>
      <p className="cp-pull">
        Together, the two halves of the post show that scarcity and pollution
        are two faces of the same problem. Publishing it on both accounts
        (@igemupf and @rephlow.igem) brought each project to the other team’s
        audience. The visit and the post together strengthened our connection
        and turned a shared concern into joint science communication ahead of
        Paris.
      </p>
    </Stack>
  );
}

/* --- Table 2 ------------------------------------------------------------ */

function CbmBody() {
  return (
    <Stack>
      <div className="cp-logo-row">
        <Logo src={IMG.cbm} alt="CBM Severo Ochoa" />
        <Logo src={IMG.csic} alt="CSIC" />
      </div>
      <p>
        The collaboration between <strong>UCM</strong> and <strong>CBM</strong>{" "}
        was highly positive for both scientific experience and the overall
        development of the project. The complementary expertise of the two teams
        enabled to combine <strong>bioinformatic mining</strong> and{" "}
        <strong>experimental characterization of enzymes</strong> acting on
        phosphate-containing substrates, particularly phosphatases and
        phospholipases, with the development of{" "}
        <strong>effective enzyme immobilization strategies</strong>. This
        multidisciplinary approach strengthened the project, the relationship
        between both rePhlow and CBM PIs and opened new opportunities for joint
        research, ultimately contributing to the preparation of a{" "}
        <strong>Horizon Europe proposal</strong> under{" "}
        <strong>Cluster 6</strong>.
      </p>
      <AlsoIn
        tone="teal"
        links={[
          ["/engineering", "Engineering"],
          ["/experiments", "Experiments"],
        ]}
      />
    </Stack>
  );
}

function IqogBody() {
  return (
    <Stack>
      <div className="cp-logo-row">
        <Logo src={IMG.iqog} alt="IQOG-CSIC" />
        <Logo src={IMG.csic} alt="CSIC" />
      </div>
      <p>
        Between May and August, <strong>Marta Gil</strong>,{" "}
        <strong>Ángel Vilar</strong> and <strong>Adriana Cuadro</strong>{" "}
        completed a research stay at the{" "}
        <strong>Institute of General Organic Chemistry (IQOG-CSIC)</strong>,
        where the wet lab experiments for the revalorisation module were carried
        out.
      </p>
      <p>
        The stay took place in the{" "}
        <strong>Biocatalysis and Enzyme Evolution (BEE) group</strong>, led by{" "}
        <strong>Israel Sánchez Moreno</strong>, a group focused on identifying
        and re-engineering enzymes for organic synthesis and biocatalysis, with
        the collaboration of <strong>Eduardo García-Junceda</strong>, from the
        Advanced Biomaterials and Biotechnology group, and{" "}
        <strong>Dianelis Toledo Monterrey</strong>.
      </p>
      <p className="cp-thanks">
        We thank Israel, Eduardo and Dianelis for hosting us and for their
        guidance throughout the stay.
      </p>
      <AlsoIn
        tone="teal"
        links={[
          ["/experiments", "Experiments"],
          ["/engineering", "Engineering"],
          ["/human-practices", "Human Practices"],
        ]}
      />
    </Stack>
  );
}

function CibBody() {
  return (
    <Stack>
      <div className="cp-logo-row">
        <Logo src={IMG.cib} alt="CIB Margarita Salas" />
        <Logo src={IMG.csic} alt="CSIC" />
      </div>
      <p>
        Our interaction with the <strong>CIB-CSIC</strong> focused on supporting
        the development of our{" "}
        <strong>CRISPR-based genome engineering strategy</strong>. Their
        researchers provided us with technical guidance on the use and
        implementation of the system, helping us better understand the
        experimental workflow and key considerations for its application in{" "}
        <em>Pseudomonas putida</em>. They also supplied essential plasmids for
        our work, including <strong>pEX128 and pMBEC2</strong>, which formed the
        basis of our guide RNA assembly and cytidine base-editing experiments.
        Their support was therefore instrumental in translating our initial
        genetic engineering design into an experimentally feasible strategy.
      </p>
      <AlsoIn
        tone="teal"
        links={[
          ["/engineering", "Engineering"],
          ["/experiments", "Experiments"],
        ]}
      />
    </Stack>
  );
}

/* --- Table 3 ------------------------------------------------------------ */

function BioBody() {
  return (
    <Stack>
      <Logo src={IMG.bioOils} alt="Bio Oils Huelva" height={72} />
      <p className="cp-pull cp-pull--plain">
        Bio Oils Huelva supported our project by providing{" "}
        <strong>wastewater data and samples</strong>, helping us better
        understand the characteristics of real industrial wastewater and
        informing the development and testing of our system.
      </p>
      <AlsoIn
        tone="rust"
        links={[
          [
            "/human-practices#s3-bio-oils-donana",
            "Human Practices — Travel Archive",
          ],
          ["/experiments", "Experiments"],
          ["/engineering", "Engineering"],
        ]}
      />
    </Stack>
  );
}

function CompluBody() {
  return (
    <div className="cp-split">
      <div className="cp-split__text cp-stack">
        <div className="cp-logo-row">
          <Logo src={IMG.compluemprende} alt="Compluemprende" height={56} />
          <Logo
            src={IMG.iea}
            alt="Instituto de Emprendimiento Avanzado"
            height={56}
          />
        </div>
        <p>
          As part of the <strong>“Tuesdays with Compluemprende”</strong>{" "}
          initiative, rePhlow has taken part in a{" "}
          <strong>conversation hosted by IEA</strong>, focused on the{" "}
          <strong>entrepreneurial journey behind the project</strong>. The
          interview has explore how rePhlow evolved from a{" "}
          <strong>scientific idea into a potential real-world solution</strong>,
          while discussing the{" "}
          <strong>
            decisions, challenges, lessons learned and opportunities that have
            shaped its development
          </strong>
          . It also provided a space to reflect on our{" "}
          <strong>
            experience building a multidisciplinary student-led project
          </strong>
          , translating research into an entrepreneurial proposal, and{" "}
          <strong>
            connecting scientific innovation with market needs and societal
            impact.
          </strong>{" "}
          <strong>
            (See{" "}
            <Link to="/entrepreneurship" className="cp-link cp-link--rust">
              entrepreneurship
            </Link>
            )
          </strong>
        </p>
      </div>
      <figure className="cp-portrait cp-split__aside">
        <img
          src={IMG.compluConversation}
          alt="Tuesdays with Compluemprende conversation"
          loading="lazy"
        />
      </figure>
    </div>
  );
}
