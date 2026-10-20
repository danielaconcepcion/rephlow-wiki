/* Changes requested on 20 Oct 2026: the paragraphs after the CEDEX - Roberto
   Arranz loop become fold-out bubbles, one per topic (each topic starts with a
   bold lead-in). Nodes are not moved, only hidden and shown, so React keeps
   working. */
(function () {
  var tries = 0;
  var CHEVRON = '<svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5 L5 6.5 L8 3.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function build() {
    if (document.querySelector(".rv-fold-head")) return true;
    var loop = document.querySelector("#r02 > .rv-loop");
    if (!loop) return false;
    var ps = [];
    for (var n = loop.nextElementSibling; n && n.tagName === "P"; n = n.nextElementSibling) ps.push(n);
    if (!ps.length) return false;
    var groups = [];
    ps.forEach(function (p) {
      var f = p.firstElementChild;
      var lead = f && (f.tagName === "STRONG" || f.tagName === "B") &&
        p.textContent.trim().indexOf(f.textContent.trim()) === 0;
      if (lead || !groups.length) {
        groups.push({ title: lead ? f.textContent.trim().replace(/[.:]\s*$/, "") : "Read more", ps: [] });
        if (lead) f.classList.add("rv-fold-lead");
      }
      groups[groups.length - 1].ps.push(p);
    });
    groups.forEach(function (g) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rv-fold-head";
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = CHEVRON + "<span></span>";
      btn.querySelector("span").textContent = g.title;
      g.ps[0].parentNode.insertBefore(btn, g.ps[0]);
      g.ps.forEach(function (p, k) {
        p.classList.add("rv-fold-p");
        if (k === g.ps.length - 1) p.classList.add("rv-fold-p--last");
        p.hidden = true;
      });
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        btn.classList.toggle("is-open", open);
        g.ps.forEach(function (p) { p.hidden = !open; });
      });
    });
    return true;
  }
  function run() {
    try { if (build()) return; } catch (e) { console.warn("[extra] folds", e); return; }
    if (++tries < 60) setTimeout(run, 250);
  }
  if (document.readyState === "complete") setTimeout(run, 400);
  else addEventListener("load", function () { setTimeout(run, 400); });
})();

/* v2: horizontal SDG 9 + 13 picture under the goal 9 card, never taller than
   the space left before the end of the goal 13 card. */
(function () {
  var SRCS = [
    "img/sdg-9-13-horizontal.avif",
    "https://static.igem.wiki/teams/6124/wiki/sustainability/sdg-9-13-horizontal.avif",
    "img/sdg-9-13-horizontal.webp"
  ];
  var tries = 0;
  function fit() {
    var fig = document.querySelector(".sus-unclaimed__sdg");
    var cards = document.querySelectorAll(".sus-unclaimed > article");
    if (!fig || cards.length < 2) return;
    var img = fig.querySelector("img");
    if (window.innerWidth <= 900) { img.style.maxHeight = ""; return; }
    var room = cards[cards.length - 1].getBoundingClientRect().bottom - fig.getBoundingClientRect().top - 6;
    img.style.maxHeight = Math.max(140, Math.min(320, Math.floor(room))) + "px";
  }
  function setup() {
    var img = document.querySelector(".sus-unclaimed__sdg img");
    if (!img) return false;
    // Only swap if the new picture exists (otherwise keep the original one).
    var list = SRCS.slice();
    (function next() {
      var src = list.shift();
      if (!src) return;
      var probe = new Image();
      probe.onload = function () { img.removeAttribute("srcset"); img.src = src; };
      probe.onerror = next;
      probe.src = src;
    })();
    img.addEventListener("load", fit);
    window.addEventListener("resize", fit);
    if ("ResizeObserver" in window) new ResizeObserver(fit).observe(document.querySelector(".sus-unclaimed"));
    fit();
    return true;
  }
  function run() {
    try { if (setup()) return; } catch (e) { console.warn("[extra] sdg", e); return; }
    if (++tries < 60) setTimeout(run, 250);
  }
  if (document.readyState === "complete") setTimeout(run, 400);
  else addEventListener("load", function () { setTimeout(run, 400); });
})();


/* v3: click any picture of the page to see it large, with its caption.
   Esc or a click on the dark background closes it; arrows go to the next one. */
(function () {
  var SEL = ".sus-design figure img, .sus-design .rv-loop .loop-card img";
  var box = null, list = [], idx = 0;
  function zoomables() {
    return [].slice.call(document.querySelectorAll(SEL)).filter(function (i) {
      return !i.closest("button") && !i.closest(".rv-zoom");
    });
  }
  function caption(img) {
    var f = img.closest("figure");
    var c = f && f.querySelector("figcaption");
    return c ? c.innerHTML : "";
  }
  function show(i) {
    idx = (i + list.length) % list.length;
    var im = list[idx];
    var big = box.querySelector(".rv-zoom__img");
    big.src = im.currentSrc || im.src;
    big.alt = im.alt || "";
    var cap = box.querySelector(".rv-zoom__cap");
    cap.innerHTML = caption(im);
    cap.style.display = cap.innerHTML ? "" : "none";
  }
  function close() {
    if (!box) return;
    box.remove();
    box = null;
    window.removeEventListener("keydown", onKey, true);
  }
  function onKey(e) {
    if (!box) return;
    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); close(); }
    else if (e.key === "ArrowLeft" && list.length > 1) { e.preventDefault(); e.stopPropagation(); show(idx - 1); }
    else if (e.key === "ArrowRight" && list.length > 1) { e.preventDefault(); e.stopPropagation(); show(idx + 1); }
  }
  function open(img) {
    list = zoomables();
    var i = list.indexOf(img);
    if (i < 0) return;
    box = document.createElement("div");
    box.className = "rv-zoom";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Enlarged image");
    box.innerHTML =
      '<button type="button" class="rv-zoom__close" aria-label="Close">&times;</button>' +
      (list.length > 1 ? '<button type="button" class="rv-zoom__nav rv-zoom__nav--prev" aria-label="Previous image">&lsaquo;</button>' : "") +
      '<figure class="rv-zoom__fig"><img class="rv-zoom__img" alt=""><figcaption class="rv-zoom__cap"></figcaption></figure>' +
      (list.length > 1 ? '<button type="button" class="rv-zoom__nav rv-zoom__nav--next" aria-label="Next image">&rsaquo;</button>' : "");
    box.addEventListener("click", function (e) {
      var t = e.target;
      if (t === box || t.closest(".rv-zoom__close")) close();
      else if (t.closest(".rv-zoom__nav--prev")) show(idx - 1);
      else if (t.closest(".rv-zoom__nav--next")) show(idx + 1);
    });
    document.body.appendChild(box);
    window.addEventListener("keydown", onKey, true);
    show(i);
    box.querySelector(".rv-zoom__close").focus();
  }
  document.addEventListener("click", function (e) {
    var img = e.target && e.target.closest && e.target.closest(SEL.split(",").map(function (s) { return s.trim(); }).join(","));
    if (!img || img.closest("button") || img.closest(".rv-zoom")) return;
    e.preventDefault();
    open(img);
  });
})();
