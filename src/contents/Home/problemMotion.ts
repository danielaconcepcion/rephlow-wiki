/**
 * The scroll behaviour of "The Problem": the floating decor (bubbles,
 * microorganisms and algal patches), their parallax drift, the water
 * clouding over as you descend, and the ripples the cursor leaves on the
 * hero's water. All ported from the team's `rePhlow-home v2` prototype.
 */

/** [class, size (px, or [w, h]), top (vh), side offset, opacity, speed, max drift] */
type DecorSpec = [string, number | [number, number], number, string, number, number, number];

const DECOR: DecorSpec[] = [
  ["bubble", 14, 12, "left:20%", 0.9, 0.26, 150],
  ["bubble", 8, 20, "left:26%", 0.9, -0.32, 175],
  ["bubble", 10, 8, "left:82%", 0.55, 0.30, 240],
  ["bubble", 7, 28, "left:90%", 0.5, -0.26, 230],
  ["bubble", 20, 48, "left:70%", 0.85, 0.38, 210],
  ["bubble", 9, 55, "left:5%", 0.6, 0.34, 260],
  ["bubble", 10, 58, "left:14%", 0.8, -0.30, 165],
  ["bubble", 13, 78, "left:86%", 0.5, -0.36, 270],
  ["bubble", 16, 80, "left:60%", 0.7, 0.34, 190],
  ["bubble", 18, 95, "left:9%", 0.6, 0.40, 300],
  ["bubble", 14, 108, "left:24%", 0.55, -0.38, 280],
  ["bubble", 20, 122, "left:7%", 0.6, 0.45, 320],
  ["bubble", 12, 135, "left:32%", 0.5, -0.30, 260],
  ["bubble", 16, 148, "right:7%", 0.45, 0.36, 290],
  ["bubble", 10, 160, "left:16%", 0.5, -0.33, 270],
  ["bubble", 12, 175, "right:13%", 0.4, 0.32, 280],
  ["bubble", 8, 190, "right:26%", 0.35, -0.28, 240],
  ["bubble", 14, 205, "right:9%", 0.42, 0.38, 300],
  ["bubble", 9, 220, "left:4%", 0.35, -0.31, 260],
  ["bubble", 10, 240, "left:5%", 0.3, 0.40, 320],
  ["bubble", 8, 255, "right:6%", 0.25, -0.34, 290],
  ["bubble", 12, 270, "left:9%", 0.28, 0.42, 310],
  ["bubble", 6, 285, "right:11%", 0.2, -0.38, 280],
  ["bubble", 9, 300, "left:14%", 0.18, 0.35, 280],
  // microorganisms eating the O₂ — densest around step 03
  ["microbe", 12, 66, "left:34%", 0.7, 0.22, 130],
  ["microbe", 8, 74, "left:44%", 0.7, -0.21, 125],
  ["microbe", 10, 196, "left:62%", 0.75, 0.24, 140],
  ["microbe", 7, 204, "left:70%", 0.7, -0.20, 120],
  ["microbe", 9, 212, "left:55%", 0.65, 0.26, 130],
  ["microbe", 6, 228, "left:78%", 0.6, -0.22, 120],
  // algal patches (the bloom of step 02)
  ["algae-blob", [140, 110], 74, "left:-40px", 0.55, 0.20, 130],
  ["algae-blob", [100, 90], 96, "right:-20px", 0.55, -0.20, 130],
  ["algae-blob", [180, 130], 130, "right:-60px", 0.5, 0.18, 120],
  ["algae-blob", [120, 95], 150, "left:40%", 0.35, -0.16, 110],
];

/** Builds the decor once into the (empty) layer the page renders. */
export function fillDecorLayer(layer: HTMLElement) {
  if (layer.childElementCount) return;
  DECOR.forEach(([kind, size, top, side, opacity, speed, max]) => {
    const node = document.createElement("div");
    const [w, h] = Array.isArray(size) ? size : [size, size];
    node.className = `decor parallax-decor ${kind}`;
    node.dataset.speed = String(speed);
    node.dataset.max = String(max);
    node.style.cssText = `width:${w}px;height:${h}px;top:${top}vh;${side};opacity:${opacity}`;
    layer.appendChild(node);
  });
}

/**
 * Parallax drift of the decor plus the two scroll-driven variables the
 * section's own CSS reads: --murk (how turbid the water looks) and
 * --depth (how far the gauge has filled).
 */
export function initProblemMotion(problem: HTMLElement): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gauge = problem.querySelector<HTMLElement>(".gauge");
  const items = Array.from(
    problem.querySelectorAll<HTMLElement>(".parallax-decor"),
  ).map((el) => ({
    el,
    speed: parseFloat(el.dataset.speed || "0") || 0,
    speedX: parseFloat(el.dataset.speedX || "0") || 0,
    max: parseFloat(el.dataset.max || "80") || 80,
  }));

  const clamp = (v: number, limit: number) => Math.max(-limit, Math.min(limit, v));
  let ticking = false;

  function apply() {
    ticking = false;
    const vh = window.innerHeight;
    const rect = problem.getBoundingClientRect();
    // 0 on entering "The Problem", 1 at the bottom (eutrophic water)
    const depth = Math.max(0, Math.min(1, (vh * 0.5 - rect.top) / rect.height));
    problem.style.setProperty("--murk", depth.toFixed(3));
    if (gauge) gauge.style.setProperty("--depth", depth.toFixed(3));

    if (reduceMotion) return;
    const center = vh / 2;
    items.forEach((it) => {
      const r = it.el.getBoundingClientRect();
      const dist = center - (r.top + r.height / 2);
      it.el.style.setProperty("--py", clamp(dist * it.speed, it.max).toFixed(1) + "px");
      it.el.style.setProperty("--px", clamp(dist * it.speedX, it.max).toFixed(1) + "px");
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(apply);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  apply();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

/** Each step fades in as it reaches the screen. */
export function revealOnScroll(root: HTMLElement): () => void {
  const targets = Array.from(root.querySelectorAll<HTMLElement>(".beat, .scene"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!("IntersectionObserver" in window) || reduceMotion) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-visible");
        io.unobserve(e.target);
      });
    },
    { threshold: 0.25 },
  );
  targets.forEach((t) => io.observe(t));
  return () => io.disconnect();
}

/** Ripples on the hero's water under the cursor, plus an ambient one. */
export function initHeroRipples(water: HTMLElement): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return () => {};

  function ripple(x: number, y: number, big: boolean) {
    const s = document.createElement("span");
    s.className = "ripple" + (big ? " ripple--big" : "");
    s.style.left = x + "px";
    s.style.top = y + "px";
    water.appendChild(s);
    s.addEventListener("animationend", () => s.remove());
  }

  let last = 0;
  function onMove(e: PointerEvent) {
    const now = performance.now();
    if (now - last < 90) return;
    last = now;
    const r = water.getBoundingClientRect();
    ripple(e.clientX - r.left, e.clientY - r.top, false);
  }
  function onDown(e: PointerEvent) {
    const r = water.getBoundingClientRect();
    ripple(e.clientX - r.left, e.clientY - r.top, true);
  }

  water.addEventListener("pointermove", onMove);
  water.addEventListener("pointerdown", onDown);
  // soft ambient ripples near the surface
  const timer = window.setInterval(() => {
    if (document.hidden) return;
    ripple(water.clientWidth * (0.1 + Math.random() * 0.8), 10 + Math.random() * 50, false);
  }, 2200);

  return () => {
    water.removeEventListener("pointermove", onMove);
    water.removeEventListener("pointerdown", onDown);
    window.clearInterval(timer);
  };
}
