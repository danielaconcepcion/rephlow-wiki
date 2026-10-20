/* 3.2b Full financial plan (fold-out at the end of "Business model").
   Every figure is a planning assumption of the rePhlow financial model (Business Plan V3).
   Empty strings show as "—" until the value is confirmed. */

const KPIS: [string, string, string][] = [
  ["Revenue, Year 10", "€933,660", "from €265,400 in Year 5"],
  ["EBITDA break-even", "Year 7", "+€94,947 in Year 7"],
  ["Cash position", "Positive throughout", "except a dip to −€1,846 in month 24; net cash flow positive from Year 7"],
  ["Gross margin, Year 10", "58.3%", "hardware and service combined"],
];

const EVOLUTION: [string, string, string, string][] = [
  ["Revenue", "€265,400", "€821,580", "€933,660"],
  ["EBITDA", "−€193,276", "+€94,947", "+€111,796"],
];

const MARGINS: [string, string, string][] = [
  ["Module price", "€19,000 / unit", "Set from direct cost to reach a 50% margin"],
  ["Module direct cost", "€9,460 / unit", "Alginate €30 and CaCl₂ €10 (calculated); bacterial culture €300, enzyme functionalisation €1,120, manufacture and assembly €8,000 (assumptions)"],
  ["Hardware gross margin", "50.2%", "Calculated: (19,000 − 9,460) / 19,000"],
  ["Service contract", "€4,500 / month", "Assumption; operating cost €1,200 / month per contract (monitoring and maintenance), plus energy ≈ €1,400 per module per year"],
  ["Recovered phosphorus", "€2 / kg", "Assumption; recovery cost €0.80 / kg. Only once yield and purity are demonstrated"],
  ["Revenue per installation", "≈ €58,354 / year", "Calculated by the model (Year 10)"],
  ["Combined gross margin, Year 10", "58.3%", "Calculated by the model"],
];

const PILOT: [string, string, string][] = [
  ["Pilot equipment (CAPEX)", "€69,800", "Itemised: reactor vessel €4,000, infusion pumps €4,700, coaxial injector €800, magnetic stirrer €2,900, strainer and consumables €400, filtration / separation €25,000, on-site installation €12,000, other equipment €20,000"],
  ["Full pilot programme (cash cost)", "€450,000", "Equipment plus staff, operation and regulatory costs until the first contract"],
];

/** [source, type, amount, year] */
const FUNDING: [string, string, string, string][] = [
  ["Founders", "Equity", "€20,000", "Month 16"],
  ["Prizes, sponsorship and UCM pre-incubation", "Non-dilutive", "€120,000", "Month 16"],
  ["NEOTEC (CDTI)", "Grant", "€175,000", "Year 3"],
  ["Seed round", "Equity", "€550,000", "Year 3"],
  ["ENISA", "Participative loan (6%)", "€75,000", "Year 4, repaid Year 10"],
  ["LIFE programme (EU)", "Grant", "€150,000", "Year 5"],
];
const FUNDING_TOTAL = "€1,090,000";

/** Capsule lifetime sensitivity: [reuse cycles, Year-5 gross margin]. 500 is the model assumption. */
const SENSITIVITY: [string, string][] = [
  ["50", "−10.6%"],
  ["100", "25.7%"],
  ["128", "33.6%"],
  ["250", "47.5%"],
  ["500", "54.7%"],
  ["1,000", "58.4%"],
  ["2,160", "60.3%"],
];
const ASSUMED_CYCLES = "500";

const v = (s: string) => s || "—";

export function FinancialPlan() {
  return (
    <details className="acc acc--big ent-finplan2" id="s3-finance">
      <summary>Full Financial plan</summary>
      <div className="acc-body ent-finplan__body">
        <h4>Financial plan</h4>
        <p>
          Our financial model projects rePhlow over ten years, from the first pilot to commercial operation. Every
          figure below comes from that model and is a planning assumption, not a result: rePhlow is at TRL 2–3.
          Each table states where its numbers come from, so that the assumptions can be checked, and the sensitivity
          analysis shows which one matters most.
        </p>

        <div className="ent-fin-kpis">
          {KPIS.map(([l, k, u]) => (
            <div className="ent-fin-kpi" key={l}>
              <div className="l">{l}</div>
              <div className="k">{k}</div>
              <div className="u">{u}</div>
            </div>
          ))}
        </div>

        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th></th><th>Year 5</th><th>Year 7</th><th>Year 10</th></tr>
            </thead>
            <tbody>
              {EVOLUTION.map(([r, a, b, c]) => (
                <tr key={r}><td className="rowh">{r}</td><td>{v(a)}</td><td>{v(b)}</td><td>{v(c)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Margins and where they come from</h5>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Item</th><th>Value</th><th>Source / status</th></tr>
            </thead>
            <tbody>
              {MARGINS.map(([i, val, s]) => (
                <tr key={i}><td className="rowh">{i}</td><td className="num">{val}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Pilot investment</h5>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Item</th><th>Value</th><th>Source / status</th></tr>
            </thead>
            <tbody>
              {PILOT.map(([i, val, s]) => (
                <tr key={i}><td className="rowh">{i}</td><td className="num">{val}</td><td>{s}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h5>Funding ({FUNDING_TOTAL})</h5>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr><th>Source</th><th>Type</th><th>Amount</th><th>Year</th></tr>
            </thead>
            <tbody>
              {FUNDING.map(([s, t, a, y]) => (
                <tr key={s}><td className="rowh">{s}</td><td>{t}</td><td className="num">{v(a)}</td><td>{v(y)}</td></tr>
              ))}
              <tr className="hl"><td className="rowh">Total</td><td></td><td className="num">{FUNDING_TOTAL}</td><td></td></tr>
            </tbody>
          </table>
        </div>

        <h5>Sensitivity: capsule lifetime</h5>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Reuse cycles</th>
                {SENSITIVITY.map(([c]) => (
                  <th key={c}>{c === ASSUMED_CYCLES ? `${c} (assumed)` : c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="hl">
                <td className="rowh">Gross margin, Year 5</td>
                {SENSITIVITY.map(([c, m]) => (
                  <td
                    key={c}
                    className="num"
                    style={c === ASSUMED_CYCLES ? { fontWeight: 700, color: "var(--s3)" } : m.startsWith("−") ? { color: "var(--bad)" } : undefined}
                  >
                    {m}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ent-fin-key">
          <b>The assumption that matters most: capsule lifetime.</b> Our model assumes each enzyme-functionalised
          capsule can be reused for 500 cycles before replacement, which gives a Year-5 gross margin of 54.7%. This has
          not been measured yet. At 100 cycles the margin falls to 25.7%, and at 50 cycles it turns negative (−10.6%).
          That makes capsule lifetime the first thing our pilot must measure. Under Phosphorus-as-a-Service, this risk
          stays with rePhlow rather than with the customer.
        </div>
      </div>
    </details>
  );
}
