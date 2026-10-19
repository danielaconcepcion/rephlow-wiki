/**
 * The four illustrated scenes of "The Problem".
 *
 * Each step's plate is drawn in the page (see Home.tsx); what this file
 * adds is everything that has to be generated or that moves with the
 * scroll: the phosphate ions leaving the pipe, the algae closing over
 * the surface, the oxygen molecules going out one by one, and the fish
 * turning over. Ported as-is from the team's `rePhlow-home v2`
 * prototype, so the geometry, seeds and thresholds are the ones the
 * design was tuned with.
 */

const SVGNS = "http://www.w3.org/2000/svg";

/** Deterministic PRNG: the same seed always draws the same scene. */
function rng(seed: number) {
  let t = (seed | 0) * 9301 + 49297;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Attrs = Record<string, string | number>;

function mk<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attrs: Attrs,
  parent: Element | null,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVGNS, tag);
  for (const key in attrs) node.setAttribute(key, String(attrs[key]));
  if (parent) parent.appendChild(node);
  return node;
}

function c01(v: number) {
  return Math.max(0, Math.min(1, v));
}

/** Plate palette — the tones of the wiki's own illustrations. */
const INK = { po4: "#d97a50", po4Line: "#a9502e", po4Light: "#f1b892" };

type Meter = HTMLElement;
type SceneUpdate = (p: number, meter: Meter) => number;

export function initScenes(root: HTMLElement): () => void {
  const el = (id: string) => root.querySelector(`#${id}`);

  // --- Step 01: phosphate leaves the pipe and spreads through the river
  const S1_ORIGIN = "translate(174px,98px)";
  const s1: {
    parts: { el: SVGGElement; x: number; y: number; on: boolean }[];
    plume: SVGElement | null;
  } = { parts: [], plume: null };
  {
    const g = el("s1-particles");
    const r = rng(4);
    const N = 34;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const x = Math.min(372, 180 + r() * (30 + t * 190));
      const y = Math.min(222, 102 + r() * (22 + t * 118));
      const pos = mk("g", { class: "p-pos" }, g);
      pos.style.transform = S1_ORIGIN;
      pos.style.opacity = "0";
      const drift = mk("g", { class: "p-drift" }, pos);
      drift.style.animationDelay = (-r() * 5).toFixed(2) + "s";
      // phosphate ion: a central P and four oxygens
      const rot = r() * Math.PI;
      for (let k = 0; k < 4; k++) {
        const a = rot + (k * Math.PI) / 2;
        mk(
          "line",
          {
            x1: 0,
            y1: 0,
            x2: (Math.cos(a) * 4.6).toFixed(2),
            y2: (Math.sin(a) * 4.6).toFixed(2),
            stroke: INK.po4Line,
            "stroke-width": 1.1,
            "stroke-linecap": "round",
          },
          drift,
        );
      }
      for (let k = 0; k < 4; k++) {
        const a = rot + (k * Math.PI) / 2;
        mk(
          "circle",
          {
            cx: (Math.cos(a) * 4.6).toFixed(2),
            cy: (Math.sin(a) * 4.6).toFixed(2),
            r: 1.7,
            fill: INK.po4Light,
            stroke: INK.po4Line,
            "stroke-width": 0.7,
          },
          drift,
        );
      }
      mk(
        "circle",
        { r: 3, fill: INK.po4, stroke: INK.po4Line, "stroke-width": 0.9 },
        drift,
      );
      mk("circle", { cx: -1, cy: -1, r: 0.9, fill: "#ffffff", opacity: 0.7 }, drift);
      s1.parts.push({ el: pos, x, y, on: false });
    }
    s1.plume = el("s1-plume") as SVGElement | null;
  }

  const update1: SceneUpdate = (p, meter) => {
    const n = Math.round(p * s1.parts.length);
    s1.parts.forEach((q, i) => {
      const on = i < n;
      if (on === q.on) return;
      q.on = on;
      q.el.style.opacity = on ? "1" : "0";
      q.el.style.transform = on
        ? `translate(${q.x}px,${q.y}px)`
        : S1_ORIGIN;
    });
    if (s1.plume) {
      s1.plume.style.transform = `scale(${(0.4 + p * 1.6).toFixed(3)})`;
      s1.plume.setAttribute("opacity", (0.12 + p * 0.4).toFixed(2));
    }
    meter.textContent = (0.02 + p * 2.38).toFixed(2) + " mg/L";
    meter.classList.toggle("is-alert", p > 0.6);
    return p;
  };

  // --- Step 02: algae cover the surface, the water clouds and the light goes out
  const s2: {
    blobs: { el: SVGGElement; t: number }[];
    fils: { el: SVGPathElement; t: number }[];
    rays: SVGElement | null;
    sun: SVGElement | null;
    tint: SVGElement | null;
  } = { blobs: [], fils: [], rays: null, sun: null, tint: null };
  {
    const mat = el("s2-mat");
    const fil = el("s2-fil");
    const r = rng(9);
    const greens = ["#9cc27a", "#abcd89", "#8bb56a", "#b6d494", "#94bc72"];
    for (let i = 0; i < 26; i++) {
      const cx = i * 16 + r() * 10 - 4;
      const cy = 71 + r() * 3.5;
      const rx = 9 + r() * 8;
      const ry = 3.6 + r() * 2.6;
      const b = mk("g", { class: "s2-blob" }, mat);
      mk(
        "ellipse",
        {
          cx: cx.toFixed(1),
          cy: cy.toFixed(1),
          rx: rx.toFixed(1),
          ry: ry.toFixed(1),
          fill: greens[i % greens.length],
          stroke: "#5f8f45",
          "stroke-width": 1.2,
        },
        b,
      );
      mk(
        "ellipse",
        {
          cx: (cx - rx * 0.3).toFixed(1),
          cy: (cy - ry * 0.32).toFixed(1),
          rx: (rx * 0.28).toFixed(1),
          ry: (ry * 0.3).toFixed(1),
          fill: "#d3e7bb",
          opacity: 0.85,
        },
        b,
      );
      mk(
        "circle",
        {
          cx: (cx + rx * 0.35).toFixed(1),
          cy: (cy + ry * 0.1).toFixed(1),
          r: 1.1,
          fill: "#6f9a4f",
          opacity: 0.6,
        },
        b,
      );
      b.style.transform = "scale(0)";
      s2.blobs.push({ el: b, t: r() * 0.72 });
    }
    for (let j = 0; j < 13; j++) {
      const x = 12 + r() * 376;
      const L = 40 + r() * 100;
      const a = (r() > 0.5 ? 1 : -1) * (6 + r() * 6);
      const sway = mk("g", { class: "s2-sway" }, fil);
      sway.style.animationDelay = (-r() * 4).toFixed(2) + "s";
      const path = mk(
        "path",
        {
          class: "s2-fil",
          d:
            "M" +
            x.toFixed(1) +
            ",74 q" +
            a.toFixed(1) +
            "," +
            (L * 0.25).toFixed(1) +
            " 0," +
            (L * 0.5).toFixed(1) +
            " t0," +
            (L * 0.5).toFixed(1),
          fill: "none",
          stroke: "#5f8a3c",
          "stroke-width": 2,
          "stroke-linecap": "round",
          opacity: 0.8,
          pathLength: 1,
          "stroke-dasharray": 1,
          "stroke-dashoffset": 1,
        },
        sway,
      );
      s2.fils.push({ el: path, t: 0.15 + r() * 0.6 });
    }
    s2.rays = el("s2-rays") as SVGElement | null;
    s2.sun = el("s2-sun") as SVGElement | null;
    s2.tint = el("s2-tint") as SVGElement | null;
  }

  const update2: SceneUpdate = (p, meter) => {
    s2.blobs.forEach((b) => {
      b.el.style.transform = p > b.t ? "scale(1)" : "scale(0)";
    });
    s2.fils.forEach((f) => {
      f.el.setAttribute("stroke-dashoffset", p > f.t ? "0" : "1");
    });
    if (s2.rays) s2.rays.style.opacity = (1 - p * 0.95).toFixed(3);
    if (s2.sun) s2.sun.style.opacity = (1 - p * 0.45).toFixed(3);
    if (s2.tint) s2.tint.style.opacity = (p * 0.42).toFixed(3);
    const cover = Math.round(p * 92);
    meter.textContent = cover + "%";
    meter.classList.toggle("is-alert", cover > 60);
    return p;
  };

  // --- Step 03: dead algae sink, microorganisms multiply and eat the O₂
  const s3: {
    bub: SVGGElement[];
    flakes: SVGGElement[];
    bact: SVGGElement[];
    o2: { el: SVGGElement; k: number }[];
  } = { bub: [], flakes: [], bact: [], o2: [] };
  {
    const r = rng(21);
    const gb = el("s3-bub");
    const gf = el("s3-flakes");
    const gc = el("s3-bact");
    const go = el("s3-o2");
    for (let i = 0; i < 16; i++) {
      const v = mk("g", { class: "vis" }, gb);
      const bx = 20 + r() * 250;
      const br = 2 + r() * 3;
      const c = mk("g", { class: "bub" }, v);
      mk(
        "circle",
        {
          cx: bx.toFixed(1),
          cy: 214,
          r: br.toFixed(1),
          fill: "#ffffff",
          "fill-opacity": 0.12,
          stroke: "#e6f1ec",
          "stroke-width": 1.1,
        },
        c,
      );
      mk(
        "circle",
        {
          cx: (bx - br * 0.35).toFixed(1),
          cy: (214 - br * 0.35).toFixed(1),
          r: (br * 0.28).toFixed(1),
          fill: "#ffffff",
          opacity: 0.8,
        },
        c,
      );
      c.style.animationDuration = (3 + r() * 3).toFixed(2) + "s";
      c.style.animationDelay = (-r() * 6).toFixed(2) + "s";
      s3.bub.push(v);
    }
    // dissolved O₂: roughly one molecule per mg/L
    const spots: [number, number][] = [
      [302, 84],
      [344, 98],
      [318, 124],
      [360, 140],
      [298, 158],
      [340, 176],
      [364, 112],
      [318, 196],
    ];
    spots.forEach((pt) => {
      const vo = mk(
        "g",
        { class: "vis", transform: `translate(${pt[0]},${pt[1]})` },
        go,
      );
      const d = mk("g", { class: "p-drift" }, vo);
      d.style.animationDelay = (-r() * 5).toFixed(2) + "s";
      mk(
        "circle",
        { cx: -2.8, r: 3.8, fill: "#d9eeee", stroke: "#9fc6c4", "stroke-width": 1 },
        d,
      );
      mk(
        "circle",
        { cx: 2.8, r: 3.8, fill: "#d9eeee", stroke: "#9fc6c4", "stroke-width": 1 },
        d,
      );
      mk("circle", { cx: -3.8, cy: -1.2, r: 1, fill: "#ffffff" }, d);
      s3.o2.push({ el: vo, k: r() });
    });
    s3.o2.sort((a, b) => a.k - b.k);
    for (let j = 0; j < 14; j++) {
      const vf = mk("g", { class: "vis" }, gf);
      vf.style.opacity = "0";
      const x = 10 + r() * 380;
      const y = 36 + r() * 20;
      const f = mk(
        "path",
        {
          class: "flake",
          d:
            "M" +
            x.toFixed(1) +
            "," +
            y.toFixed(1) +
            " c3,-2 6,-1 7,1 c1,2 -1,4 -4,4 c-3,0 -4,-3 -3,-5z",
          fill: ["#8f8549", "#76733e", "#a39756"][j % 3],
          stroke: "#5a5530",
          "stroke-width": 0.6,
        },
        vf,
      );
      f.style.animationDuration = (5 + r() * 3).toFixed(2) + "s";
      f.style.animationDelay = (-r() * 8).toFixed(2) + "s";
      s3.flakes.push(vf);
    }
    // decomposing bacteria, drawn like the wiki's own illustrations
    for (let k = 0; k < 14; k++) {
      const bx = 30 + r() * 240;
      const by = 150 + r() * 62;
      const rot = (r() * 70 - 35).toFixed(0);
      const sc = (0.9 + r() * 0.5).toFixed(2);
      const vb = mk(
        "g",
        {
          class: "vis",
          transform: `translate(${bx.toFixed(1)},${by.toFixed(1)}) rotate(${rot}) scale(${sc})`,
        },
        gc,
      );
      vb.style.opacity = "0";
      const b = mk("g", { class: "bact" }, vb);
      b.style.animationDelay = (-r() * 1.6).toFixed(2) + "s";
      mk(
        "path",
        {
          d: "M-7,0 q-3,-3 -6,0 t-5,0 M-7,1 q-2,3 -5,2",
          fill: "none",
          stroke: "#8a78b8",
          "stroke-width": 0.9,
          "stroke-linecap": "round",
        },
        b,
      );
      mk(
        "path",
        {
          d: "M-7,-1.5 C-7,-5 -2,-5.5 2,-4.5 C6,-3.5 8,-2 7.5,1 C7,4 3,4.5 -1,4 C-5,3.6 -7,2 -7,-1.5 Z",
          fill: "#b6a7d8",
          stroke: "#7a68a8",
          "stroke-width": 1.1,
        },
        b,
      );
      mk("circle", { cx: 2.5, cy: -1.5, r: 1.4, fill: "#d8cfee" }, b);
      mk("circle", { cx: -3, cy: 1, r: 0.9, fill: "#d8cfee" }, b);
      s3.bact.push(vb);
    }
  }

  const update3: SceneUpdate = (p, meter) => {
    const gone = Math.round(p * 15);
    s3.bub.forEach((b, i) => {
      b.style.opacity = i < s3.bub.length - gone ? "1" : "0";
    });
    const n = Math.round(p * 14);
    s3.flakes.forEach((f, i) => {
      f.style.opacity = i < n ? "1" : "0";
    });
    s3.bact.forEach((b, i) => {
      b.style.opacity = i < n ? "1" : "0";
    });
    const v = 8 - p * 6.5;
    const keep = Math.round(v);
    s3.o2.forEach((o, i) => {
      o.el.style.opacity = i < keep ? "1" : "0";
    });
    meter.textContent = v.toFixed(1) + " mg/L" + (v < 2 ? " · hypoxic" : "");
    meter.classList.toggle("is-alert", v < 2);
    return 1 - p;
  };

  // --- Step 04: the water runs out of oxygen and the fish turn over
  const s4: {
    fish: {
      el: SVGGElement;
      float: SVGGElement;
      y: number;
      limit: number;
      dead: boolean;
    }[];
  } = { fish: [] };
  {
    const g = el("s4-fish");
    const murk = el("s4-murk");
    const r = rng(33);
    for (let m = 0; m < 34; m++) {
      mk(
        "circle",
        {
          cx: (r() * 640).toFixed(1),
          cy: (34 + r() * 166).toFixed(1),
          r: (0.8 + r() * 1.8).toFixed(1),
          fill: "#cdd4a8",
          opacity: (0.08 + r() * 0.14).toFixed(2),
        },
        murk,
      );
    }
    const spots: [number, number][] = [
      [110, 98],
      [215, 160],
      [322, 90],
      [430, 150],
      [532, 104],
      [275, 190],
    ];
    const colors = ["#e0a46e", "#8db4cc", "#d9bf72", "#a3c482", "#dc9a8c", "#b3d3d6"];
    const limits = [0.14, 0.3, 0.46, 0.6, 0.74, 0.88];
    const LINE = "rgba(30, 36, 24, 0.5)";
    spots.forEach((s, i) => {
      const fish = mk(
        "g",
        { class: "fish", transform: `translate(${s[0]},${s[1]})` },
        g,
      );
      const fl = mk("g", { class: "fish-float" }, fish);
      const flip = mk("g", { class: "fish-flip" }, fl);
      const swim = mk("g", { class: "fish-swim" }, flip);
      swim.style.setProperty("--dur", (6 + r() * 4).toFixed(1) + "s");
      swim.style.animationDelay = (-r() * 8).toFixed(2) + "s";
      mk(
        "path",
        {
          class: "fish-body fish-tail",
          d: "M-15,0 C-20,-4 -25,-9 -29,-10 C-27,-4 -27,4 -29,10 C-25,9 -20,4 -15,0 Z",
          fill: colors[i],
          stroke: LINE,
          "stroke-width": 1.2,
          "stroke-linejoin": "round",
        },
        swim,
      );
      mk(
        "path",
        {
          class: "fish-body",
          d: "M-17,0 C-12,-10 4,-12 15,-4 C18,-2 19,0 18,1 C17,3 16,4 14,5 C4,11 -12,10 -17,0 Z",
          fill: colors[i],
          stroke: LINE,
          "stroke-width": 1.2,
        },
        swim,
      );
      mk(
        "path",
        {
          d: "M-8,4.5 C-2,7.5 6,7.5 11,4.5",
          fill: "none",
          stroke: "#ffffff",
          "stroke-opacity": 0.4,
          "stroke-width": 1.4,
          "stroke-linecap": "round",
        },
        swim,
      );
      mk(
        "path",
        {
          d: "M-6,-9 C-2,-15 4,-14 8,-8",
          fill: "none",
          stroke: LINE,
          "stroke-width": 1.5,
          "stroke-linecap": "round",
        },
        swim,
      );
      mk(
        "path",
        {
          d: "M7,-5 C5,-2 5,2 7,5",
          fill: "none",
          stroke: LINE,
          "stroke-width": 1.1,
          "stroke-linecap": "round",
        },
        swim,
      );
      const eye = mk("g", { class: "fish-eye" }, swim);
      mk("circle", { cx: 11, cy: -2, r: 2.4, fill: "#ffffff" }, eye);
      mk("circle", { cx: 11.5, cy: -2, r: 1.1, fill: "#1b2340" }, eye);
      const x = mk(
        "g",
        {
          class: "fish-x",
          stroke: "#1b2340",
          "stroke-width": 1.3,
          "stroke-linecap": "round",
        },
        swim,
      );
      mk("line", { x1: 9, y1: -4, x2: 13, y2: 0 }, x);
      mk("line", { x1: 13, y1: -4, x2: 9, y2: 0 }, x);
      s4.fish.push({ el: fish, float: fl, y: s[1], limit: limits[i], dead: false });
    });
  }

  const update4: SceneUpdate = (p, meter) => {
    let alive = 0;
    s4.fish.forEach((f) => {
      const dead = p >= f.limit;
      if (!dead) alive++;
      if (dead === f.dead) return;
      f.dead = dead;
      f.el.classList.toggle("is-dead", dead);
      f.float.style.transform = dead
        ? `translateY(${42 - f.y}px)`
        : "translateY(0)";
    });
    meter.textContent = alive + " / " + s4.fish.length;
    meter.classList.toggle("is-alert", alive <= 2);
    return alive / s4.fish.length;
  };

  const scenes = (
    [
      ["scene-1", update1],
      ["scene-2", update2],
      ["scene-3", update3],
      ["scene-4", update4],
    ] as [string, SceneUpdate][]
  )
    .map(([id, update]) => {
      const node = el(id) as HTMLElement | null;
      if (!node) return null;
      return {
        el: node,
        update,
        meter: node.querySelector("[data-meter]") as Meter,
        bar: node.querySelector(".scene__bar") as HTMLElement,
        last: -1,
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  function updateScenes() {
    const vh = window.innerHeight;
    scenes.forEach((s) => {
      const r = s.el.getBoundingClientRect();
      // 0 as the scene appears from below, 1 once it reaches the top third
      const p = c01((vh - (r.top + r.height / 2)) / (vh * 0.62));
      if (Math.abs(p - s.last) < 0.004) return;
      s.last = p;
      const fill = s.update(p, s.meter);
      s.bar.style.setProperty("--fill", fill.toFixed(3));
    });
  }

  let tick = false;
  function onScroll() {
    if (tick) return;
    tick = true;
    requestAnimationFrame(() => {
      tick = false;
      updateScenes();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScenes();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
