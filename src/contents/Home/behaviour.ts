/* --------------------------------------------------------------------------
   rePhlow Home: the page's behaviour, ported from the approved standalone
   homepage. Every class name carries the rh- prefix used by Home.css.

   - "The Problem": bubbles, microbes and algae drift with the scroll, the
     water darkens and the depth gauge fills as the reader goes down.
   - The four illustrated steps build themselves and advance with the scroll.
   - The hero water ripples under the cursor.
   - The promotion video switches language (EN / ES / FR).
   - The "Explore rePhlow!" cards draw their molecule backgrounds.

   initHome() returns a cleanup function so the wiki's router can mount and
   unmount the page without leaving listeners or timers behind.
   -------------------------------------------------------------------------- */

const SVGNS = "http://www.w3.org/2000/svg";

type Lang = "en" | "es" | "fr";

export function initHome(
  root: HTMLElement,
  videos: Record<Lang, string>,
  navigate: (route: string) => void,
): () => void {
  const cleanups: (() => void)[] = [];
  const on = <K extends keyof WindowEventMap>(
    target: Window,
    type: K,
    fn: (event: WindowEventMap[K]) => void,
    options?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn, options);
    cleanups.push(() => target.removeEventListener(type, fn, options));
  };
  const byId = <T extends Element = HTMLElement>(id: string) =>
    root.querySelector<T>(`#${CSS.escape(id)}`);

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  function rng(seed: number) {
    let t = (seed | 0) * 9301 + 49297;
    return () => {
      t += 0x6d2b79f5;
      let r = Math.imul(t ^ (t >>> 15), 1 | t);
      r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c01 = (v: number) => Math.max(0, Math.min(1, v));
  function mk(
    tag: string,
    attrs: Record<string, string | number>,
    parent?: Element | null,
  ): SVGElement {
    const n = document.createElementNS(SVGNS, tag);
    for (const k in attrs) n.setAttribute(k, String(attrs[k]));
    if (parent) parent.appendChild(n);
    return n;
  }

  /* ---------------------------------------------------------------
     1. Bubbles, microbes and algae of "The Problem". Bubbles (oxygen)
        get scarcer and fainter further down.
     --------------------------------------------------------------- */
  const layer = byId("decor-layer");
  type Decor = [
    string,
    number | [number, number],
    number,
    string,
    number,
    number,
    number,
  ];
  const decor: Decor[] = [
    ["bubble", 14, 12, "left:20%", 0.9, 0.26, 150],
    ["bubble", 8, 20, "left:26%", 0.9, -0.32, 175],
    ["bubble", 10, 8, "left:82%", 0.55, 0.3, 240],
    ["bubble", 7, 28, "left:90%", 0.5, -0.26, 230],
    ["bubble", 20, 48, "left:70%", 0.85, 0.38, 210],
    ["bubble", 9, 55, "left:5%", 0.6, 0.34, 260],
    ["bubble", 10, 58, "left:14%", 0.8, -0.3, 165],
    ["bubble", 13, 78, "left:86%", 0.5, -0.36, 270],
    ["bubble", 16, 80, "left:60%", 0.7, 0.34, 190],
    ["bubble", 18, 95, "left:9%", 0.6, 0.4, 300],
    ["bubble", 14, 108, "left:24%", 0.55, -0.38, 280],
    ["bubble", 20, 122, "left:7%", 0.6, 0.45, 320],
    ["bubble", 12, 135, "left:32%", 0.5, -0.3, 260],
    ["bubble", 16, 148, "right:7%", 0.45, 0.36, 290],
    ["bubble", 10, 160, "left:16%", 0.5, -0.33, 270],
    ["bubble", 12, 175, "right:13%", 0.4, 0.32, 280],
    ["bubble", 8, 190, "right:26%", 0.35, -0.28, 240],
    ["bubble", 14, 205, "right:9%", 0.42, 0.38, 300],
    ["bubble", 9, 220, "left:4%", 0.35, -0.31, 260],
    ["bubble", 10, 240, "left:5%", 0.3, 0.4, 320],
    ["bubble", 8, 255, "right:6%", 0.25, -0.34, 290],
    ["bubble", 12, 270, "left:9%", 0.28, 0.42, 310],
    ["bubble", 6, 285, "right:11%", 0.2, -0.38, 280],
    ["bubble", 9, 300, "left:14%", 0.18, 0.35, 280],
    ["microbe", 12, 66, "left:34%", 0.7, 0.22, 130],
    ["microbe", 8, 74, "left:44%", 0.7, -0.21, 125],
    ["microbe", 10, 196, "left:62%", 0.75, 0.24, 140],
    ["microbe", 7, 204, "left:70%", 0.7, -0.2, 120],
    ["microbe", 9, 212, "left:55%", 0.65, 0.26, 130],
    ["microbe", 6, 228, "left:78%", 0.6, -0.22, 120],
    ["algae-blob", [140, 110], 74, "left:-40px", 0.55, 0.2, 130],
    ["algae-blob", [100, 90], 96, "right:-20px", 0.55, -0.2, 130],
    ["algae-blob", [180, 130], 130, "right:-60px", 0.5, 0.18, 120],
    ["algae-blob", [120, 95], 150, "left:40%", 0.35, -0.16, 110],
  ];
  decor.forEach(([kind, size, top, side, opacity, speed, max]) => {
    if (!layer) return;
    const el = document.createElement("div");
    const w = Array.isArray(size) ? size[0] : size;
    const h = Array.isArray(size) ? size[1] : size;
    el.className = `rh-decor rh-parallax-decor rh-${kind}`;
    el.dataset.speed = String(speed);
    el.dataset.max = String(max);
    el.style.cssText = `width:${w}px;height:${h}px;top:${top}vh;${side};opacity:${opacity}`;
    layer.appendChild(el);
  });

  /* ---------------------------------------------------------------
     2. Scroll: parallax and the water darkening as you go down.
     --------------------------------------------------------------- */
  const problem = byId("problem");
  const gaugeFill = root.querySelector<HTMLElement>(".rh-gauge__fill");
  const items = problem
    ? Array.from(
        problem.querySelectorAll<HTMLElement>(".rh-parallax-decor"),
      ).map((el) => ({
        el,
        speed: parseFloat(el.dataset.speed || "0") || 0,
        speedX: parseFloat(el.dataset.speedX || "0") || 0,
        max: parseFloat(el.dataset.max || "80") || 80,
      }))
    : [];
  const clamp = (v: number, lim: number) => Math.max(-lim, Math.min(lim, v));
  let ticking = false;
  function apply() {
    ticking = false;
    if (!problem) return;
    const vh = window.innerHeight;
    const rect = problem.getBoundingClientRect();
    const depth = Math.max(0, Math.min(1, (vh * 0.5 - rect.top) / rect.height));
    problem.style.setProperty("--murk", depth.toFixed(3));
    const gauge = gaugeFill?.parentElement;
    if (gauge) gauge.style.setProperty("--depth", depth.toFixed(3));
    if (reduceMotion) return;
    const center = vh / 2;
    items.forEach((it) => {
      const r = it.el.getBoundingClientRect();
      const dist = center - (r.top + r.height / 2);
      it.el.style.setProperty(
        "--py",
        clamp(dist * it.speed, it.max).toFixed(1) + "px",
      );
      it.el.style.setProperty(
        "--px",
        clamp(dist * it.speedX, it.max).toFixed(1) + "px",
      );
    });
  }
  let rafA = 0;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    rafA = requestAnimationFrame(apply);
  }
  on(window, "scroll", onScroll, { passive: true });
  on(window, "resize", onScroll, { passive: true });
  cleanups.push(() => cancelAnimationFrame(rafA));
  apply();

  /* Each step fades in as it enters the screen. */
  const beats = root.querySelectorAll(".rh-beat, .rh-scene");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rh-is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 },
    );
    beats.forEach((b) => io.observe(b));
    cleanups.push(() => io.disconnect());
  } else {
    beats.forEach((b) => b.classList.add("rh-is-visible"));
  }

  /* ---------------------------------------------------------------
     3. Promotion video (iGEM Video Universe): language switch.
     --------------------------------------------------------------- */
  // A video file (.mp4, e.g. from iGEM Uploads) plays in a <video> and keeps
  // its minute when the language changes; a video.igem.org address plays in
  // the embedded iGEM player.
  const isFile = (url: string) => /\.(mp4|webm)(\?|#|$)/i.test(url);
  let frame: HTMLIFrameElement | HTMLVideoElement | null = byId("promo-video");
  if (frame && isFile(videos.en || videos.es || videos.fr)) {
    const video = document.createElement("video");
    video.id = "promo-video";
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    frame.replaceWith(video);
    frame = video;
  }
  const langButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>(".rh-promotion-video__language"),
  );
  let current: Lang = "en";
  let resume = { time: 0, playing: false };
  function setVideo(lang: Lang, label: string) {
    if (!frame) return;
    const url = videos[lang];
    if (frame instanceof HTMLVideoElement) {
      resume = { time: frame.currentTime || 0, playing: !frame.paused };
      frame.setAttribute("aria-label", `rePhlow promotion video in ${label}`);
      if (url) frame.src = url;
      else frame.removeAttribute("src");
      frame.load();
      return;
    }
    frame.title = `rePhlow promotion video in ${label}`;
    if (url) frame.src = url;
    else frame.removeAttribute("src");
  }
  if (frame instanceof HTMLVideoElement) {
    const video = frame;
    const onMeta = () => {
      if (Number.isFinite(video.duration)) {
        video.currentTime = Math.min(
          resume.time,
          Math.max(video.duration - 0.1, 0),
        );
      }
      if (resume.playing) void video.play().catch(() => undefined);
    };
    video.addEventListener("loadedmetadata", onMeta);
    cleanups.push(() => video.removeEventListener("loadedmetadata", onMeta));
  }
  setVideo("en", "English");
  resume = { time: 0, playing: false };

  /* ---------------------------------------------------------------
     4. Molecule backgrounds of the "Explore rePhlow!" cards
        (same seed -> same composition).
     --------------------------------------------------------------- */
  const PAL: Record<
    string,
    Record<"huge" | "mid" | "small", [number, number]>
  > = {
    light: { huge: [0.09, 0.15], mid: [0.16, 0.27], small: [0.3, 0.52] },
    primary: { huge: [0.05, 0.1], mid: [0.1, 0.18], small: [0.2, 0.34] },
  };
  const DENSITY = 1.35;
  const defs = document.createElementNS(SVGNS, "svg");
  defs.setAttribute("width", "0");
  defs.setAttribute("height", "0");
  defs.setAttribute("aria-hidden", "true");
  defs.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
  defs.innerHTML =
    "<defs>" +
    '<linearGradient id="rh-tmfC-light" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2b6caf"/><stop offset="1" stop-color="#6a9e3f"/></linearGradient>' +
    '<linearGradient id="rh-tmfC-primary" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.58"/></linearGradient>' +
    ["light", "primary"]
      .map((p) => {
        const g = `url(#rh-tmfC-${p})`;
        return (
          `<g id="rh-tmfG1-${p}" fill="${g}" stroke="${g}" stroke-width="13" stroke-linecap="round">` +
          '<line x1="100" y1="100" x2="79" y2="42"/><line x1="100" y1="100" x2="43" y2="108"/><line x1="100" y1="100" x2="156" y2="121"/><line x1="100" y1="100" x2="90" y2="154"/>' +
          '<circle cx="79" cy="42" r="19" stroke="none"/><circle cx="43" cy="108" r="17" stroke="none"/><circle cx="156" cy="121" r="18" stroke="none"/><circle cx="90" cy="154" r="16" stroke="none"/><circle cx="100" cy="100" r="31" stroke="none"/></g>' +
          `<g id="rh-tmfG2-${p}" fill="${g}" stroke="${g}" stroke-width="12" stroke-linecap="round">` +
          '<line x1="98" y1="104" x2="132" y2="46"/><line x1="98" y1="104" x2="38" y2="82"/><line x1="98" y1="104" x2="60" y2="158"/><line x1="98" y1="104" x2="160" y2="146"/>' +
          '<circle cx="132" cy="46" r="16" stroke="none"/><circle cx="38" cy="82" r="20" stroke="none"/><circle cx="60" cy="158" r="15" stroke="none"/><circle cx="160" cy="146" r="18" stroke="none"/><circle cx="98" cy="104" r="28" stroke="none"/></g>'
        );
      })
      .join("") +
    "</defs>";
  root.appendChild(defs);

  function drawField(card: HTMLElement) {
    const palette = card.dataset.palette || "light";
    const seed = parseInt(card.dataset.seed || "7", 10);
    let layerEl = card.querySelector<HTMLElement>(".rh-tmf-layer");
    if (!layerEl) {
      layerEl = document.createElement("div");
      layerEl.className = `rh-tmf-layer rh-tmf-layer--${palette}`;
      layerEl.setAttribute("aria-hidden", "true");
      card.insertBefore(layerEl, card.firstChild);
    }
    const w = Math.round(card.clientWidth);
    const h = Math.round(card.clientHeight);
    if (layerEl.dataset.size === `${w}x${h}`) return;
    layerEl.dataset.size = `${w}x${h}`;
    layerEl.innerHTML = "";
    if (w <= 40 || h <= 40) return;

    const pal = PAL[palette] ?? PAL.light;
    const rnd = rng(seed);
    const tier = w < 480 ? 0 : w < 860 ? 1 : 2;
    const counts = [
      [1, 2, 2],
      [2, 3, 3],
      [2, 4, 5],
    ][tier].map((n, i) => Math.max(1, Math.round(n * (i ? DENSITY : 1))));
    const wide = w / h > 1.9;
    const base = Math.min(w, h) * (wide ? 0.4 : 0.3);
    const placed: { x: number; y: number }[] = [];
    const bands = [
      { name: "huge" as const, n: counts[0], kr: [1.9, 2.9], safe: false },
      { name: "mid" as const, n: counts[1], kr: [0.85, 1.35], safe: true },
      { name: "small" as const, n: counts[2], kr: [0.38, 0.66], safe: true },
    ];
    bands.forEach((b) => {
      for (let i = 0; i < b.n; i++) {
        let x = 0;
        let y = 0;
        let ok = false;
        for (let tries = 0; tries < 40 && !ok; tries++) {
          x = lerp(-0.08, 1.08, rnd());
          y = lerp(-0.08, 1.08, rnd());
          const inSafe = wide
            ? x > 0.1 && x < 0.86 && y > 0.14 && y < 0.86
            : x > 0.18 && x < 0.82 && y > 0.26 && y < 0.74;
          const far = placed.every(
            (p) =>
              Math.hypot((p.x - x) * w, (p.y - y) * h) > Math.min(w, h) * 0.26,
          );
          ok = far && (!b.safe || !inSafe || tries > 30);
        }
        placed.push({ x, y });
        const size = base * lerp(b.kr[0], b.kr[1], rnd());
        const op = lerp(pal[b.name][0], pal[b.name][1], rnd());
        const rot = rnd() * 360;
        const blur =
          b.name === "huge"
            ? size * 0.016
            : b.name === "mid"
              ? size * 0.004
              : 0;
        const href =
          rnd() > 0.5 ? `#rh-tmfG1-${palette}` : `#rh-tmfG2-${palette}`;
        const svg = document.createElementNS(SVGNS, "svg");
        svg.setAttribute("viewBox", "0 0 200 200");
        svg.style.cssText =
          `position:absolute;left:${(x * 100).toFixed(2)}%;top:${(y * 100).toFixed(2)}%;` +
          `width:${Math.round(size)}px;height:${Math.round(size)}px;` +
          `transform:translate(-50%,-50%) rotate(${rot.toFixed(1)}deg);` +
          `opacity:${op.toFixed(3)};filter:${blur ? `blur(${blur.toFixed(1)}px)` : "none"};` +
          "overflow:visible;pointer-events:none";
        const use = document.createElementNS(SVGNS, "use");
        use.setAttribute("href", href);
        svg.appendChild(use);
        layerEl.appendChild(svg);
      }
    });
  }
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>(".rh-card[data-seed]"),
  );
  const drawAll = () => cards.forEach(drawField);
  drawAll();
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => drawAll());
    cards.forEach((c) => ro.observe(c));
    cleanups.push(() => ro.disconnect());
  } else {
    on(window, "resize", drawAll);
  }

  /* ---------------------------------------------------------------
     5. Hero: ripples on the water under the cursor or a tap.
     --------------------------------------------------------------- */
  const heroWater = byId("hero-water");
  function ripple(x: number, y: number, big: boolean) {
    if (!heroWater) return;
    const s = document.createElement("span");
    s.className = "rh-ripple" + (big ? " rh-ripple--big" : "");
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    heroWater.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }
  if (heroWater && !reduceMotion) {
    let lastRipple = 0;
    const move = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastRipple < 90) return;
      lastRipple = now;
      const r = heroWater.getBoundingClientRect();
      ripple(e.clientX - r.left, e.clientY - r.top, false);
    };
    const down = (e: PointerEvent) => {
      const r = heroWater.getBoundingClientRect();
      ripple(e.clientX - r.left, e.clientY - r.top, true);
    };
    heroWater.addEventListener("pointermove", move);
    heroWater.addEventListener("pointerdown", down);
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const w = heroWater.clientWidth;
      ripple(w * (0.1 + Math.random() * 0.8), 10 + Math.random() * 50, false);
    }, 2200);
    cleanups.push(() => {
      heroWater.removeEventListener("pointermove", move);
      heroWater.removeEventListener("pointerdown", down);
      window.clearInterval(timer);
    });
  }

  /* ---------------------------------------------------------------
     6. The four step scenes: built here, advanced by the scroll.
     --------------------------------------------------------------- */
  // Step 01: phosphate leaves the pipe and spreads through the river.
  const s1 = {
    parts: [] as { el: SVGElement; x: number; y: number; on: boolean }[],
    plume: byId<SVGElement>("s1-plume"),
  };
  {
    const g = byId("s1-particles");
    const r = rng(4);
    const N = 34;
    for (let i = 0; i < N; i++) {
      const t = i / N;
      const x = Math.min(392, 162 + r() * (30 + t * 220));
      const y = Math.min(240, 84 + r() * (28 + t * 140));
      const pos = mk("g", { class: "rh-p-pos" }, g);
      pos.style.transform = "translate(160px,82px)";
      pos.style.opacity = "0";
      const drift = mk("g", { class: "rh-p-drift" }, pos);
      drift.style.animationDelay = (-r() * 5).toFixed(2) + "s";
      mk("circle", { r: 4.2, fill: "#e2542d" }, drift);
      mk(
        "circle",
        { cx: -1.3, cy: -1.3, r: 1.5, fill: "#ffffff", opacity: 0.7 },
        drift,
      );
      s1.parts.push({ el: pos, x, y, on: false });
    }
  }
  function update1(p: number, meter: HTMLElement) {
    const n = Math.round(p * s1.parts.length);
    s1.parts.forEach((q, i) => {
      const visible = i < n;
      if (visible === q.on) return;
      q.on = visible;
      q.el.style.opacity = visible ? "1" : "0";
      q.el.style.transform = visible
        ? `translate(${q.x}px,${q.y}px)`
        : "translate(160px,82px)";
    });
    if (s1.plume) {
      s1.plume.style.transform = `scale(${(0.4 + p * 1.6).toFixed(3)})`;
      s1.plume.setAttribute("opacity", (0.12 + p * 0.35).toFixed(2));
    }
    meter.textContent = (0.02 + p * 2.38).toFixed(2) + " mg/L";
    meter.classList.toggle("rh-is-alert", p > 0.6);
    return p;
  }

  // Step 02: algae cover the surface and dim the light.
  const s2 = {
    blobs: [] as { el: SVGElement; t: number }[],
    fils: [] as { el: SVGElement; t: number }[],
    rays: byId<SVGElement>("s2-rays"),
    sun: byId<SVGElement>("s2-sun"),
  };
  {
    const mat = byId("s2-mat");
    const fil = byId("s2-fil");
    const r = rng(9);
    const greens = ["#6f9a3a", "#86b04c", "#9dc76f", "#5e8a30", "#7aa544"];
    for (let i = 0; i < 26; i++) {
      const e = mk(
        "ellipse",
        {
          class: "rh-s2-blob",
          cx: (i * 16 + r() * 10 - 4).toFixed(1),
          cy: (69 + r() * 5).toFixed(1),
          rx: (9 + r() * 8).toFixed(1),
          ry: (4 + r() * 3).toFixed(1),
          fill: greens[i % greens.length],
        },
        mat,
      );
      e.style.transform = "scale(0)";
      s2.blobs.push({ el: e, t: r() * 0.72 });
    }
    for (let j = 0; j < 13; j++) {
      const x = 12 + r() * 376;
      const L = 40 + r() * 100;
      const a = (r() > 0.5 ? 1 : -1) * (6 + r() * 6);
      const sway = mk("g", { class: "rh-s2-sway" }, fil);
      sway.style.animationDelay = (-r() * 4).toFixed(2) + "s";
      const path = mk(
        "path",
        {
          class: "rh-s2-fil",
          d: `M${x.toFixed(1)},72 q${a.toFixed(1)},${(L * 0.25).toFixed(1)} 0,${(L * 0.5).toFixed(1)} t0,${(L * 0.5).toFixed(1)}`,
          fill: "none",
          stroke: "#4f7a28",
          "stroke-width": 2.2,
          "stroke-linecap": "round",
          opacity: 0.75,
          pathLength: 1,
          "stroke-dasharray": 1,
          "stroke-dashoffset": 1,
        },
        sway,
      );
      s2.fils.push({ el: path, t: 0.15 + r() * 0.6 });
    }
  }
  function update2(p: number, meter: HTMLElement) {
    s2.blobs.forEach((b) => {
      b.el.style.transform = `scale(${c01((p - b.t) / 0.22).toFixed(3)})`;
    });
    s2.fils.forEach((f) => {
      f.el.setAttribute(
        "stroke-dashoffset",
        (1 - c01((p - f.t) / 0.35)).toFixed(3),
      );
    });
    if (s2.rays) s2.rays.style.opacity = (1 - p * 0.95).toFixed(3);
    if (s2.sun) s2.sun.style.opacity = (1 - p * 0.45).toFixed(3);
    const cover = Math.round(p * 92);
    meter.textContent = cover + "%";
    meter.classList.toggle("rh-is-alert", cover > 60);
    return p;
  }

  // Step 03: fewer bubbles, more microbes, the oxygen drops.
  const s3 = {
    bub: [] as SVGElement[],
    flakes: [] as SVGElement[],
    bact: [] as SVGElement[],
    needle: null as SVGElement | null,
  };
  const DIAL = { cx: 336, cy: 82, r: 32 };
  {
    const r = rng(21);
    const gb = byId("s3-bub");
    const gf = byId("s3-flakes");
    const gc = byId("s3-bact");
    for (let i = 0; i < 16; i++) {
      const v = mk("g", { class: "rh-vis" }, gb);
      const c = mk(
        "circle",
        {
          class: "rh-bub",
          cx: (20 + r() * 250).toFixed(1),
          cy: 226,
          r: (2 + r() * 3).toFixed(1),
          fill: "none",
          stroke: "#ffffff",
          "stroke-width": 1.3,
        },
        v,
      );
      c.style.animationDuration = (3 + r() * 3).toFixed(2) + "s";
      c.style.animationDelay = (-r() * 6).toFixed(2) + "s";
      s3.bub.push(v);
    }
    for (let j = 0; j < 14; j++) {
      const vf = mk("g", { class: "rh-vis", opacity: 0 }, gf);
      vf.style.opacity = "0";
      const x = 10 + r() * 380;
      const y = 16 + r() * 30;
      const f = mk(
        "path",
        {
          class: "rh-flake",
          d: `M${x.toFixed(1)},${y.toFixed(1)} l6,1 l-2,5 l-5,-2 z`,
          fill: ["#8a7a45", "#6b6a3a", "#9a8a52"][j % 3],
        },
        vf,
      );
      f.style.animationDuration = (5 + r() * 3).toFixed(2) + "s";
      f.style.animationDelay = (-r() * 8).toFixed(2) + "s";
      s3.flakes.push(vf);
    }
    for (let k = 0; k < 14; k++) {
      const vb = mk("g", { class: "rh-vis" }, gc);
      vb.style.opacity = "0";
      const bx = 16 + r() * 260;
      const by = 150 + r() * 72;
      const b = mk("g", { class: "rh-bact" }, vb);
      b.style.animationDelay = (-r() * 1.6).toFixed(2) + "s";
      mk(
        "rect",
        {
          x: bx.toFixed(1),
          y: by.toFixed(1),
          width: 13,
          height: 5.5,
          rx: 2.75,
          fill: "#a28fd0",
        },
        b,
      );
      mk(
        "path",
        {
          d: `M${(bx + 13).toFixed(1)},${(by + 2.75).toFixed(1)} q3,-3 6,0 t6,0`,
          fill: "none",
          stroke: "#a28fd0",
          "stroke-width": 1,
          "stroke-linecap": "round",
        },
        b,
      );
      s3.bact.push(vb);
    }
    // Dissolved-oxygen dial (0–10 mg/L)
    const d = byId("s3-dial");
    mk(
      "rect",
      {
        x: 290,
        y: 38,
        width: 92,
        height: 66,
        rx: 14,
        fill: "#ffffff",
        opacity: 0.9,
      },
      d,
    );
    const pt = (v: number) => {
      const a = Math.PI - (v / 10) * Math.PI;
      return `${(DIAL.cx + DIAL.r * Math.cos(a)).toFixed(2)},${(DIAL.cy - DIAL.r * Math.sin(a)).toFixed(2)}`;
    };
    (
      [
        [0, 2, "#e2542d"],
        [2, 5, "#f4d35e"],
        [5, 10, "#6a9e3f"],
      ] as [number, number, string][]
    ).forEach(([from, to, color]) => {
      mk(
        "path",
        {
          d: `M${pt(from)} A${DIAL.r},${DIAL.r} 0 0 1 ${pt(to)}`,
          fill: "none",
          stroke: color,
          "stroke-width": 6,
        },
        d,
      );
    });
    s3.needle = mk(
      "line",
      {
        class: "rh-s3-needle",
        x1: DIAL.cx,
        y1: DIAL.cy,
        x2: DIAL.cx - 26,
        y2: DIAL.cy,
        stroke: "#1b2340",
        "stroke-width": 2.5,
        "stroke-linecap": "round",
      },
      d,
    );
    s3.needle.style.transformOrigin = `${DIAL.cx}px ${DIAL.cy}px`;
    mk("circle", { cx: DIAL.cx, cy: DIAL.cy, r: 3.5, fill: "#1b2340" }, d);
    const lbl = mk(
      "text",
      {
        x: DIAL.cx,
        y: DIAL.cy + 16,
        "text-anchor": "middle",
        "font-family": "Inter, sans-serif",
        "font-size": 9,
        "font-weight": 700,
        fill: "#1b2340",
      },
      d,
    );
    lbl.textContent = "O₂";
  }
  function update3(p: number, meter: HTMLElement) {
    const gone = Math.round(p * 15);
    s3.bub.forEach((b, i) => {
      b.style.opacity = i >= gone ? "1" : "0";
    });
    const n = Math.round(p * 14);
    s3.flakes.forEach((f, i) => {
      f.style.opacity = i < n ? "1" : "0";
    });
    s3.bact.forEach((b, i) => {
      b.style.opacity = i < n ? "1" : "0";
    });
    const v = 8 - p * 6.5;
    if (s3.needle)
      s3.needle.style.transform = `rotate(${((v / 10) * 180).toFixed(1)}deg)`;
    meter.textContent = v.toFixed(1) + " mg/L" + (v < 2 ? " · hypoxic" : "");
    meter.classList.toggle("rh-is-alert", v < 2);
    return 1 - p;
  }

  // Step 04: fish die and float up to the surface.
  const s4 = {
    fish: [] as {
      el: SVGElement;
      float: SVGElement;
      y: number;
      limit: number;
      dead: boolean;
    }[],
  };
  {
    const g = byId("s4-fish");
    const murk = byId("s4-murk");
    const r = rng(33);
    for (let m = 0; m < 34; m++) {
      mk(
        "circle",
        {
          cx: (r() * 640).toFixed(1),
          cy: (20 + r() * 190).toFixed(1),
          r: (0.8 + r() * 1.8).toFixed(1),
          fill: "#cfd8b0",
          opacity: (0.08 + r() * 0.14).toFixed(2),
        },
        murk,
      );
    }
    const spots = [
      [90, 96],
      [205, 160],
      [318, 86],
      [430, 150],
      [540, 102],
      [265, 196],
    ];
    const colors = [
      "#f4a261",
      "#86b1d1",
      "#e9c46a",
      "#9dc76f",
      "#f28482",
      "#bfe3ee",
    ];
    const limits = [0.14, 0.3, 0.46, 0.6, 0.74, 0.88];
    spots.forEach((s, i) => {
      const fish = mk(
        "g",
        { class: "rh-fish", transform: `translate(${s[0]},${s[1]})` },
        g,
      );
      const fl = mk("g", { class: "rh-fish-float" }, fish);
      const flip = mk("g", { class: "rh-fish-flip" }, fl);
      const swim = mk("g", { class: "rh-fish-swim" }, flip);
      swim.style.setProperty("--dur", (6 + r() * 4).toFixed(1) + "s");
      swim.style.animationDelay = (-r() * 8).toFixed(2) + "s";
      mk(
        "path",
        {
          class: "rh-fish-body rh-fish-tail",
          d: "M-13,0 L-27,-10 L-23,0 L-27,10 Z",
          fill: colors[i],
        },
        swim,
      );
      mk(
        "ellipse",
        {
          class: "rh-fish-body",
          cx: 0,
          cy: 0,
          rx: 17,
          ry: 9.5,
          fill: colors[i],
        },
        swim,
      );
      mk(
        "path",
        {
          d: "M-4,-8 Q2,-15 8,-8",
          fill: "none",
          stroke: "#1b2340",
          "stroke-opacity": 0.25,
          "stroke-width": 2,
        },
        swim,
      );
      const eye = mk("g", { class: "rh-fish-eye" }, swim);
      mk("circle", { cx: 9, cy: -2.5, r: 2.6, fill: "#ffffff" }, eye);
      mk("circle", { cx: 9.6, cy: -2.5, r: 1.2, fill: "#1b2340" }, eye);
      const x = mk(
        "g",
        {
          class: "rh-fish-x",
          stroke: "#1b2340",
          "stroke-width": 1.4,
          "stroke-linecap": "round",
        },
        swim,
      );
      mk("line", { x1: 7, y1: -4.5, x2: 11, y2: -0.5 }, x);
      mk("line", { x1: 11, y1: -4.5, x2: 7, y2: -0.5 }, x);
      s4.fish.push({
        el: fish,
        float: fl,
        y: s[1],
        limit: limits[i],
        dead: false,
      });
    });
  }
  function update4(p: number, meter: HTMLElement) {
    let alive = 0;
    s4.fish.forEach((f) => {
      const dead = p >= f.limit;
      if (!dead) alive++;
      if (dead === f.dead) return;
      f.dead = dead;
      f.el.classList.toggle("rh-is-dead", dead);
      f.float.style.transform = dead
        ? `translateY(${32 - f.y}px)`
        : "translateY(0)";
    });
    meter.textContent = `${alive} / ${s4.fish.length}`;
    meter.classList.toggle("rh-is-alert", alive <= 2);
    return alive / s4.fish.length;
  }

  const scenes = (
    [
      ["scene-1", update1],
      ["scene-2", update2],
      ["scene-3", update3],
      ["scene-4", update4],
    ] as [string, (p: number, meter: HTMLElement) => number][]
  )
    .map(([id, update]) => {
      const el = byId(id);
      if (!el) return null;
      return {
        el,
        update,
        meter: el.querySelector<HTMLElement>("[data-meter]"),
        bar: el.querySelector<HTMLElement>(".rh-scene__bar"),
        last: -1,
      };
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);

  function updateScenes() {
    const vh = window.innerHeight;
    scenes.forEach((s) => {
      const r = s.el.getBoundingClientRect();
      const p = c01((vh - (r.top + r.height / 2)) / (vh * 0.62));
      if (Math.abs(p - s.last) < 0.004) return;
      s.last = p;
      if (!s.meter) return;
      const fill = s.update(p, s.meter);
      s.bar?.style.setProperty("--fill", fill.toFixed(3));
    });
  }
  let sceneTick = false;
  let rafB = 0;
  function onSceneScroll() {
    if (sceneTick) return;
    sceneTick = true;
    rafB = requestAnimationFrame(() => {
      sceneTick = false;
      updateScenes();
    });
  }
  on(window, "scroll", onSceneScroll, { passive: true });
  on(window, "resize", onSceneScroll, { passive: true });
  cleanups.push(() => cancelAnimationFrame(rafB));
  updateScenes();

  // A slight 3D tilt of each scene following the cursor.
  if (window.matchMedia("(hover: hover)").matches && !reduceMotion) {
    scenes.forEach((s) => {
      const move = (e: PointerEvent) => {
        const r = s.el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        s.el.style.setProperty("--tilt-y", (x * 7).toFixed(2) + "deg");
        s.el.style.setProperty("--tilt-x", (-y * 7).toFixed(2) + "deg");
      };
      const leave = () => {
        s.el.style.setProperty("--tilt-y", "0deg");
        s.el.style.setProperty("--tilt-x", "0deg");
      };
      s.el.addEventListener("pointermove", move);
      s.el.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        s.el.removeEventListener("pointermove", move);
        s.el.removeEventListener("pointerleave", leave);
      });
    });
  }

  /* ---------------------------------------------------------------
     7. Clicks: scroll buttons, video languages and the Explore cards
        (which move inside the wiki without reloading the page).
     --------------------------------------------------------------- */
  function onClick(event: MouseEvent) {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const scroller = target.closest<HTMLElement>("[data-scroll-to]");
    if (scroller) {
      const t = byId(scroller.dataset.scrollTo ?? "");
      t?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    const langBtn = target.closest<HTMLButtonElement>(
      ".rh-promotion-video__language",
    );
    if (langBtn) {
      const lang = (langBtn.dataset.lang ?? "en") as Lang;
      if (lang === current) return;
      current = lang;
      langButtons.forEach((b) => {
        const active = b === langBtn;
        b.classList.toggle("rh-is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
      setVideo(lang, langBtn.dataset.label ?? lang);
      return;
    }

    const link = target.closest<HTMLAnchorElement>("a[data-route]");
    if (
      link &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey
    ) {
      event.preventDefault();
      navigate(link.dataset.route ?? "/");
    }
  }
  root.addEventListener("click", onClick);
  cleanups.push(() => root.removeEventListener("click", onClick));

  return () => {
    cleanups.forEach((fn) => fn());
    defs.remove();
  };
}
