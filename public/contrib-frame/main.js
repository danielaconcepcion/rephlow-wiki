
/* =====================================================================
   SECTIONS — each one is a separate block, switched with the pill menu
   ===================================================================== */
const SECTIONS = [
  { id: "parts",     label: "Parts" },
  { id: "howto",     label: "How-to guides" },
  { id: "protocols", label: "Protocols" },
  { id: "blender",   label: "Blender tools" }
];

const INTRO = {
  parts: { eyebrow: "Registry · 23 parts", title: "Parts",
    text: "The parts behind rePhlow, split into three families that mirror the three stages of the system: enzymes that pry phosphate loose from degumming effluent, a <i>Pseudomonas putida</i> chassis engineered to hoard it, and a revalorisation module that turns a second waste stream into something worth keeping. Each entry is colour-coded by status and links straight to its Registry page." },
  howto: { eyebrow: "Guides · PDF repository", title: "How-to guides",
    text: "Running an iGEM team is far more than lab work: you have to fund it, build its wiki, organise its community, measure its footprint and explain it to people who do not work in a lab. For each wall every new team hits, we wrote the solution as a standalone guide a team with no prior experience could follow — templates, worked examples, real numbers and real emails." },
  protocols: { eyebrow: "Bench-validated · 156 pages", title: "Protocols",
    text: "Every protocol below was written, run and corrected at our own bench, then rewritten so a team that has never done it can follow it. All 55 are compiled into a single book — encapsulation, genetic engineering, revalorisation and enzyme immobilisation — with a navigable index. Read it here or download it." },
  blender: { eyebrow: "Open-source · MIT", title: "Open-source Blender tools",
    text: "Modelling the rePhlow hardware in Blender meant solving the same problems any team faces when it renders a biotechnology device — and solving them with code, not by hand. We wrote the solutions as executable Python scripts and release them so another team never has to write them again." }
};

const STATUS = [
  ["green",  "Expressed correctly"],
  ["gold",   "Expressed, not soluble / no activity"],
  ["coral",  "Cytotoxic"],
  ["blue",   "Optimised / engineered"],
  ["purple", "Composite"],
  ["grey",   "Element"]
];

const PARTS = {
  imm:{label:"Enzymatic immobilisation",color:"#3f7d4a",
    desc:"Candidate phosphohydrolases expressed in E. coli for the catalytic surface of the reactor — acid phosphatases, phytases and phospholipases that release phosphate from vegetable-oil degumming effluent.",
    items:[
      {n:"AphA",role:"CDS",act:"Non-specific acid phosphatase",host:"E. coli",org:"E. coli",st:"green",sl:"Expressed correctly (ref genome BBa_K4685044)",url:"https://registry.igem.org/parts/bba-2648fx4i"},
      {n:"M2-32",role:"CDS",act:"Non-specific acid phosphatase",host:"E. coli",org:"Metagenome",st:"green",sl:"Expressed correctly (ref BBa_K2488000, not identical)",url:"https://registry.igem.org/parts/bba-26llb9mk"},
      {n:"PhyA",role:"CDS",act:"Phytase",host:"E. coli",org:"O. proteus",st:"green",sl:"Expressed correctly",url:"https://registry.igem.org/parts/bba-26i1hb2b"},
      {n:"AppA",role:"CDS",act:"Phytase",host:"E. coli",org:"Y. intermedia",st:"gold",sl:"Expressed, but not soluble",url:"https://registry.igem.org/parts/bba-267tet1z"},
      {n:"EstE1",role:"CDS",act:"Phospholipase A",host:"E. coli",org:"Metagenome",st:"gold",sl:"Expressed, but not soluble",url:"https://registry.igem.org/parts/bba-26x3ubmg"},
      {n:"Plc",role:"CDS",act:"Phospholipase C",host:"E. coli",org:"T. kodakarensis",st:"coral",sl:"Cytotoxic",url:"https://registry.igem.org/parts/bba-2676gasm"}
    ]},
  gen:{label:"Genetic engineering",color:"#1568a3",
    desc:"The Pseudomonas putida phosphorus-accumulation system — ppk1, the pstSCAB transporter and its regulatory cassettes — plus the CRISPR base-editing knockout toolkit of guide RNAs and arrays.",
    items:[
      {n:"ppk1",role:"CDS",act:"Polyphosphate kinase",host:"P. putida",org:"Ca. Accumulibacter",st:"blue",sl:"Optimised",url:"https://registry.igem.org/parts/bba-267jzvk9"},
      {n:"pstS",role:"CDS",act:"Phosphate transporter",host:"P. putida",org:"Ca. Accumulibacter",st:"blue",sl:"Optimised",url:"https://registry.igem.org/parts/bba-26s6ynnk"},
      {n:"pstC",role:"CDS",act:"Phosphate transporter",host:"P. putida",org:"Ca. Accumulibacter",st:"blue",sl:"Optimised",url:"https://registry.igem.org/parts/bba-267hldgw"},
      {n:"pstA",role:"CDS",act:"Phosphate transporter",host:"P. putida",org:"Ca. Accumulibacter",st:"blue",sl:"Optimised",url:"https://registry.igem.org/parts/bba-26sd42up"},
      {n:"pstB",role:"CDS",act:"Phosphate transporter",host:"P. putida",org:"Ca. Accumulibacter",st:"blue",sl:"Optimised",url:"https://registry.igem.org/parts/bba-26ep8j8o"},
      {n:"pstSCAB operon",role:"engineered_region",act:"Phosphate-transport operon",host:"P. putida",org:"Ca. Accumulibacter",st:"purple",sl:"Composite",url:"https://registry.igem.org/parts/bba-26mfrrwr"},
      {n:"RBS (canonical)",role:"ribosome_entry_site",act:"Ribosome binding site",host:"P. putida",org:"Synthetic",st:"grey",sl:"Element",url:"https://registry.igem.org/parts/bba-26jttesy"},
      {n:"EM7-RBS-ppk1 cassette",role:"engineered_region",act:"Constitutive ppk1 cassette",host:"P. putida",org:"Designed",st:"purple",sl:"Composite",url:"https://registry.igem.org/parts/bba-26rwv88w"},
      {n:"EM7-RBS-pstSCAB operon",role:"engineered_region",act:"Constitutive pstSCAB cassette",host:"P. putida",org:"Designed",st:"purple",sl:"Composite",url:"https://registry.igem.org/parts/bba-26r5vio0"},
      {n:"gRNA-ppx",role:"sgRNA",act:"Guide RNA (ppx knockout)",host:"P. putida",org:"Designed",st:"grey",sl:"Element",url:"https://registry.igem.org/parts/bba-26ep93v7"},
      {n:"gRNA-ppkB",role:"sgRNA",act:"Guide RNA (ppkB knockout)",host:"P. putida",org:"Designed",st:"grey",sl:"Element",url:"https://registry.igem.org/parts/bba-26x6ew3x"},
      {n:"gRNA-pitB",role:"sgRNA",act:"Guide RNA (pitB knockout)",host:"P. putida",org:"Designed",st:"grey",sl:"Element",url:"https://registry.igem.org/parts/bba-26gdvdzq"},
      {n:"gRNA3 array",role:"engineered_region",act:"Multiplexed gRNA array",host:"P. putida",org:"Designed",st:"purple",sl:"Composite",url:"https://registry.igem.org/parts/bba-26gx2w8d"}
    ]},
  rev:{label:"Revalorisation",color:"#6b4e9a",
    desc:"Dihydroxyacetone kinase (DHAK), wild-type and PROSS-stabilised, from two C. freundii strains — the enzymatic workhorse that turns recovered material into something of value.",
    items:[
      {n:"DHAK-WT-CECT 4626",role:"CDS",act:"Dihydroxyacetone kinase",host:"E. coli",org:"C. freundii CECT 4626",st:"green",sl:"Expressed correctly",url:"https://registry.igem.org/parts/bba-26icld72"},
      {n:"DHAK-WT-DSM 30040",role:"CDS",act:"Dihydroxyacetone kinase",host:"E. coli",org:"C. freundii DSM 30040",st:"gold",sl:"Expressed, no activity yet",url:"https://registry.igem.org/parts/bba-269viold"},
      {n:"DHAK-PROSS-CECT 4626",role:"CDS",act:"Stabilised DHAK (PROSS)",host:"E. coli",org:"C. freundii CECT 4626 (redesign)",st:"blue",sl:"Engineered",url:"https://registry.igem.org/parts/bba-26v70hr4"},
      {n:"DHAK-PROSS-DSM 30040",role:"CDS",act:"Stabilised DHAK (PROSS)",host:"E. coli",org:"C. freundii DSM 30040 (redesign)",st:"gold",sl:"Expressed, no activity yet",url:"https://registry.igem.org/parts/bba-26lrlccg"}
    ]}
};

const ICONS = {
  money: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  people: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/>',
  window: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M8.5 12h7M8.5 15.5h7M8.5 8.5h3"/>',
  box: '<path d="M21 8v8a2 2 0 0 1-1 1.73l-7 4a2 2 0 0 1-2 0l-7-4A2 2 0 0 1 3 16V8a2 2 0 0 1 1-1.73l7-4a2 2 0 0 1 2 0l7 4A2 2 0 0 1 21 8Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  play: '<path d="m8 3 10 6-10 12V3Z"/>',
  dna: '<path d="M4 3c0 6 16 6 16 12M4 21c0-6 16-6 16-12"/><path d="M7 4.5h10M7 19.5h10M6 8h12M6 16h12"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  down: '<path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  slides: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/>'
};

/* How-to guides. `pdf` is the id of the embedded file; `extra` adds a second download. */
const HOWTO = [
  { color: "green", icon: "money", nav: "Self-funding", title: "How to self-fund an iGEM project", fn: "How_to_self-fund_for_iGEM.pdf", pdf: "file-selffund",
    desc: "The most-requested thing we never found documented: how to actually pay for a team. Estimating your real budget, the channels to raise money, how to land sponsors, a ready-to-use sponsor email, how to explain iGEM to non-scientists, and how to secure space and materials." },
  { color: "blue", icon: "window", nav: "Building a wiki", title: "How to build an iGEM wiki", fn: "How_to_build_an_iGEM_wiki.pdf", pdf: "file-wiki",
    desc: "The wiki is the only part of the project most judges ever see, and teams treat it as a coding problem. This inverts that: map the pages, agree the layout, write the text, and only then choose between the Markdown, HTML and React templates — plus the hosting rule that can cost a team its medals." },
  { color: "coral", icon: "people", nav: "Meet-ups", title: "How to organise a meet-up", fn: "How_to_organize_a_meetup.pdf", pdf: "file-meetup",
    desc: "How to plan and run an inter-team meet-up or mini-hackathon from scratch: timeline, roles, logistics, a brainstorming framework and the exact step list we followed for the 2026 iGEM Madrid Meet Up. Reusable by any team that wants to host a regional event.",
    extra: { id: "file-kickoff", fn: "Kick off poster.pdf", label: "See our poster", pdf: true, icon: "eye" } },
  { color: "purple", icon: "chart", nav: "Life-cycle assessment", title: "How to calculate an LCA", fn: "How_to_calculate_LCA.pdf", pdf: "file-lca",
    desc: "A practical introduction to running a Life-Cycle Assessment for a synthetic-biology project: defining scope and functional unit, building the inventory, choosing impact categories and reading the results — written for teams with no environmental-engineering background." },
  { color: "gold", icon: "bulb", nav: "Entrepreneurship", title: "Entrepreneurship: from lab to market", fn: "Entrepreneurship_from_lab_to_market_rePhlow.pdf", pdf: "file-entrep",
    desc: "Turning a research project into a venture when your training is in the lab, not in business. Seven steps — design thinking, lean startup, business-model canvas, MVP, funding roadmap, pitch and Q&amp;A — each with what rePhlow took from it, and an editable 3-minute pitch-deck template to fill in.",
    extra: { id: "file-pitch", fn: "3-minute_pitch_deck_template.pptx", label: "Pitch template (.pptx)", icon: "slides",
      preview: "file-pitch-pdf", previewFn: "3-minute_pitch_deck_template.pdf", previewLabel: "See the template" } }
];

const SCRIPTS = [
  {g:"gen",k:"k-purple",num:"01",fn:"01_procedural_hydrogel_generator.py",asset:"asset-script-01",
   title:"Procedural hydrogel & core-shell generator",
   desc:"Creates a 3D model of an organic bead such as an alginate capsule and applies a procedural material — texture generated through maths rather than an image. Produces a cloudy inner core and a transparent outer shell without complex rendering. Useful for biological particles, cells or wet encapsulations."},
  {g:"gen",k:"k-purple",num:"02",fn:"02_procedural_perforated_mesh.py",asset:"asset-script-02",
   title:"Honeycomb & micro-perforated mesh shader",
   desc:"Grids, filters or perforated meshes normally need thousands of polygons. This generates the same appearance with maths and alpha masks, wrapping a hexagonal micro-perforated grid around any cylinder without adding a single vertex. For filters, meshes or vents."},
  {g:"gen",k:"k-purple",num:"03",fn:"03_macro_studio_lighting_rig.py",asset:"asset-script-03",
   title:"Macro-scale studio lighting & camera rig",
   desc:"Blender assumes one unit equals one metre, so lighting breaks down for hardware measured in millimetres. This spawns a three-point lighting setup and a tracking camera calibrated for millimetre-scale macro work."},
  {g:"sit",k:"k-blue",num:"04",fn:"04_optimized_particle_instancing.py",asset:"asset-script-04",
   title:"Optimised instancing for high-volume particles",
   desc:"Filling a bioreactor with hundreds of beads can freeze the viewport. This shares a single low-poly mesh across all copies and applies a cheap transparency material instead of physically accurate glass, keeping the viewport responsive and renders short."},
  {g:"sit",k:"k-blue",num:"05",fn:"05_parametric_hardware_engraving.py",asset:"asset-script-05",
   title:"Parametric hardware & automated engraving",
   desc:"Builds a complete device entirely through code. Shows how to generate a knurled metal texture procedurally and how to wrap and carve 3D text into a curved surface using Boolean operations."},
  {g:"sit",k:"k-blue",num:"06",fn:"06_procedural_mesh_slicer.py",asset:"asset-script-06",
   title:"Procedural mesh slicing & hinge assembly",
   desc:"Uses Blender's internal BMesh API to slice an object at an exact height coordinate — what makes exploded views and mechanical separation animations possible without cutting geometry by hand."},
  {g:"sit",k:"k-blue",num:"07",fn:"07_automated_infinite_rotation.py",asset:"asset-script-07",
   title:"Automated infinite rotation loop",
   desc:"Inserts animation keyframes and applies linear interpolation through code, producing a seamless infinite spin without acceleration artefacts at the start and end of the loop. For stirrers, rotors and our rotating bioreactor basket."}
];

/* A guide whose Download button hands over a zip with the guide and its material. */
const BUNDLES = {
  "file-selffund": { zip: "How_to_self-fund_for_iGEM.zip", files: [
    ["file-selffund", "How_to_self-fund_for_iGEM.pdf"],
    ["file-sf-short", "Short dossier iGEM 2026 rePhlow.pdf"],
    ["file-sf-dossier", "Presentation dossier iGEM 2026 - rePhlow.pdf"],
    ["file-sf-calc", "iGEM self-funding budget calculator.xlsx"]
  ] },
  "file-meetup": { zip: "How_to_organise_a_meetup.zip", files: [
    ["file-meetup", "How_to_organize_a_meetup.pdf"],
    ["file-timetable", "Timetable_meetup.pdf"],
    ["file-mu-steps", "Steps_Hackathon.pdf"],
    ["file-mu-brainstorm", "Brainstorming.pdf"],
    ["file-kickoff", "Kick off poster.pdf"],
    ["file-mu-logo1", "Logo_Kick off.png"],
    ["file-mu-logo2", "Logo 2_Kick off.png"]
  ] },
  "file-entrep": { zip: "Entrepreneurship_from_lab_to_market.zip", files: [
    ["file-entrep", "Entrepreneurship_from_lab_to_market_rePhlow.pdf"],
    ["file-pitch", "3-minute_pitch_deck_template.pptx"]
  ] }
};

/* =====================================================================
   FILE HELPERS — every file lives inside this page as base64
   ===================================================================== */
const MIME = { pdf: "application/pdf", zip: "application/zip", py: "text/x-python",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation" };
const mimeFor = fn => MIME[(fn.split(".").pop() || "").toLowerCase()] || "application/octet-stream";
/* On the wiki the files are separate files next to this page (files/), loaded only when needed. */
const FILES = {
"file-pitch-pdf": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-pitch-pdf.pdf",
"file-timetable": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-timetable.pdf",
"file-sf-dossier": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-sf-dossier.pdf",
"file-sf-short": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-sf-short.pdf",
"file-sf-calc": "files/file-sf-calc.xlsx",
"file-mu-brainstorm": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-mu-brainstorm.pdf",
"file-mu-steps": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-mu-steps.pdf",
"file-mu-logo1": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-mu-logo1.png",
"file-mu-logo2": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-mu-logo2.png",
"file-selffund": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-selffund.pdf",
"file-wiki": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-wiki.pdf",
"file-meetup": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-meetup.pdf",
"file-kickoff": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-kickoff.pdf",
"file-lca": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-lca.pdf",
"file-entrep": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-entrep.pdf",
"file-pitch": "files/file-pitch.pptx",
"file-protocol": "https://static.igem.wiki/teams/6124/wiki/contrubutions/file-protocol.pdf",
"file-parts": "files/file-parts.zip",
"asset-zip-blender": "files/asset-zip-blender.zip",
"asset-script-01": "files/asset-script-01.py",
"asset-script-02": "files/asset-script-02.py",
"asset-script-03": "files/asset-script-03.py",
"asset-script-04": "files/asset-script-04.py",
"asset-script-05": "files/asset-script-05.py",
"asset-script-06": "files/asset-script-06.py",
"asset-script-07": "files/asset-script-07.py"
};
const bytesCache = {};
function assetBytes(id) {
  if (!bytesCache[id]) bytesCache[id] = fetch(FILES[id]).then(r => {
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.arrayBuffer();
  }).then(b => new Uint8Array(b));
  return bytesCache[id];
}
const assetCopy = async id => (await assetBytes(id)).slice();
function assetUrl(id, fn) { return FILES[id]; }
function download(id, fn) {
  const a = document.createElement("a");
  a.href = assetUrl(id, fn); a.download = fn; if (/^https?:/.test(a.href)) { a.target = "_blank"; a.rel = "noopener"; }
  document.body.appendChild(a); a.click(); setTimeout(() => a.remove(), 300);
}
const assetText = async id => { try { return new TextDecoder("utf-8").decode(await assetBytes(id)); } catch (e) { return ""; } }

/* =====================================================================
   ZIP WRITER — the guides and their material are already in this page,
   so the archive is put together here, with no library and no request.
   Entries are stored, not deflated: PDFs and Office files are compressed
   already, so this costs nothing and keeps the code short.
   ===================================================================== */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
  return t;
})();
function crc32(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}
function makeZip(entries) {
  const enc = new TextEncoder(), parts = [], dir = [];
  let offset = 0;
  const now = new Date();
  const time = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xFFFF;
  const date = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xFFFF;
  for (const [name, bytes] of entries) {
    const nm = enc.encode(name), crc = crc32(bytes);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true); local.setUint16(4, 20, true); local.setUint16(6, 0x0800, true);
    local.setUint16(8, 0, true); local.setUint16(10, time, true); local.setUint16(12, date, true);
    local.setUint32(14, crc, true); local.setUint32(18, bytes.length, true); local.setUint32(22, bytes.length, true);
    local.setUint16(26, nm.length, true); local.setUint16(28, 0, true);
    parts.push(new Uint8Array(local.buffer), nm, bytes);
    const central = new DataView(new ArrayBuffer(46));
    central.setUint32(0, 0x02014b50, true); central.setUint16(4, 20, true); central.setUint16(6, 20, true);
    central.setUint16(8, 0x0800, true); central.setUint16(10, 0, true); central.setUint16(12, time, true);
    central.setUint16(14, date, true); central.setUint32(16, crc, true);
    central.setUint32(20, bytes.length, true); central.setUint32(24, bytes.length, true);
    central.setUint16(28, nm.length, true); central.setUint32(42, offset, true);
    dir.push(new Uint8Array(central.buffer), nm);
    offset += 30 + nm.length + bytes.length;
  }
  const dirBytes = dir.reduce((n, p) => n + p.length, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, entries.length, true); end.setUint16(10, entries.length, true);
  end.setUint32(12, dirBytes, true); end.setUint32(16, offset, true);
  return new Blob([...parts, ...dir, new Uint8Array(end.buffer)], { type: "application/zip" });
}
async function downloadBundle(key) {
  const b = BUNDLES[key];
  const all = await Promise.all(b.files.map(async ([id, name]) => [name, await assetBytes(id)]));
  const blob = makeZip(all);
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = b.zip;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 600);
}

/* =====================================================================
   PDF VIEWER — pdf.js is embedded in this page, so pages are drawn on a
   canvas and nothing is requested from outside iGEM.
   ===================================================================== */
/* The worker script above also runs in the page, so globalThis.pdfjsWorker exists.
   If a background worker can be created we use it; where that is blocked (a sandboxed
   frame, a strict content policy) pdf.js falls back to that main-thread handler. */
(function initPdfWorker() {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL("pdf.worker.js", document.baseURI).href;
  } catch (e) { /* no worker available: rendering happens on the main thread */ }
})();

function makeViewer(stage, pager, ids) {
  const doc = document.createElement("div");
  doc.className = "cb-doc";
  stage.innerHTML = ""; stage.appendChild(doc);
  const el = k => document.getElementById(ids[k]);
  const v = {
    pdf: null, page: 1, total: 0, zoom: 1, base: 1, pages: [], io: null, syncing: false,
    async load(bytes) {
      this.pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      this.total = this.pdf.numPages;
      const first = await this.pdf.getPage(1), vp = first.getViewport({ scale: 1 });
      this.ratio = vp.height / vp.width;
      // Fit a whole page inside the frame, so the reader sees one complete page.
      const availH = stage.clientHeight - 36, availW = stage.clientWidth - 36;
      this.base = Math.max(.25, Math.min(availH / vp.height, availW / vp.width));
      this.build();
      pager.hidden = false;
      el("total").textContent = this.total;
      this.watch();
    },
    build() {
      doc.innerHTML = "";
      this.pages = [];
      const w = Math.round(this.base * this.zoom * 100) / 100;
      for (let i = 1; i <= this.total; i++) {
        const d = document.createElement("div");
        d.className = "cb-doc__page"; d.dataset.page = i + " / " + this.total;
        d.style.width = "100%"; d.style.maxWidth = (this.baseW() * this.zoom) + "px";
        d.style.aspectRatio = "1 / " + this.ratio.toFixed(4);
        doc.appendChild(d); this.pages.push({ el: d, done: false });
      }
    },
    baseW() { const w = stage.clientWidth - 36; return Math.min(w, (stage.clientHeight - 36) / this.ratio); },
    async draw(i) {
      const slot = this.pages[i - 1];
      if (!slot || slot.done) return; slot.done = true;
      const p = await this.pdf.getPage(i);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const cssW = slot.el.clientWidth || this.baseW() * this.zoom;
      const vp0 = p.getViewport({ scale: 1 });
      const vp = p.getViewport({ scale: (cssW / vp0.width) * dpr });
      const c = document.createElement("canvas");
      c.width = vp.width; c.height = vp.height;
      slot.el.appendChild(c);
      try { await p.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise; }
      catch (e) { slot.done = false; }
    },
    watch() {
      if (this.io) this.io.disconnect();
      // Draw pages as they come close to the frame, and follow the one being read.
      this.io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          const i = this.pages.indexOf(this.pages.find(x => x.el === en.target)) + 1;
          if (en.isIntersecting) { this.draw(i); this.draw(i + 1); }
        });
        const vis = entries.filter(e => e.isIntersecting).map(e => +e.target.dataset.page.split(" / ")[0]);
        if (vis.length && !this.syncing) { this.page = Math.min(...vis); el("page").value = this.page; this.flags(); }
      }, { root: stage, rootMargin: "200px 0px" });
      this.pages.forEach(p => this.io.observe(p.el));
    },
    flags() { el("prev").disabled = this.page <= 1; el("next").disabled = this.page >= this.total; },
    go(n) {
      n = Math.max(1, Math.min(this.total, n | 0));
      this.page = n; el("page").value = n; this.flags();
      this.syncing = true;
      this.draw(n);
      this.pages[n - 1].el.scrollIntoView({ block: "start", behavior: "smooth" });
      setTimeout(() => { this.syncing = false; }, 700);
    },
    setZoom(f) {
      const at = this.page;
      this.zoom = Math.max(.5, Math.min(3, this.zoom * f));
      this.build(); this.watch(); this.go(at);
    }
  };
  el("prev").onclick = () => v.go(v.page - 1);
  el("next").onclick = () => v.go(v.page + 1);
  el("out").onclick = () => v.setZoom(1 / 1.2);
  el("in").onclick = () => v.setZoom(1.2);
  el("page").onchange = () => v.go(parseInt(el("page").value) || 1);
  return v;
}

/* A small first-page thumbnail for each guide. */
async function thumbnail(host, id) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: await assetCopy(id) }).promise;
    const p = await pdf.getPage(1);
    const vp0 = p.getViewport({ scale: 1 });
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = (host.clientWidth || 300) * dpr;
    const vp = p.getViewport({ scale: w / vp0.width });
    const c = document.createElement("canvas");
    c.width = vp.width; c.height = vp.height;
    await p.render({ canvasContext: c.getContext("2d"), viewport: vp }).promise;
    host.innerHTML = ""; host.appendChild(c);
  } catch (e) { host.innerHTML = ""; }
}

const PV_IDS = { prev: "pv-prev", next: "pv-next", page: "pv-page", total: "pv-total", out: "pv-out", in: "pv-in" };
const MV_IDS = { prev: "cb-m-prev", next: "cb-m-next", page: "cb-m-page", total: "cb-m-total", out: "cb-m-out", in: "cb-m-in" };
function viewerError(stage, id, fn) {
  stage.innerHTML = `<div class="cb-viewer__ph"><p>This page could not be drawn here. The file is still inside this page — download it to read it.</p></div>`;
}

/* =====================================================================
   RENDERING
   ===================================================================== */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const svg = k => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;
let active = "parts";

/* --- molecules in the header, in the same places as every other wiki page --- */
const HERO_MOLECULES = [[-1.08,14.15,264,127.8,.136,3.7,2],[100.58,15.44,235,195.2,.092,3.3,2],[9.55,59.63,131,335.3,.172,0,1],[88.69,56.99,145,83.9,.176,0,2],[-2.76,84.21,227,137.6,.107,3.2,2],[101.29,84.7,189,324,.18,0,2],[28.2,6.69,69,127.5,.36,0,1],[68.12,9.37,71,183,.44,0,1],[22.58,31.25,134,133.2,.17,0,1],[77.14,29.75,124,2.1,.2,0,2],[16.62,90.38,74,278.5,.51,0,2],[81.16,92.04,82,116.4,.35,0,2],[3.39,32.94,143,274.4,.27,0,1],[95.6,38.72,156,28.1,.21,0,1],[9.16,6.01,59,278.5,.42,0,1],[90.21,7.17,58,106,.41,0,1],[45.98,-3.87,64,262.3,.43,0,1],[55.56,104.54,71,351.3,.52,0,1]];
const molSvg = (suffix) => ([l,t,s,r,o,b,g]) =>
  `<svg class="hmf-mol" viewBox="0 0 200 200" style="left:${l}%;top:${t}%;width:${s}px;height:${s}px;transform:translate(-50%,-50%) rotate(${r}deg);opacity:${o};${b ? `filter:blur(${b}px);` : ""}"><use href="#hmfG${g}${suffix}"/></svg>`;
$("#hmf-layer").insertAdjacentHTML("beforeend", HERO_MOLECULES.map(molSvg("")).join(""));

/* --- molecules behind the cards (green / blue tint) --- */
(function contentMolecules() {
  const defs = $("#hmf-layer defs");
  const grad = defs.querySelector("#hmfC").cloneNode(true);
  grad.id = "hmfC2"; grad.children[0].setAttribute("stop-color", "#7fb3d5"); grad.children[1].setAttribute("stop-color", "#9dc76f");
  defs.appendChild(grad);
  ["hmfG1", "hmfG2"].forEach(id => {
    const g = defs.querySelector("#" + id).cloneNode(true);
    g.id = id + "b"; g.setAttribute("fill", "url(#hmfC2)"); g.setAttribute("stroke", "url(#hmfC2)");
    defs.appendChild(g);
  });
  const M = [[-2,3,210,40,.15,3,2],[101,6,190,200,.13,3,1],[5,18,90,300,.3,0,1],[95,22,110,120,.26,0,2],[-3,38,240,150,.12,3,1],[102,42,220,20,.13,3,2],[7,55,80,80,.32,0,2],[93,59,96,250,.28,0,1],[-1,74,200,310,.14,3,2],[100,80,180,170,.13,3,1],[4,90,70,30,.34,0,1],[96,93,74,140,.32,0,2],[28,10,56,200,.13,0,1],[70,30,60,90,.11,0,2],[34,66,64,330,.11,0,2],[64,86,58,60,.13,0,1]];
  $("#hmf-content").innerHTML = M.map(([l, t, s, r, o, b, g]) => [l, t, Math.round(s * 1.8), r, Math.min(0.5, o * 1.6), b, g]).map(molSvg("b")).join("");
})();

function intro(id) {
  const i = INTRO[id];
  return `<div class="cb-intro"><span class="cb-intro__eyebrow">${esc(i.eyebrow)}</span><h2>${esc(i.title)}</h2><p>${i.text}</p></div>`;
}

/* Left index + content, the same component the lab pages use. */
function withNav(items, content) {
  return `<div class="page-with-section-nav">
    <nav class="page-section-nav" aria-label="Jump to a section">
      <ul class="page-section-nav__list">${items.map(([id, label]) =>
        `<li><a class="page-section-nav__link" tabindex="0" data-jump="${id}">${esc(label)}</a></li>`).join("")}</ul>
      <button class="page-section-nav__top" type="button" data-top>↑ Back to top</button>
    </nav>
    <div class="cb-content">${content}</div>
  </div>`;
}

/* --- Parts --- */
function partsPanel() {
  const fams = [["imm", "Enzymatic immobilisation"], ["gen", "Genetic engineering"], ["rev", "Revalorisation"]];
  let h = `<ul class="cb-legend" id="cb-legend" aria-label="Filter by status">${STATUS.map(([c, l]) =>
    `<li><button type="button" class="cb-legend__item" data-st="${c}" aria-pressed="false"><span class="cb-dot cb-dot--${c}" aria-hidden="true"></span>${esc(l)}</button></li>`).join("")}</ul>
    <p class="cb-hint" id="cb-hint">Click a status to highlight the parts that share it</p>`;
  for (const [key] of fams) {
    const fam = PARTS[key];
    h += `<section class="cb-family cb-block" id="fam-${key}"><div class="cb-family__head" style="--fc:${fam.color}">
      <h3>${esc(fam.label)}</h3><span class="cb-family__n">${fam.items.length} parts</span>
      <p>${fam.desc}</p></div><div class="cb-grid">` +
      fam.items.map(p => `<article class="cb-part" data-st="${p.st}">
        <div class="cb-part__top">
          <div><div class="cb-part__name">${esc(p.n)}</div><span class="cb-part__role">${esc(p.role)}</span></div>
          <span class="cb-dot cb-dot--${p.st}" title="${esc(p.sl)}"></span>
        </div>
        <div class="cb-part__meta">
          <span><b>Activity</b> · ${esc(p.act)}</span>
          <span><b>Host</b> · <i>${esc(p.host)}</i></span>
          <span><b>Origin</b> · <i>${esc(p.org)}</i></span>
          <span><b>Status</b> · ${esc(p.sl)}</span>
        </div>
        <a class="cb-reglink" href="${p.url}" target="_blank" rel="noopener">View on Registry
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></a>
      </article>`).join("") + `</div></section>`;
  }
  h += `<div class="cb-banner cb-block" id="parts-files">
    <div class="cb-banner__ic">${svg("dna")}</div>
    <div class="cb-banner__txt"><h3>Sequences and documentation</h3>
      <p>Every part as an annotated SnapGene file (.dna), grouped by family, with the written documentation of the genetic-engineering branch. The same material backing the Registry entries above.</p></div>
    <button class="btn btn--primary" data-dl="file-parts" data-fn="rePhlow_Parts.zip">${svg("down")}Download sequences (.zip)</button>
  </div>`;
  return intro("parts") + withNav(fams.concat([["parts-files", "Sequences"]]), h);
}

/* --- How-to guides: one row per guide, with the cover of each PDF --- */
function howtoPanel() {
  const content = HOWTO.map((g, i) => `
    <article class="cb-guide cb-block${i % 2 ? " cb-guide--flip" : ""}" id="howto-${i}">
      <div class="cb-guide__figure">
        <span class="cb-guide__num" style="background:var(--c-${g.color})">${i + 1}</span>
        <button class="cb-guide__thumb" type="button" data-view="${g.pdf}" data-fn="${esc(g.fn)}" data-thumb="${g.pdf}" aria-label="Read ${esc(g.title)}">
          <span class="cb-guide__loading">Loading the cover…</span>
        </button>
      </div>
      <div class="cb-guide__body">
        <span class="cb-guide__eyebrow">${svg(g.icon)}Guide ${i + 1} of ${HOWTO.length}</span>
        <h3>${g.title}</h3>
        <div class="cb-guide__fn">${esc(g.fn)}</div>
        <p>${g.desc}</p>
        ${BUNDLES[g.pdf] ? `<p class="cb-pack"><b>The pack holds ${BUNDLES[g.pdf].files.length} files:</b> ${BUNDLES[g.pdf].files.map(f => esc(f[1])).join(" · ")}</p>` : ""}
        <div class="cb-guide__actions">
          <button class="btn btn--primary" data-view="${g.pdf}" data-fn="${esc(g.fn)}">${svg("eye")}Read it here</button>
          ${BUNDLES[g.pdf]
            ? `<button class="btn btn--ghost" data-bundle="${g.pdf}">${svg("box")}Download the pack (.zip)</button>`
            : `<button class="btn btn--ghost" data-dl="${g.pdf}" data-fn="${esc(g.fn)}">${svg("down")}Download</button>`}
          ${g.extra ? (g.extra.preview
            ? `<button class="btn btn--ghost" data-view="${g.extra.preview}" data-fn="${esc(g.extra.previewFn)}">${svg(g.extra.icon || "eye")}${esc(g.extra.previewLabel)}</button>
               <button class="btn btn--ghost" data-dl="${g.extra.id}" data-fn="${esc(g.extra.fn)}">${svg("down")}${esc(g.extra.label)}</button>`
            : `<button class="btn btn--ghost" data-view="${g.extra.id}" data-fn="${esc(g.extra.fn)}">${svg(g.extra.icon || "eye")}${esc(g.extra.label)}</button>`) : ""}
        </div>
      </div>
    </article>`).join("");
  return intro("howto") + withNav(HOWTO.map((g, i) => ["howto-" + i, g.nav || g.title]), content);
}

/* --- Protocols --- */
function protocolsPanel() {
  const content = `
    <div class="cb-viewer cb-block" id="proto-book">
      <div class="cb-viewer__bar">
        <span class="cb-viewer__title"><span class="cb-viewer__dot"></span>rePhlow — Book of protocols</span>
        <span class="cb-pager" id="pv-pager" hidden>
          <button class="cb-icbtn" id="pv-prev" type="button" aria-label="Previous page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18 9 12l6-6"/></svg></button>
          <span class="cb-pageind"><input id="pv-page" value="1" inputmode="numeric" aria-label="Page"> / <span id="pv-total">—</span></span>
          <button class="cb-icbtn" id="pv-next" type="button" aria-label="Next page"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg></button>
          <button class="cb-icbtn" id="pv-out" type="button" aria-label="Zoom out"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14"/></svg></button>
          <button class="cb-icbtn" id="pv-in" type="button" aria-label="Zoom in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></button>
        </span>
        <button class="btn btn--primary" data-dl="file-protocol" data-fn="rePhlow_Protocol_book.pdf">${svg("down")}Download</button>
      </div>
      <div class="cb-viewer__stage" id="pv-stage">
        <div class="cb-viewer__ph">
          <p>156 pages of bench-validated protocols, inside this page.</p>
          <button class="btn btn--primary" id="pv-open">${svg("doc")}Open the protocol book</button>
        </div>
      </div>
      <p class="cb-viewer__hint" id="pv-hint">The complete book is embedded in this page — nothing is requested from outside.</p>
    </div>
    <div class="cb-note cb-block" id="proto-inside">
      <h3>What is inside</h3>
      <div class="cb-steps">
        <div class="cb-step"><span class="cb-step__b">1</span><p><b>Encapsulation</b> — alginate beads and core-shell capsules: setup, flow rates, crosslinking, preservation, mechanical resistance, FTIR, TGA and SEM.</p></div>
        <div class="cb-step"><span class="cb-step__b">2</span><p><b>Genetic engineering</b> — competent cells, transformation, media, agarose gels, growth assays, restriction–ligation cloning and the intracellular phosphorus retention assay.</p></div>
        <div class="cb-step"><span class="cb-step__b">3</span><p><b>Revalorisation</b> — PROSS design, SpyTag/SpyCatcher, expression and induction, IMAC, dialysis, FPLC, and the DHAK and DHAK–PPK2 activity assays.</p></div>
        <div class="cb-step"><span class="cb-step__b">4</span><p><b>Enzyme immobilisation</b> — construct design, PCR, cloning, expression tests, Ni-NTA purification, phosphatase and Bradford assays, and immobilisation on MANAE-agarose.</p></div>
      </div>
      <p style="margin-top:16px"><b>Every protocol follows the same shape:</b> what you are going to get, the materials list, numbered steps, important notes and troubleshooting — so a team that has never run it can follow it without guessing.</p>
    </div>`;
  return intro("protocols") + withNav([["proto-book", "The book"], ["proto-inside", "What is inside"]], content);
}

/* --- Blender tools --- */
function blenderPanel() {
  const tile = s => `<article class="cb-tile cb-tile--${s.g === "gen" ? "purple" : "blue"}">
    <div class="cb-tile__kicker">
      <div class="cb-tile__ic">${svg("play")}</div>
      <div><h3>${s.title}</h3><div class="cb-tile__fn">${esc(s.fn)}</div></div>
    </div>
    <div><p>${s.desc}</p>
    <div class="cb-tile__actions">
      <button class="btn btn--ghost" data-code="${s.asset}" data-fn="${esc(s.fn)}">${svg("code")}View the code</button>
      <button class="btn btn--primary" data-dl="${s.asset}" data-fn="${esc(s.fn)}">${svg("down")}.py</button>
    </div></div>
  </article>`;
  const content = `
    <div class="cb-banner cb-block" id="bl-kit">
      <div class="cb-banner__ic">${svg("box")}</div>
      <div class="cb-banner__txt"><h3>The complete toolkit</h3>
        <p>Seven scripts, a README with the same descriptions below, and the MIT licence — in one archive. Or take a single script from its card.</p></div>
      <button class="btn btn--primary" data-dl="asset-zip-blender" data-fn="rephlow-blender-tools-v1.0.zip">${svg("down")}Download all (.zip)</button>
    </div>
    <div class="cb-sublabel cb-block" id="bl-gen"><span>Generalist tools</span></div>
    <div class="cb-tiles cb-tiles--stack">${SCRIPTS.filter(s => s.g === "gen").map(tile).join("")}</div>
    <div class="cb-sublabel cb-block" id="bl-sit"><span>Situational workflows</span></div>
    <div class="cb-tiles cb-tiles--stack">${SCRIPTS.filter(s => s.g === "sit").map(tile).join("")}</div>
    <div class="cb-note cb-block" id="bl-run">
      <h3>How to run these scripts</h3>
      <div class="cb-steps">
        <div class="cb-step"><span class="cb-step__b">A</span><p><b>Blender Python console.</b> Change any window to the Python console and enter instructions line by line. Useful for testing short commands, uncomfortable for long scripts.</p></div>
        <div class="cb-step"><span class="cb-step__b">B</span><p><b>Blender text editor (recommended).</b> Open the Scripting workspace, create a text block, paste the complete code and press Run Script, or <code class="inline">Alt + P</code>. The simplest route for the scripts here.</p></div>
        <div class="cb-step"><span class="cb-step__b">C</span><p><b>Terminal or external integration.</b> A secondary program can launch Blender in the background with a Python file. A standard terminal <b>cannot</b> execute scripts that <code class="inline">import bpy</code> on its own — the code needs Blender's own Python environment.</p></div>
      </div>
      <p style="margin-top:16px"><b>Requirements.</b> Blender 5.0 with its bundled Python. No external libraries, nothing to install beyond Blender itself.</p>
    </div>
    <div class="cb-note cb-block" id="bl-lic">
      <h3>Licence &amp; reuse</h3>
      <p>The seven scripts are released under the <b>MIT Licence</b>, Copyright (c) 2026 rePhlow, iGEM UCM Madrid — any team may download, modify and redistribute them, inside or outside iGEM, provided the copyright notice is kept. Each file carries the notice in its header, so the licence travels with the script. Written and tested in Blender 5.0, and used for the renders on our Hardware page: working code, not generated code. The text and figures of this page are released under <b>CC BY 4.0</b>.</p>
      <div class="cb-chips">
        <a class="cb-chip" href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener">MIT Licence ↗</a>
        <a class="cb-chip" href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0 ↗</a>
      </div>
    </div>`;
  return intro("blender") + withNav([["bl-kit", "The toolkit"], ["bl-gen", "Generalist tools"], ["bl-sit", "Situational workflows"], ["bl-run", "How to run them"], ["bl-lic", "Licence"]], content);
}

const PANELS = { parts: partsPanel, howto: howtoPanel, protocols: protocolsPanel, blender: blenderPanel };

function render() {
  $("#cb-tabs").innerHTML = SECTIONS.map(s =>
    `<button class="section-tabs__btn" role="tab" type="button" id="tab-${s.id}" aria-controls="panel-${s.id}" data-sec="${s.id}">${esc(s.label)}</button>`).join("");
  $("#cb-main").innerHTML = SECTIONS.map(s =>
    `<section class="cb-panel" id="panel-${s.id}" role="tabpanel" aria-labelledby="tab-${s.id}" hidden>${PANELS[s.id]()}</section>`).join("");
}

/* Highlight the index entry of the block being read. */
let navIO = null;
function watchBlocks(panel) {
  if (navIO) navIO.disconnect();
  const links = [...panel.querySelectorAll(".page-section-nav__link")];
  const blocks = [...panel.querySelectorAll(".cb-block")];
  if (!blocks.length) return;
  const mark = id => links.forEach(a => a.classList.toggle("is-active", a.dataset.jump === id));
  mark(blocks[0].id);
  navIO = new IntersectionObserver(entries => {
    const seen = entries.filter(e => e.isIntersecting).map(e => e.target);
    if (!seen.length) return;
    const top = blocks.filter(b => seen.includes(b))[0];
    if (top) mark(top.id);
  }, { rootMargin: "-120px 0px -60% 0px" });
  blocks.forEach(b => navIO.observe(b));
}

/* The guide covers are drawn once their panel is on screen. */
let thumbsDone = false;
function drawThumbnails() {
  if (thumbsDone) return; thumbsDone = true;
  document.querySelectorAll("[data-thumb]").forEach(el => thumbnail(el, el.dataset.thumb));
}

function setActive(id) {
  active = id;
  document.querySelectorAll(".section-tabs__btn").forEach(b => {
    const on = b.dataset.sec === id; b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on);
  });
  document.querySelectorAll(".cb-panel").forEach(p => {
    const on = p.id === "panel-" + id;
    if (on && p.hidden) { p.hidden = false; p.classList.add("is-entering"); requestAnimationFrame(() => requestAnimationFrame(() => p.classList.remove("is-entering"))); }
    else if (!on) p.hidden = true;
  });
  const panel = document.getElementById("panel-" + id);
  if (panel) watchBlocks(panel);
  if (id === "howto") drawThumbnails();
  // Keeping the open block in the address bar is a convenience: inside a sandboxed
  // preview frame it is not allowed, so it must never break the page.
  try { if (location.hash.slice(1) !== id) history.replaceState(null, "", "#" + id); } catch (e) {}
}

/* --- status filter --- */
let filterSt = null;
function applyFilter() {
  document.querySelectorAll(".cb-legend__item").forEach(b => b.setAttribute("aria-pressed", b.dataset.st === filterSt));
  let n = 0;
  document.querySelectorAll("#panel-parts .cb-grid").forEach(g => {
    g.classList.toggle("is-filtered", !!filterSt);
    g.querySelectorAll(".cb-part").forEach(c => { const m = !!filterSt && c.dataset.st === filterSt; c.classList.toggle("is-match", m); if (m) n++; });
  });
  const label = filterSt && STATUS.find(s => s[0] === filterSt)[1];
  $("#cb-hint").textContent = !filterSt ? "Click a status to highlight the parts that share it"
    : `${n} ${n === 1 ? "part" : "parts"} · ${label} · click again to show them all`;
}

/* --- modal --- */
const modal = $("#cb-modal"), mBody = $("#cb-modal-body"), mTitle = $("#cb-modal-title"),
      mCopy = $("#cb-modal-copy"), mTab = $("#cb-modal-tab"), mDl = $("#cb-modal-dl"), mPager = $("#cb-modal-pager");
let MV = null;
let lastFocus = null, mFile = null, mText = null;
function openModal() { lastFocus = document.activeElement; modal.hidden = false; document.body.classList.add("modal-open"); $("#cb-modal-close").focus(); }
function closeModal() { modal.hidden = true; document.body.classList.remove("modal-open"); mBody.innerHTML = ""; MV = null; mPager.hidden = true; if (lastFocus) lastFocus.focus(); }
async function openPdf(id, fn) {
  mTitle.textContent = fn; mFile = [id, fn]; mText = null;
  mCopy.hidden = true; mTab.hidden = false; mTab.href = assetUrl(id, fn);
  mBody.className = "cb-modal__body is-pdf"; mBody.innerHTML = "";
  mPager.hidden = true;
  openModal();
  MV = makeViewer(mBody, mPager, MV_IDS);
  try { await MV.load(await assetCopy(id)); } catch (e) { viewerError(mBody, id, fn); }
}
async function openCode(id, fn) {
  mTitle.textContent = fn; mFile = [id, fn]; mText = await assetText(id);
  mCopy.hidden = false; mCopy.textContent = "Copy"; mTab.hidden = true;
  mBody.className = "cb-modal__body is-code";
  mBody.innerHTML = ""; const pre = document.createElement("pre"); pre.textContent = mText; mBody.appendChild(pre);
  openModal();
}
mDl.onclick = () => { if (mFile) download(mFile[0], mFile[1]); };
mCopy.onclick = () => { if (mText && navigator.clipboard) { navigator.clipboard.writeText(mText); mCopy.textContent = "Copied"; setTimeout(() => mCopy.textContent = "Copy", 1400); } };
$("#cb-modal-close").onclick = closeModal;
modal.addEventListener("click", e => { if (e.target.closest("[data-close]")) closeModal(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.hidden) closeModal();
  const j = e.target.closest && e.target.closest("[data-jump]");
  if (j && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); j.click(); }
});

/* --- init --- */
render();
document.addEventListener("click", e => {
  const tab = e.target.closest(".section-tabs__btn"); if (tab) setActive(tab.dataset.sec);
  const leg = e.target.closest(".cb-legend__item"); if (leg) { filterSt = filterSt === leg.dataset.st ? null : leg.dataset.st; applyFilter(); }
  const dl = e.target.closest("[data-dl]"); if (dl) download(dl.dataset.dl, dl.dataset.fn);
  const bundle = e.target.closest("[data-bundle]"); if (bundle) downloadBundle(bundle.dataset.bundle);
  const view = e.target.closest("[data-view]"); if (view) openPdf(view.dataset.view, view.dataset.fn);
  const code = e.target.closest("[data-code]"); if (code) openCode(code.dataset.code, code.dataset.fn);
  const jump = e.target.closest("[data-jump]");
  if (jump) { const t = document.getElementById(jump.dataset.jump); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  if (e.target.closest("[data-top]")) window.scrollTo({ top: 0, behavior: "smooth" });
  if (e.target.closest("#pv-open")) openProtocolBook();
});
let PV = null;
async function openProtocolBook() {
  const stage = $("#pv-stage");
  stage.innerHTML = `<div class="cb-viewer__ph"><p>Opening the book…</p></div>`;
  PV = makeViewer(stage, $("#pv-pager"), PV_IDS);
  try { await PV.load(await assetCopy("file-protocol")); $("#pv-hint").textContent = "Use the arrows or type a page number. The complete book is loaded in this viewer."; }
  catch (e) { viewerError(stage, "file-protocol", "rePhlow_Protocol_book.pdf"); }
}
document.querySelectorAll(".navbar__item").forEach(it => it.querySelector(".navbar__link").addEventListener("click", e => {
  if (matchMedia("(max-width: 640px)").matches && !it.classList.contains("is-open")) { e.preventDefault(); document.querySelectorAll(".navbar__item").forEach(o => o.classList.remove("is-open")); it.classList.add("is-open"); }
}));
window.addEventListener("hashchange", () => { try { const h = location.hash.slice(1); if (SECTIONS.some(s => s.id === h)) setActive(h); } catch (e) {} });
let initial = ""; try { initial = (location.hash || "").replace("#", ""); } catch (e) {}
setActive(SECTIONS.some(s => s.id === initial) ? initial : "parts");
