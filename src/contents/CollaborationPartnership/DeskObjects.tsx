import type { CSSProperties, ReactNode } from "react";
import { IMG } from "./collaborationData";

/* --------------------------------------------------------------------------
   The illustrated objects on the three tables, and the purely decorative
   props around them (coffee, pens, plants...). Every object is drawn in
   container-query units (cqw) relative to its own box, so it scales with
   the table. One-off geometry stays inline; shared pieces live in
   CollaborationPartnership.css.
   -------------------------------------------------------------------------- */

type S = CSSProperties;

/** Absolutely-positioned art fragment. */
function P({ s, children }: { s: S; children?: ReactNode }) {
  return <span style={{ position: "absolute", ...s }}>{children}</span>;
}

/* --- Table 1 · iGEM community ------------------------------------------ */

const LANYARD_PATH =
  "M57 46 C 50 20, 22 2, 9 14 C -2 25, 10 46, 28 42 C 42 38, 54 22, 70 11 C 83 2, 99 9, 93 24 C 89 34, 73 37, 64 46";

export function KickoffArt() {
  return (
    <span className="cp-art" style={{ aspectRatio: "0.8" }}>
      <svg viewBox="0 0 100 125" aria-hidden="true" className="cp-art__svg">
        <path d={LANYARD_PATH} fill="none" stroke="#6E5A96" strokeWidth="7.5" strokeLinecap="round" />
        <path
          d={LANYARD_PATH}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.6"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
      </svg>
      <P s={{ left: "55cqw", top: "41cqw", width: "11cqw", height: "9cqw", borderRadius: "2cqw", background: "linear-gradient(180deg, #3a3a3a, #1e1e1e)" }} />
      <P
        s={{
          left: "28cqw", top: "48cqw", width: "60cqw", height: "74cqw", transform: "rotate(-4deg)",
          borderRadius: "3.5cqw", background: "#fff", boxShadow: "inset 0 0 0 1px rgba(27,35,64,0.08)",
          display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2.4cqw",
          padding: "9cqw 6cqw 0", overflow: "hidden",
        }}
      >
        <P s={{ left: "24cqw", top: "3cqw", width: "12cqw", height: "2.6cqw", borderRadius: "2cqw", background: "#e8e4dc" }} />
        <img src={IMG.kickoff} alt="" className="cp-art__badge-logo" />
        <span style={{ font: "500 4.2cqw/1 var(--font-body)", color: "var(--ink-soft)" }}>Meetup</span>
        <span style={{ font: "700 8.6cqw/0.98 var(--font-display)", color: "var(--ink)", letterSpacing: "-0.02em" }}>
          iGEM
          <br />
          kick-off
        </span>
        <span style={{ font: "500 3.7cqw/1.3 var(--font-body)", color: "var(--ink-soft)" }}>Madrid · June 24–26, 2026</span>
        <P s={{ left: 0, right: 0, bottom: 0, height: "11cqw", background: "linear-gradient(90deg, #3a2c5c, #a091c4)" }} />
      </P>
    </span>
  );
}

export function MalagaArt({ photo }: { photo: string }) {
  return (
    <span className="cp-art" style={{ aspectRatio: "0.72" }}>
      <P s={{ left: "5cqw", top: "3cqw", width: "92cqw", height: "132cqw", transform: "rotate(6deg)", borderRadius: "1.6cqw", background: "#e9e1d2" }} />
      <P
        s={{
          left: "3cqw", top: "2cqw", width: "92cqw", height: "132cqw", transform: "rotate(3.5deg)",
          borderRadius: "1.6cqw", background: "#f8f3ea", overflow: "hidden", display: "flex",
          flexDirection: "column", gap: "3cqw", padding: "9cqw 7cqw 0 14cqw",
        }}
      >
        <P s={{ left: 0, top: 0, bottom: 0, width: "6cqw", background: "linear-gradient(90deg, #1c4a63, #2E7D86)" }} />
        <span style={{ font: "700 9.6cqw/1 var(--font-display)", color: "var(--ink)", letterSpacing: "-0.02em" }}>
          iGEM European Meetup
        </span>
        <span style={{ font: "600 7.4cqw/1 var(--font-display)", color: "#6E5A96" }}>Málaga '26</span>
        <span className="cp-art__photo" style={{ aspectRatio: "1.15", marginTop: "2cqw" }}>
          <img src={photo} alt="" loading="lazy" />
        </span>
        <span style={{ font: "500 3.6cqw/1.35 var(--font-body)", color: "var(--ink-soft)" }}>
          Talks · Poster sessions · Networking
        </span>
      </P>
    </span>
  );
}

export function MspArt() {
  return (
    <span className="cp-art" style={{ aspectRatio: "0.75" }}>
      <P s={{ left: "5cqw", top: "3cqw", width: "93cqw", height: "128cqw", transform: "rotate(-2deg)", borderRadius: "1.2cqw", background: "#f1ede4", boxShadow: "0.6cqw 0.6cqw 0 #ddd6c8" }} />
      <P
        s={{
          left: "2cqw", top: "1cqw", width: "93cqw", height: "128cqw", transform: "rotate(-3.5deg)",
          borderRadius: "1.2cqw", overflow: "hidden",
          background: "linear-gradient(165deg, #1f4f45, #2d6e5c 55%, #1a4239)",
          display: "flex", flexDirection: "column", gap: "2.6cqw", padding: "7cqw 7cqw 0",
        }}
      >
        <span style={{ font: "700 15.5cqw/0.92 var(--font-display)", color: "#fff", letterSpacing: "-0.045em" }}>MSP-Vector</span>
        <span style={{ display: "block", height: "0.6cqw", background: "#e0bf6e" }} />
        <span style={{ font: "500 3.4cqw/1.3 var(--font-body)", color: "rgba(255,255,255,0.82)" }}>
          Open-access, peer-reviewed journal for iGEM teams
        </span>
        <P
          s={{
            left: "50%", top: "64cqw", width: "58cqw", height: "58cqw", transform: "translate(-50%, -50%)",
            borderRadius: "50%", border: "0.6cqw solid rgba(156,201,184,0.45)",
            background: "radial-gradient(circle, rgba(156,201,184,0.9) 0.9cqw, transparent 1.15cqw) 0 0 / 4.6cqw 4.6cqw",
            WebkitMask: "radial-gradient(circle, #000 64%, rgba(0,0,0,0.25) 66%)",
            mask: "radial-gradient(circle, #000 64%, rgba(0,0,0,0.25) 66%)",
          }}
        />
        <P s={{ left: "50%", top: "64cqw", width: "22cqw", height: "22cqw", transform: "translate(-50%, -50%)", borderRadius: "50%", background: "radial-gradient(circle at 38% 35%, #e0bf6e, #C9572F)" }} />
        <P s={{ left: "7cqw", right: "7cqw", top: "98cqw", font: "600 4.5cqw/1.2 var(--font-display)", color: "#fff" }}>
          A modular synthetic-biology platform for phosphorus capture and valorisation
        </P>
        <P s={{ left: "7cqw", bottom: "6cqw", display: "flex", alignItems: "center", gap: "2.5cqw" }}>
          <span style={{ background: "#fff", borderRadius: "1cqw", padding: "1.2cqw 2.2cqw", display: "flex" }}>
            <img src={IMG.maastricht} alt="" style={{ width: "28cqw", height: "auto" }} />
          </span>
          <span style={{ font: "600 3.6cqw/1.1 var(--font-body)", color: "#fff" }}>iGEM</span>
        </P>
      </P>
    </span>
  );
}

/** A fanned deck of trading cards: two patterned backs behind the rePhlow
 * card the teams printed for the exchange in Paris. */
export function TcgArt() {
  const card: S = {
    position: "absolute",
    borderRadius: "3cqw",
    background: "#fbf8f0",
    boxShadow: "inset 0 0 0 0.6cqw rgba(27,35,64,0.1)",
  };
  const back: S = {
    ...card,
    background:
      "repeating-linear-gradient(45deg, #6E5A96 0 2.2cqw, #5a4a7e 2.2cqw 4.4cqw)",
    border: "1.6cqw solid #fbf8f0",
  };
  return (
    <span className="cp-art" style={{ aspectRatio: "1.3" }}>
      <span style={{ ...back, left: "1cqw", top: "11cqw", width: "46cqw", height: "64cqw", transform: "rotate(-13deg)" }} />
      <span style={{ ...back, left: "16cqw", top: "7cqw", width: "46cqw", height: "64cqw", transform: "rotate(-5deg)" }} />
      <span
        style={{
          ...card, left: "33cqw", top: "2cqw", width: "50cqw", height: "70cqw", transform: "rotate(7deg)",
          padding: "2.6cqw", display: "flex", flexDirection: "column", gap: "1.8cqw", overflow: "hidden",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", font: "700 3.4cqw/1 var(--font-display)", color: "#3a2c5c" }}>
          rePhlow
          <span style={{ font: "600 2.6cqw/1 var(--font-body)", color: "var(--ink-soft)" }}>iGEM 2026</span>
        </span>
        <span className="cp-art__photo" style={{ flex: 1, borderRadius: "1.6cqw" }}>
          <img src={IMG.tcgCard} alt="" loading="lazy" />
        </span>
        <span style={{ display: "block", height: "0.5cqw", background: "#6E5A96" }} />
        <span style={{ font: "500 2.4cqw/1.25 var(--font-body)", color: "var(--ink-soft)" }}>
          Trading cards · iGEM RUBochum
        </span>
      </span>
    </span>
  );
}

/** The same triptych as before: the iGEM UPF logo, then the two panels
 * that were waiting on files — now the photo from the visit and a slide
 * from the joint carousel. */
export function BarcelonaArt({ photo, slide }: { photo: string; slide: string }) {
  const panel: S = { flex: 1, height: "82%", padding: "2.4cqw", display: "flex" };
  const pane = (src: string) => (
    <span className="cp-art__photo" style={{ flex: 1, borderRadius: "0.6cqw" }}>
      <img src={src} alt="" loading="lazy" />
    </span>
  );
  return (
    <span className="cp-art" style={{ aspectRatio: "1.5", display: "flex", alignItems: "center", transform: "rotate(-3deg)" }}>
      <span style={{ ...panel, transform: "skewY(-5deg)", background: "#fbf7ef", borderRadius: "1cqw 0 0 1cqw" }}>
        <span style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={IMG.igemBarcelona} alt="" style={{ width: "72%", height: "auto" }} />
        </span>
      </span>
      <span style={{ ...panel, transform: "skewY(5deg)", background: "linear-gradient(90deg, #e9e1d2, #f8f3ea 40%)" }}>
        {pane(photo)}
      </span>
      <span style={{ ...panel, transform: "skewY(-5deg)", background: "linear-gradient(90deg, #f1eadd, #fbf7ef 40%)", borderRadius: "0 1cqw 1cqw 0" }}>
        {pane(slide)}
      </span>
    </span>
  );
}

/* --- Table 2 · Research partners --------------------------------------- */

const NOTEBOOK_PAGE =
  "linear-gradient(rgba(46,125,134,0.12) 1px, transparent 1px) 0 0 / 100% 2.8cqw, #fbf8f0";

export function CbmArt() {
  const dot = (c: string): S => ({ width: "2cqw", height: "2cqw", borderRadius: "50%", background: c });
  const key: S = { display: "flex", alignItems: "center", gap: "1.4cqw", font: "500 2.6cqw var(--font-body)", color: "var(--ink)" };
  const h: S = { font: "600 3.2cqw/1.2 var(--font-display)", color: "var(--ink)" };
  const bars: [string, string][] = [
    ["34%", "#58b3ac"], ["88%", "#2E7D86"], ["28%", "#e0bf6e"], ["62%", "#2E7D86"], ["48%", "#C9572F"], ["74%", "#58b3ac"],
  ];
  return (
    <span className="cp-art" style={{ aspectRatio: "1.5", transform: "rotate(-2deg)" }}>
      <P s={{ inset: 0, borderRadius: "2cqw", background: "#1B2340" }} />
      <P s={{ right: "-1.4cqw", top: "9cqw", width: "3.4cqw", height: "6cqw", borderRadius: "0 0.8cqw 0.8cqw 0", background: "#f4d35e" }} />
      <P s={{ right: "-1.4cqw", top: "17cqw", width: "3.4cqw", height: "6cqw", borderRadius: "0 0.8cqw 0.8cqw 0", background: "#9CC9B8" }} />
      <P
        s={{
          left: "2cqw", top: "2cqw", width: "47.6cqw", bottom: "2cqw", borderRadius: "1.2cqw 0 0 1.2cqw",
          background: `linear-gradient(90deg, transparent 88%, rgba(0,0,0,0.08)), ${NOTEBOOK_PAGE}`,
          padding: "4cqw", display: "flex", flexDirection: "column", gap: "2cqw",
        }}
      >
        <span style={{ display: "flex", background: "#fff", borderRadius: "0.8cqw", padding: "0.8cqw 1.4cqw", alignSelf: "flex-start" }}>
          <img src={IMG.cbm} alt="" style={{ width: "26cqw", height: "auto" }} />
        </span>
        <span style={h}>Enzyme screening</span>
        <span style={{ display: "block", width: "100%", height: "11cqw", borderRadius: "0.8cqw", background: "radial-gradient(circle, #2E7D86 0.85cqw, transparent 1cqw) 0 0 / 3.2cqw 3.2cqw", opacity: 0.85 }} />
        <span style={key}><span style={dot("#2E7D86")} />Phosphatases</span>
        <span style={key}><span style={dot("#e0bf6e")} />Phospholipases</span>
      </P>
      <P
        s={{
          left: "50.4cqw", top: "2cqw", right: "2cqw", bottom: "2cqw", borderRadius: "0 1.2cqw 1.2cqw 0",
          background: `linear-gradient(90deg, rgba(0,0,0,0.08), transparent 12%), ${NOTEBOOK_PAGE}`,
          padding: "4cqw", display: "flex", flexDirection: "column", gap: "2.4cqw",
        }}
      >
        <span style={h}>Relative activity</span>
        <span style={{ display: "flex", alignItems: "flex-end", gap: "1.6cqw", height: "18cqw", paddingLeft: "1cqw", borderLeft: "0.3cqw solid var(--ink-soft)", borderBottom: "0.3cqw solid var(--ink-soft)" }}>
          {bars.map(([height, background], i) => (
            <span key={i} style={{ width: "4cqw", height, background }} />
          ))}
        </span>
        <span style={{ ...h, fontSize: "3cqw" }}>Immobilisation</span>
        <span style={{ display: "flex", gap: "1.4cqw" }}>
          {[0.25, 0.45, 0.7].map((a) => (
            <span key={a} style={{ width: "7cqw", height: "5cqw", borderRadius: "0.8cqw", background: `rgba(46,125,134,${a})` }} />
          ))}
        </span>
      </P>
    </span>
  );
}

export function IqogArt() {
  const vial = (cap: string, liquid: string): S => ({
    width: "4.4cqw", height: "10cqw", borderRadius: "0.6cqw 0.6cqw 1.2cqw 1.2cqw",
    background: `linear-gradient(180deg, ${cap} 28%, ${liquid} 28%)`,
  });
  return (
    <span className="cp-art" style={{ aspectRatio: "1.38" }}>
      <P s={{ left: "4cqw", top: "3cqw", width: "95cqw", height: "68cqw", transform: "rotate(3deg)", borderRadius: "1.6cqw", background: "linear-gradient(160deg, #2E7D86, #1c4a63)" }} />
      <P
        s={{
          left: 0, top: 0, width: "94cqw", height: "68cqw", transform: "rotate(-1.5deg)", borderRadius: "1cqw",
          background: "#fbf8f0", padding: "5cqw 5.5cqw", display: "flex", flexDirection: "column", gap: "2.6cqw",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "3cqw" }}>
          <span style={{ font: "700 6.6cqw/1 var(--font-display)", color: "#1c4a63", letterSpacing: "-0.02em" }}>IQOG-CSIC</span>
          <img src={IMG.csic} alt="" style={{ width: "24cqw", height: "auto" }} />
        </span>
        <svg viewBox="0 0 220 64" aria-hidden="true" style={{ width: "100%", height: "auto", marginTop: "1cqw" }}>
          <g fill="none" stroke="#1B2340" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M22 14 L40 4 L58 14 L58 34 L40 44 L22 34 Z" />
            <path d="M28 18 L40 11 M52 18 L52 31 M28 31 L40 37" strokeWidth="1.2" />
            <path d="M58 14 L72 6" />
            <path d="M150 18 L168 8 L186 18 L186 38 L168 48 L150 38 Z" />
            <path d="M156 22 L168 15 M180 22 L180 35 M156 35 L168 41" strokeWidth="1.2" />
            <path d="M186 18 L200 10 L214 18 M200 10 L200 0 M203 10 L203 0" />
          </g>
          <path d="M84 26 L132 26" stroke="#2E7D86" strokeWidth="2" />
          <path d="M126 21 L134 26 L126 31" fill="none" stroke="#2E7D86" strokeWidth="2" />
          <text x="108" y="18" textAnchor="middle" fontSize="10" fontFamily="Inter, sans-serif" fill="#2E7D86">
            enzyme
          </text>
        </svg>
        <span style={{ font: "600 3.4cqw/1.2 var(--font-display)", color: "var(--ink)" }}>Revalorisation module</span>
        <span style={{ font: "500 2.8cqw/1.3 var(--font-body)", color: "var(--ink-soft)" }}>
          Biocatalysis and Enzyme Evolution (BEE)
        </span>
        <P s={{ right: "6cqw", bottom: "5cqw", display: "flex", gap: "2cqw", alignItems: "flex-end" }}>
          <span style={vial("#2c4f86", "#f3e2b5")} />
          <span style={vial("#2E7D86", "#eef3f4")} />
        </P>
      </P>
    </span>
  );
}

function Plasmid({ name, ring }: { name: string; ring: string }) {
  const mask = "radial-gradient(circle, transparent 56%, #000 58%, #000 72%, transparent 74%)";
  return (
    <span style={{ position: "relative", width: "19cqw", aspectRatio: "1", flex: "none" }}>
      <P s={{ inset: 0, borderRadius: "50%", background: ring, WebkitMask: mask, mask }} />
      <P s={{ inset: 0, display: "flex", alignItems: "center", justifyContent: "center", font: "600 2.6cqw ui-monospace, Menlo, monospace", color: "var(--ink)" }}>
        {name}
      </P>
    </span>
  );
}

export function CibArt() {
  const band = (at: number): S => ({
    width: "2.6cqw",
    background: `linear-gradient(180deg, transparent ${at}%, rgba(230,240,255,0.95) ${at}% ${at + 4}%, transparent ${at + 4}%)`,
  });
  return (
    <span className="cp-art" style={{ aspectRatio: "1.78" }}>
      <P s={{ left: "2cqw", top: "2.5cqw", width: "98cqw", height: "54cqw", transform: "rotate(2deg)", borderRadius: "1.6cqw", background: "linear-gradient(160deg, #e08055, #C9572F)" }} />
      <P s={{ left: "4cqw", top: "-2.4cqw", width: "22cqw", height: "5cqw", borderRadius: "1.4cqw 1.4cqw 0 0", background: "#e08055" }} />
      <P s={{ left: "1cqw", top: "1cqw", width: "96cqw", height: "53cqw", transform: "rotate(-1deg)", borderRadius: "1cqw", background: "#f1e6d5" }} />
      <P s={{ right: "1cqw", top: "14cqw", width: "5cqw", height: "9cqw", borderRadius: "0.8cqw", background: "#1e1e1e", zIndex: 1 }} />
      <P
        s={{
          left: 0, top: 0, width: "95cqw", height: "53cqw", borderRadius: "1cqw", background: "#fbf8f0",
          padding: "3.6cqw 4cqw", display: "flex", flexDirection: "column", gap: "2.4cqw",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "3cqw" }}>
          <img src={IMG.cib} alt="" style={{ width: "15cqw", height: "auto" }} />
          <span style={{ font: "700 4.6cqw/1 var(--font-display)", color: "#8f3a1d", letterSpacing: "-0.01em" }}>CIB-CSIC</span>
          <span style={{ marginLeft: "auto", font: "500 2.3cqw/1.2 var(--font-body)", color: "var(--ink-soft)" }}>
            CRISPR-based genome engineering
          </span>
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: "3.4cqw" }}>
          <Plasmid
            name="pEX128"
            ring="conic-gradient(#6E5A96 0 22%, transparent 22% 25%, #58b3ac 25% 47%, transparent 47% 50%, #e0bf6e 50% 70%, transparent 70% 73%, #C9572F 73% 97%, transparent 97%)"
          />
          <Plasmid
            name="pMBEC2"
            ring="conic-gradient(#2E7D86 0 30%, transparent 30% 33%, #C9572F 33% 52%, transparent 52% 55%, #7C9A4E 55% 80%, transparent 80% 83%, #6E5A96 83% 97%, transparent 97%)"
          />
          {/* agarose gel */}
          <span style={{ flex: "none", width: "21cqw", height: "20cqw", borderRadius: "0.8cqw", background: "#15181f", display: "flex", justifyContent: "space-around", padding: "2cqw 1.4cqw" }}>
            <span style={{ width: "2.6cqw", background: "repeating-linear-gradient(180deg, rgba(220,232,255,0.75) 0 0.45cqw, transparent 0.45cqw 2cqw)" }} />
            <span style={band(58)} />
            <span style={band(30)} />
            <span style={band(30)} />
          </span>
        </span>
        <span style={{ alignSelf: "flex-start", padding: "1cqw 2.4cqw", borderRadius: "0.6cqw", background: "#f4d35e", font: "600 2.6cqw ui-monospace, Menlo, monospace", color: "var(--ink)" }}>
          5′ — guide RNA — 3′
        </span>
      </P>
    </span>
  );
}

/* --- Table 3 · Industry & entrepreneurship ----------------------------- */

export function BioOilsArt() {
  const flask = (radius: string, fill: string): S => ({
    width: "10cqw", height: "13cqw", border: "0.6cqw solid #1c4a63", borderRadius: radius, background: fill,
  });
  const arrow: S = { font: "600 3.4cqw var(--font-body)", color: "#1c4a63" };
  const rule = (w: string): S => ({ display: "block", height: "0.5cqw", width: w, background: "rgba(27,35,64,0.12)" });
  return (
    <span className="cp-art" style={{ aspectRatio: "1.18" }}>
      <P s={{ left: "3cqw", top: "3cqw", width: "70cqw", height: "80cqw", transform: "rotate(-1deg)", borderRadius: "1.6cqw", background: "linear-gradient(160deg, #2d6e5c, #1f4f45)" }} />
      <P
        s={{
          left: 0, top: "1cqw", width: "70cqw", height: "80cqw", transform: "rotate(-4deg)", borderRadius: "1cqw",
          background: "#fbf8f0", padding: "5cqw", display: "flex", flexDirection: "column", gap: "3cqw",
        }}
      >
        <img src={IMG.bioOils} alt="" style={{ width: "34cqw", height: "auto" }} />
        <span style={{ font: "600 3.8cqw/1.2 var(--font-display)", color: "var(--ink)" }}>Wastewater data</span>
        <span style={{ display: "flex", alignItems: "center", gap: "1.6cqw", padding: "3cqw", borderRadius: "1cqw", background: "rgba(46,125,134,0.08)" }}>
          <span style={flask("1cqw 1cqw 3cqw 3cqw", "linear-gradient(180deg, transparent 40%, #9a7a4e 40%)")} />
          <span style={arrow}>→</span>
          <span style={flask("5cqw", "linear-gradient(180deg, transparent 50%, #9CC9B8 50%)")} />
          <span style={arrow}>→</span>
          <span style={flask("1cqw", "linear-gradient(180deg, transparent 60%, #e0bf6e 60%)")} />
        </span>
        <span style={{ display: "flex", alignItems: "flex-end", gap: "1.4cqw", height: "11cqw" }}>
          {[["40%", "#2E7D86"], ["75%", "#58b3ac"], ["55%", "#e0bf6e"], ["90%", "#7C9A4E"]].map(([height, background]) => (
            <span key={background} style={{ width: "3.4cqw", height, background }} />
          ))}
          <span style={{ flex: 1, height: "0.5cqw", marginLeft: "2cqw", alignSelf: "center", background: "rgba(27,35,64,0.15)" }} />
        </span>
        <span style={rule("80%")} />
        <span style={rule("60%")} />
      </P>
      {/* sample bottle */}
      <P s={{ left: "58cqw", top: "20cqw", width: "34cqw", height: "62cqw", transform: "rotate(7deg)", filter: "drop-shadow(0 8px 8px rgba(60,35,10,0.3))" }}>
        <P s={{ left: "6cqw", top: 0, width: "22cqw", height: "9cqw", borderRadius: "1.6cqw", background: "linear-gradient(90deg, #22346a, #3b55a0 50%, #22346a)" }} />
        <P s={{ left: "8cqw", top: "8.5cqw", width: "18cqw", height: "4cqw", background: "rgba(150,95,40,0.9)" }} />
        <P
          s={{
            left: 0, top: "12cqw", width: "34cqw", height: "50cqw", borderRadius: "5cqw 5cqw 4cqw 4cqw", overflow: "hidden",
            background: "linear-gradient(90deg, rgba(110,62,18,0.95), rgba(196,128,56,0.9) 38%, rgba(150,90,30,0.95) 70%, rgba(110,62,18,0.95))",
          }}
        >
          <P s={{ left: "4cqw", top: "3cqw", width: "3cqw", height: "40cqw", borderRadius: "2cqw", background: "rgba(255,255,255,0.28)" }} />
          <P s={{ left: "3cqw", right: "3cqw", top: "14cqw", height: "21cqw", borderRadius: "1cqw", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1cqw" }}>
            <img src={IMG.bioOils} alt="" style={{ width: "22cqw", height: "auto" }} />
            <span style={{ font: "600 2.4cqw var(--font-body)", color: "var(--ink-soft)" }}>Sample</span>
          </P>
        </P>
      </P>
    </span>
  );
}

export function CompluArt() {
  const item = (c: string, label: string) => (
    <span style={{ display: "flex", alignItems: "center", gap: "2cqw", font: "500 3.4cqw var(--font-body)", color: "var(--ink)" }}>
      <span style={{ width: "3cqw", height: "3cqw", borderRadius: "50%", background: c }} />
      {label}
    </span>
  );
  return (
    <span className="cp-art" style={{ aspectRatio: "1.02" }}>
      <P s={{ left: "3cqw", top: "5cqw", width: "74cqw", height: "90cqw", transform: "rotate(5deg)", borderRadius: "1.6cqw", background: "#1c4a63" }} />
      <P
        s={{
          left: 0, top: "4cqw", width: "74cqw", height: "90cqw", transform: "rotate(3deg)", borderRadius: "1.2cqw",
          background: "#fbf8f0", padding: "11cqw 7cqw 6cqw", display: "flex", flexDirection: "column", gap: "3.4cqw",
        }}
      >
        {/* spiral binding */}
        <P s={{ left: "5cqw", right: "5cqw", top: "-2cqw", height: "6cqw", background: "radial-gradient(ellipse 1cqw 2.6cqw at 50% 50%, #2a2f3a 90%, transparent 100%) 0 0 / 4.6cqw 6cqw repeat-x" }} />
        <span style={{ font: "700 7.4cqw/1.04 var(--font-display)", color: "var(--ink)", letterSpacing: "-0.02em" }}>
          Tuesdays with Compluemprende
        </span>
        {item("#C9572F", "Entrepreneurial journey")}
        {item("#e0bf6e", "Market needs")}
        {item("#7C9A4E", "Societal impact")}
        <span style={{ display: "block", height: "0.5cqw", width: "70%", background: "rgba(27,35,64,0.12)" }} />
        <span style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: "4cqw" }}>
          <img src={IMG.compluemprende} alt="" style={{ width: "27cqw", height: "auto" }} />
          <img src={IMG.iea} alt="" style={{ width: "18cqw", height: "auto" }} />
        </span>
      </P>
      {/* microphone */}
      <P s={{ left: "66cqw", top: "36cqw", width: "30cqw", height: "64cqw", transform: "rotate(-20deg)", filter: "drop-shadow(0 8px 8px rgba(30,20,10,0.35))" }}>
        <P s={{ left: "3cqw", top: 0, width: "24cqw", height: "28cqw", borderRadius: "12cqw 12cqw 6cqw 6cqw", background: "radial-gradient(circle, #555a64 0.6cqw, transparent 0.8cqw) 0 0 / 2.2cqw 2.2cqw, #2a2d33" }} />
        <P s={{ left: "1cqw", top: "25cqw", width: "28cqw", height: "11cqw", borderRadius: "1.4cqw", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={IMG.compluemprende} alt="" style={{ width: "24cqw", height: "auto" }} />
        </P>
        <P s={{ left: "10cqw", top: "36cqw", width: "10cqw", height: "28cqw", borderRadius: "1.4cqw 1.4cqw 3cqw 3cqw", background: "linear-gradient(90deg, #1f2228, #3d414a 45%, #1f2228)" }} />
      </P>
    </span>
  );
}

/* --- Decorative props (wide tables only) ------------------------------- */

/** Box positioned in table %, with its own cqw scale. */
function Prop({ s, children }: { s: S; children?: ReactNode }) {
  return (
    <div aria-hidden="true" className="cp-prop" style={s}>
      {children}
    </div>
  );
}

const LEAVES = [0, 52, 104, 156, 208, 260, 312];

function Plant({ s, pot, turn = 0 }: { s: S; pot: string; turn?: number }) {
  return (
    <Prop s={{ aspectRatio: "1", filter: "saturate(0.85) drop-shadow(0 6px 6px rgba(40,15,5,0.3))", ...s }}>
      <P s={{ left: "18cqw", top: "18cqw", width: "64cqw", height: "64cqw", borderRadius: "50%", background: pot }} />
      {LEAVES.map((r, i) => (
        <P
          key={r}
          s={{
            left: "50cqw", top: "50cqw", width: "22cqw", height: "44cqw",
            borderRadius: "50% 50% 46% 46% / 62% 62% 38% 38%", transformOrigin: "50% 100%",
            transform: `translate(-50%, -100%) rotate(${r + turn}deg)`,
            background: i % 2 ? "#6a9a4a" : "#4f7a3a",
          }}
        />
      ))}
    </Prop>
  );
}

function Coffee({ s, saucer }: { s: S; saucer: string }) {
  return (
    <Prop s={{ aspectRatio: "1", filter: "saturate(0.85) drop-shadow(0 4px 5px rgba(40,15,5,0.25))", ...s }}>
      <P s={{ inset: 0, borderRadius: "50%", background: saucer }} />
      <P s={{ left: "14cqw", top: "14cqw", width: "72cqw", height: "72cqw", borderRadius: "50%", background: "#fff", boxShadow: "inset 0 -2cqw 4cqw rgba(0,0,0,0.08)" }} />
      <P s={{ left: "22cqw", top: "22cqw", width: "56cqw", height: "56cqw", borderRadius: "50%", background: "radial-gradient(circle at 40% 38%, #6b4429, #3a2214 70%)" }} />
      <P s={{ left: "83cqw", top: "42cqw", width: "18cqw", height: "16cqw", borderRadius: "0 8cqw 8cqw 0", border: "4cqw solid #fff", borderLeft: 0 }} />
    </Prop>
  );
}

function Clip({ l, t, c, r }: { l: number; t: number; c: string; r: number }) {
  return (
    <div
      aria-hidden="true"
      className="cp-prop"
      style={{ left: `${l}%`, top: `${t}%`, width: "2.1%", aspectRatio: "0.42", border: `2px solid ${c}`, borderRadius: 99, transform: `rotate(${r}deg)` }}
    />
  );
}

function Calculator({ s }: { s: S }) {
  return (
    <Prop s={{ aspectRatio: "0.72", filter: "saturate(0.8) drop-shadow(0 5px 5px rgba(28,50,70,0.3))", ...s }}>
      <P s={{ inset: 0, borderRadius: "8cqw", background: "#263252", padding: "9cqw", display: "flex", flexDirection: "column", gap: "7cqw" }}>
        <span style={{ display: "block", height: "22cqw", borderRadius: "3cqw", background: "#9fb59a" }} />
        <span style={{ flex: 1, borderRadius: "3cqw", background: "radial-gradient(circle, #4a5778 6cqw, transparent 6.5cqw) 0 0 / 20.5cqw 17cqw" }} />
      </P>
    </Prop>
  );
}

const sticky = (from: string, to: string, shadow: string): S => ({
  aspectRatio: "1", background: `linear-gradient(180deg, ${from}, ${to})`, boxShadow: `0 3px 4px ${shadow}`,
});
const pen = (body: string, cut: number, shadow: string): S => ({
  borderRadius: 99, background: `linear-gradient(90deg, ${body} ${cut}%, #c9c3b8 ${cut}%)`, boxShadow: `0 3px 3px ${shadow}`,
});

export function IgemDecor() {
  return (
    <>
      <Coffee s={{ left: "40%", top: "7%", width: "9.5%" }} saucer="#efe6da" />
      <Prop s={{ left: "53%", top: "12%", width: "5.2%", aspectRatio: "1", filter: "drop-shadow(0 3px 3px rgba(40,15,5,0.3))" }}>
        <P
          s={{
            inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, #fff, #d9d4e6 70%)",
            border: "5cqw solid #b9b1cf", display: "flex", alignItems: "center", justifyContent: "center",
            font: "700 26cqw var(--font-display)", color: "#3a2c5c",
          }}
        >
          iGEM
        </P>
      </Prop>
      <Prop s={{ left: "46%", top: "30%", width: "4.4%", aspectRatio: "1", transform: "rotate(-18deg)", filter: "drop-shadow(0 2px 2px rgba(40,15,5,0.3))" }}>
        <P s={{ inset: 0, borderRadius: "0 100% 0 100%", background: "#7C9A4E", border: "3px solid #fff" }} />
      </Prop>
      <Prop s={{ left: "56%", top: "31%", width: "4%", aspectRatio: "1", filter: "drop-shadow(0 2px 2px rgba(40,15,5,0.3))" }}>
        <P s={{ inset: 0, borderRadius: "50% 0 50% 50%", transform: "rotate(-45deg)", background: "#58b3ac", border: "3px solid #fff" }} />
      </Prop>
      <Plant s={{ left: "87%", top: "3%", width: "11%" }} pot="radial-gradient(circle, #4a3626 52%, #c97b54 54%, #b8693f 100%)" />
      <Prop s={{ left: "5%", top: "88%", width: "17%", aspectRatio: "3.4", transform: "rotate(-14deg)", filter: "saturate(0.85) drop-shadow(0 4px 4px rgba(40,15,5,0.3))" }}>
        <P s={{ left: 0, top: "4cqw", width: "92cqw", height: "6.5cqw", borderRadius: "3cqw 1cqw 1cqw 3cqw", background: "linear-gradient(180deg, #3d5a9e, #2b437c)" }} />
        <P s={{ left: "90cqw", top: "5.5cqw", width: "8cqw", height: "3.5cqw", clipPath: "polygon(0 0, 100% 50%, 0 100%)", background: "#c9c3b8" }} />
        <P s={{ left: "6cqw", top: "15cqw", width: "88cqw", height: "6.5cqw", borderRadius: "3cqw 1cqw 1cqw 3cqw", background: "linear-gradient(180deg, #e8b850, #c99a35)" }} />
        <P s={{ left: "92cqw", top: "16.5cqw", width: "7cqw", height: "3.5cqw", clipPath: "polygon(0 0, 100% 50%, 0 100%)", background: "#c9c3b8" }} />
      </Prop>
      <Clip l={90} t={47} c="#8fa8c9" r={28} />
      <Clip l={92.5} t={50} c="#e0bf6e" r={-12} />
      <Clip l={50} t={52} c="#c9c3b8" r={64} />
    </>
  );
}

export function ResearchDecor() {
  const shadow = "rgba(28,50,70,0.2)";
  return (
    <>
      {/* tube rack */}
      <Prop s={{ left: "87%", top: "4%", width: "10%", aspectRatio: "1.3", filter: "saturate(0.85) drop-shadow(0 4px 5px rgba(28,50,70,0.25))" }}>
        <P s={{ inset: 0, borderRadius: "8cqw", background: "radial-gradient(circle, #f3f6f8 6cqw, #e0bf6e 6.5cqw, #e0bf6e 8cqw, transparent 8.5cqw) 3cqw 3cqw / 19cqw 19cqw, #2c4f86" }} />
      </Prop>
      {/* petri dish */}
      <Prop
        s={{
          left: "45.5%", top: "6%", width: "8%", aspectRatio: "1", borderRadius: "50%", boxShadow: "0 3px 6px rgba(28,50,70,0.18)",
          background:
            "radial-gradient(circle at 30% 40%, rgba(226,232,180,0.9) 6%, transparent 7%), radial-gradient(circle at 62% 58%, rgba(226,232,180,0.9) 5%, transparent 6%), radial-gradient(circle at 48% 30%, rgba(226,232,180,0.8) 4%, transparent 5%), radial-gradient(circle, rgba(232,226,180,0.55) 66%, rgba(255,255,255,0.7) 68%, rgba(255,255,255,0.35) 100%)",
        }}
      />
      <Calculator s={{ left: "5%", top: "60%", width: "10.5%", transform: "rotate(-8deg)" }} />
      {/* safety glasses */}
      <Prop s={{ left: "79%", top: "68%", width: "16%", aspectRatio: "2.6", transform: "rotate(-10deg)", opacity: 0.9 }}>
        <P s={{ left: "4cqw", top: "6cqw", width: "42cqw", height: "26cqw", borderRadius: "6cqw 6cqw 14cqw 14cqw", border: "2.4cqw solid #1c3159", background: "rgba(255,255,255,0.35)" }} />
        <P s={{ left: "54cqw", top: "6cqw", width: "42cqw", height: "26cqw", borderRadius: "6cqw 6cqw 14cqw 14cqw", border: "2.4cqw solid #1c3159", background: "rgba(255,255,255,0.35)" }} />
      </Prop>
      <Prop s={{ left: "18%", top: "86%", width: "13%", aspectRatio: "14", transform: "rotate(-14deg)", ...pen("#1c3159", 80, "rgba(28,50,70,0.25)") }} />
      <Prop s={{ left: "18%", top: "58%", width: "8%", transform: "rotate(7deg)", ...sticky("#f4d35e", "#ecc84d", shadow) }} />
      {/* graph paper */}
      <Prop
        s={{
          left: "87%", top: "44%", width: "10%", aspectRatio: "0.8", transform: "rotate(5deg)", boxShadow: "0 3px 5px rgba(28,50,70,0.18)",
          background: "linear-gradient(rgba(46,125,134,0.18) 1px, transparent 1px) 0 0 / 100% 9px, linear-gradient(90deg, rgba(46,125,134,0.18) 1px, transparent 1px) 0 0 / 9px 100%, #fbfaf6",
        }}
      />
      {/* eppendorf */}
      <Prop
        s={{
          left: "77%", top: "50%", width: "2%", aspectRatio: "0.3", transform: "rotate(30deg)", boxShadow: `0 2px 3px ${shadow}`,
          borderRadius: "30% 30% 50% 50% / 10% 10% 90% 90%", background: "linear-gradient(180deg, #2c4f86 18%, rgba(255,255,255,0.8) 18%)",
        }}
      />
      <Clip l={48} t={46} c="#2c4f86" r={40} />
      <Clip l={77} t={88} c="#7C9A4E" r={-30} />
    </>
  );
}

export function IndustryDecor() {
  const shadow = "rgba(60,40,15,0.2)";
  return (
    <>
      <Plant s={{ left: "88%", top: "3%", width: "10%" }} pot="radial-gradient(circle, #4a3626 52%, #f2ede4 54%, #ddd5c7 100%)" turn={20} />
      <Coffee s={{ left: "44%", top: "73%", width: "9%" }} saucer="radial-gradient(rgba(90,55,20,0.25) 1px, transparent 1.4px) 0 0 / 5px 5px, #b98d5b" />
      <Calculator s={{ left: "88%", top: "64%", width: "9%", transform: "rotate(9deg)" }} />
      <Prop s={{ left: "5%", top: "79%", width: "7.5%", transform: "rotate(-6deg)", ...sticky("#f4d35e", "#ecc84d", shadow) }} />
      <Prop s={{ left: "13.5%", top: "83%", width: "6.5%", transform: "rotate(8deg)", ...sticky("#9CC9B8", "#8fbdab", shadow) }} />
      <Prop s={{ left: "23%", top: "85%", width: "15%", aspectRatio: "16", transform: "rotate(-8deg)", ...pen("#1B2340", 82, "rgba(60,40,15,0.25)") }} />
      <Prop s={{ left: "25%", top: "90%", width: "14%", aspectRatio: "16", transform: "rotate(-4deg)", ...pen("#e0bf6e", 84, "rgba(60,40,15,0.25)") }} />
      {/* planning sketch */}
      <Prop s={{ left: "58%", top: "76%", width: "14%", aspectRatio: "1.6", transform: "rotate(-3deg)", opacity: 0.92 }}>
        <P s={{ inset: 0, background: "#fbf8f0", boxShadow: "0 3px 5px rgba(60,40,15,0.18)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "0 8cqw" }}>
          <span style={{ width: "12cqw", height: "12cqw", borderRadius: "50%", border: "1.2cqw solid #7C9A4E" }} />
          <span style={{ flex: 1, height: "1.2cqw", margin: "0 3cqw", background: "#4A5170" }} />
          <span style={{ width: "12cqw", height: "12cqw", border: "1.2cqw solid #C9572F" }} />
          <span style={{ flex: 1, height: "1.2cqw", margin: "0 3cqw", background: "#4A5170" }} />
          <span style={{ width: "12cqw", height: "12cqw", borderRadius: "50%", border: "1.2cqw solid #2E7D86" }} />
        </P>
      </Prop>
      <Clip l={47.5} t={12} c="#8a8f9c" r={22} />
      <Clip l={48} t={34} c="#C9572F" r={-35} />
    </>
  );
}
