
/* ===================================================================
   Review fixes - Diego, 19 Oct 2026.
   Applied after React has mounted; each fix is independent and guarded,
   so one failing cannot take the others down.
   =================================================================== */
(function () {
  var LOOP_HTML = "<div class=\"loop\" id=\"loop\">\n    <div class=\"loop-card\">\n      <img src=\"https://static.igem.wiki/teams/6124/wiki/sustainability/sus-20.webp\" alt=\"Roberto Arranz Arranz\">\n      <div>\n        <h4>Roberto Arranz Arranz</h4>\n        <div class=\"nm\">Programme Director, CEDEX \u00b7 6 October 2026</div>\n        <dl class=\"qcr\">\n          <dt>Question</dt><dd>Having read what we changed after CEDEX, where is this sustainability case still weak?</dd>\n          <dt>Challenge raised</dt><dd>Our account rests on three pillars, technical, economic and environmental, and treats the fourth, the social one, as communication rather than as a design constraint.</dd>\n          <dt>Response</dt><dd>We adopted the four-pillar frame, named our likely points of conflict, and opened repairability and capsule service life as engineering questions rather than operational details.</dd>\n        </dl>\n      </div>\n    </div>\n\n    <div class=\"loop-steps\" role=\"tablist\" aria-label=\"The CEDEX loop\">\n      <button role=\"tab\" class=\"ls on\" data-s=\"0\" aria-selected=\"true\"><b>Oct 2025</b><span>Why we went back</span></button>\n      <button role=\"tab\" class=\"ls\" data-s=\"1\" aria-selected=\"false\"><b>Pillars</b><span>The one we had skipped</span></button>\n      <button role=\"tab\" class=\"ls\" data-s=\"2\" aria-selected=\"false\"><b>Market</b><span>Where he saw the opening</span></button>\n      <button role=\"tab\" class=\"ls\" data-s=\"3\" aria-selected=\"false\"><b>Regulation</b><span>One correction</span></button>\n      <button role=\"tab\" class=\"ls\" data-s=\"4\" aria-selected=\"false\"><b>Oct 2026</b><span>What changes now</span></button>\n    </div>\n\n    <div class=\"loop-panels\">\n      <div class=\"lp on\" data-s=\"0\">\n        <p>In October 2025, CEDEX told us two things we had not wanted to hear: that our phosphorus assay was not a reference method, and that rePhlow was being designed against a generic idea of clean water rather than a legal limit. We changed both. Nearly a year later we sent the revised sustainability text to Roberto Arranz, Programme Director at CEDEX, and met him to go back over what that first conversation had produced. The meeting existed to check our own work, not to present it.</p>\n        <p>This is the only engagement in this room where the revised version went back to the institution whose input produced it, and we note the limit of that: the loop closes at CEDEX rather than with the individual colleagues who opened it.</p>\n      </div>\n      <div class=\"lp\" data-s=\"1\">\n        <div class=\"pillars\" id=\"pillars\">\n          <button class=\"pil\" data-p=\"0\"><span>Technical</span></button>\n          <button class=\"pil\" data-p=\"1\"><span>Economic</span></button>\n          <button class=\"pil\" data-p=\"2\"><span>Environmental</span></button>\n          <button class=\"pil missing on\" data-p=\"3\"><span>Social</span><small>written as an afterthought</small></button>\n        </div>\n        <div class=\"pil-note\" id=\"pilNote\"><b>Social, the pillar we had written as an afterthought.</b> Three predictable ways a process like ours fails socially:<ul><li>rejection of a bacterial process as such</li><li>the complexity of the mechanism compared with dosing a chemical</li><li>the ordinary nuisances of a treatment plant, odour and sludge handling</li></ul></div>\n        <p>Roberto set out sustainability as four pillars: technical, economic, environmental and social. We had written three. Our social evidence amounted to one conversation with a reservoir resident, and we had treated acceptance as something that follows a working technology rather than something that constrains its design.</p>\n        <p>His argument was that a process fails socially in specific, predictable ways, and that a team can name them in advance instead of discovering them on site. For rePhlow he named three: rejection of a bacterial process as such, the complexity of the mechanism compared with dosing a chemical, and the ordinary nuisances of a treatment plant, odour and sludge handling, that decide whether neighbours accept a facility regardless of what it removes.</p>\n        <p>The point he marked as most important was <b>repairability</b>, at the level of both the operator and the plant manager. Our hardware work had asked whether the reactor runs. It had not asked who repairs it, with what training, and how long the line is down meanwhile. Iron(III) chloride dosing fails in ways any plant operator already knows how to fix. A contained biological module does not, and that asymmetry belongs with the access tension we describe in <a class=\"room-link\" href=\"#r01\">Room 01</a> rather than apart from it.</p>\n        <p>He also asked a question our own documentation cannot answer: how long do the alginate capsules hold up under operation? We report structural integrity under reactor conditions (see Hardware), but not service life. Until we can state it, we cannot state a replacement rate, and without a replacement rate our life cycle assessment rests on an assumption rather than a measurement. That matters, because bead production dominates our carbon footprint (<a class=\"room-link\" href=\"#r03\">Room 03</a>).</p>\n      </div>\n      <div class=\"lp\" data-s=\"2\">\n        <p>On the economic pillar, Roberto described how the market for biodiesel exists because fuel is required to contain a proportion of it: the demand is created by the blending obligation, not by each producer separately. The mechanism is set out in the Renewable Energy Directive, which requires Member States to reach either a 29% renewable share in transport energy or a 14.5% reduction in transport greenhouse-gas intensity by 2030, with a binding sub-target of 5.5% for advanced biofuels and renewable fuels of non-biological origin.<a href=\"#r02refs\" class=\"cite\">[2]</a></p>\n        <div class=\"blend\">\n          <div class=\"bl-row\"><span class=\"bl-k\">Biodiesel today</span><span class=\"bl-a\">blending obligation</span><span class=\"bl-arrow\">creates</span><span class=\"bl-b\">a market</span></div>\n          <div class=\"bl-row next\"><span class=\"bl-k\">Phosphorus, if</span><span class=\"bl-a\">recycled-P content in fertiliser</span><span class=\"bl-arrow\">would create</span><span class=\"bl-b\">demand for a pure product</span></div>\n        </div>\n        <p>Applied to phosphorus, if mineral fertiliser were required to contain a fraction of nutrient recovered from wastewater, the demand would follow, and it would be demand for a pure product, which is precisely what distinguishes biological recovery from iron-bound chemical sludge. He contrasted this with the current practice of returning chemical sludge to agriculture, which he thought deserved more scrutiny than it gets.</p>\n        <p>We had treated recovery as a technical result. He described the condition under which it becomes a market, which is the condition under which it reaches scale. This is not a hypothetical instrument: Directive (EU) 2024/3019 empowers the Commission to set a minimum combined reuse and recycling rate for phosphorus from sludge and urban wastewater, and asks Member States to encourage the purchase of recovered nutrients.<a href=\"#r02refs\" class=\"cite\">[3]</a> Roberto reached the mechanism from the market side; the Directive reaches it from the regulatory side. That convergence is the strongest evidence we have that target 12.2 has a route and not only an aspiration.</p>\n      </div>\n      <div class=\"lp\" data-s=\"3\">\n        <p>Roberto pointed out that the urban wastewater framework governs urban discharges, not industrial ones, and that what determines the requirement for an industrial discharge is concentration and flow, with very high or very low flow treated as distinct cases. Where effluent goes directly to a watercourse, a concentration and quality study is carried out. We went back to <a class=\"room-link\" href=\"#r01\">Room 01</a> to check that our claim about regulatory pressure reaching industrial dischargers is stated with that precision.</p>\n        <p>He also asked us to run the life cycle assessment under a renewable energy scenario. That analysis belongs to <a class=\"room-link\" href=\"#r03\">Room 03</a>, where our climate result currently stands against us, and it is recorded there.</p>\n      </div>\n      <div class=\"lp\" data-s=\"4\">\n        <p>We went to Roberto for an audit, not for a design input, and an audit changes what you are entitled to say rather than what you have already built. It did that. A sustainability case resting on three pillars is no longer one we present as complete. Repairability and capsule service life have moved from things we had not thought to ask about to named engineering questions with a place in our roadmap. The social pillar has a set of specific conflicts to design against instead of a single interview.</p>\n        <p>The design itself has not moved, and it should not have on this timescale: a claim can be withdrawn in an afternoon, a reactor cannot. What we can show is that the last external reading of this work made it narrower rather than louder.</p>\n      </div>\n    </div>\n  </div>";
  var done = {};

  function step(name, fn) {
    if (done[name]) return true;
    try { if (fn() !== false) { done[name] = true; return true; } }
    catch (e) { console.warn("[review fix] " + name, e); }
    return false;
  }

  /* -- C2 -----------------------------------------------------------
     "Phosphate-laden water in" and "Treated water out" sat outside the
     plant outline and clipped at the edges. Move both inside the box,
     into empty floor, clear of every room card.                      */
  function fixPlantLabels() {
    var map = document.querySelector("#plant-map");
    if (!map) return false;
    var hit = 0;
    map.querySelectorAll("div").forEach(function (d) {
      var t = (d.textContent || "").trim();
      if (d.children.length) return;
      if (t === "Phosphate-laden water in") {
        var box = d.parentElement;   /* free floor band inside the top wall */
        box.style.left = "13%"; box.style.right = "auto";
        box.style.top = "10.5%"; box.style.width = "26%";
        box.style.textAlign = "left";
        d.style.fontSize = "13.5px"; d.style.whiteSpace = "nowrap";
        hit++;
      }
      if (t === "Treated water out") {
        var b2 = d.parentElement;
        b2.style.right = "13%"; b2.style.left = "auto";
        b2.style.top = "10.5%"; b2.style.width = "22%";
        b2.style.textAlign = "right";
        d.style.fontSize = "13.5px"; d.style.whiteSpace = "nowrap";
        hit++;
      }
    });
    return hit === 2;
  }

  /* -- C1 -----------------------------------------------------------
     The water-chain diagram belongs inside the purple Vinesys panel,
     and the water should visibly travel from the Vinesys end to ours. */
  function fixWaterChain() {
    var svg = document.querySelector("svg.sus-chain:not(.rv-chain-in-panel)");
    if (!svg) return false;
    if (!svg.querySelector(".sus-chain__drop")) {
      var ns = "http://www.w3.org/2000/svg";
      var g = document.createElementNS(ns, "g");
      g.setAttribute("aria-hidden", "true");
      for (var i = 0; i < 3; i++) {
        var c = document.createElementNS(ns, "circle");
        c.setAttribute("class", "sus-chain__drop");
        c.setAttribute("cx", "164"); c.setAttribute("cy", "86");
        c.setAttribute("r", "5");
        g.appendChild(c);
      }
      svg.appendChild(g);
      var lab = svg.querySelector("[aria-label]") ? svg : null;
      if (lab) lab.setAttribute("aria-label",
        "The water chain: water flows from the Vinesys perimeter, through the " +
        "process, into the rePhlow perimeter, where phosphorus is recovered.");
    }
    var panel = svg.parentElement &&
      svg.parentElement.querySelector(":scope > .sus-prose-panel");
    if (!panel) {
      var sib = svg.nextElementSibling;
      while (sib && !(sib.classList && sib.classList.contains("sus-prose-panel")))
        sib = sib.nextElementSibling;
      panel = sib;
    }
    if (!panel) return false;
    /* Show a copy inside the panel and hide the original: moving React's own
       node made the whole page go blank when another target was opened. */
    if (panel.querySelector(".rv-chain-in-panel")) return true;
    var anchor = panel.querySelector("p");
    var copy = svg.cloneNode(true);
    copy.classList.add("rv-chain-in-panel");
    svg.style.display = "none";
    if (anchor && anchor.nextSibling) panel.insertBefore(copy, anchor.nextSibling);
    else panel.appendChild(copy);
    return true;
  }

  /* -- C4 -----------------------------------------------------------
     Hotspots over the canvas's stakeholder boxes. Each one selects the
     matching stakeholder in the list directly below.
     Coordinates are percentages of the 1500x819 artwork.             */
  var HOTSPOTS = [
    ["Industries producing wastewater", "Bio-Oils Huelva",        50.5, 19.5, 10.7,  6.0],
    ["WWTPs",                           "CEDEX",                  50.5, 27.8, 10.7, 17.5],
    ["UCM, CSIC and other R&D partners","Eduardo García Junceda", 62.4, 19.3, 10.7, 17.3],
    ["Academic institutions",           "Mª C. García Payo",  74.2, 19.5, 10.8,  5.9],
    ["Biofuel Industries",              "Repsol",                 62.4, 74.2, 10.7,  5.6],
    ["Local communities",               "Local people",           86.0, 19.3, 10.5, 30.8],
    ["General public",                  "Schools, workshop and museum audiences",
                                                                  86.0, 50.1, 10.5, 30.2]
  ];

  function fixCanvasHotspots() {
    var fig = document.querySelector("#r02 > figure");
    var img = fig && fig.querySelector("img");
    if (!img) return false;
    var holder = img.closest("button") || img.parentElement;
    if (!holder || holder.querySelector(".rv-hot")) return true;
    holder.classList.add("rv-canvas-wrap");
    if (getComputedStyle(holder).position === "static")
      holder.style.position = "relative";

    var list = document.querySelector("#r02 .sus-voices__list");
    var buttons = list ? [].slice.call(list.querySelectorAll("button")) : [];
    if (!buttons.length) return false;

    HOTSPOTS.forEach(function (h) {
      var label = h[0], target = h[1];
      var match = buttons.filter(function (b) {
        return b.innerText.indexOf(target) === 0;
      })[0];
      if (!match) return;
      var hot = document.createElement("button");
      hot.type = "button";
      hot.className = "rv-hot";
      hot.style.left = h[2] + "%"; hot.style.top = h[3] + "%";
      hot.style.width = h[4] + "%"; hot.style.height = h[5] + "%";
      hot.setAttribute("aria-label", "Open " + target + " in the list below");
      hot.innerHTML = '<span class="rv-hot__tip"></span>';
      hot.firstChild.textContent = label + " → " + target;
      hot.addEventListener("click", function (ev) {
        ev.preventDefault(); ev.stopPropagation();
        match.click();
        var det = document.querySelector("#r02 .sus-voices");
        if (det) det.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      holder.appendChild(hot);
    });

    var cap = fig.querySelector("figcaption");
    if (cap && !cap.querySelector(".rv-hot__hint")) {
      var hint = document.createElement("p");
      hint.className = "rv-hot__hint";
      hint.textContent =
        "Select a stakeholder group on the canvas to open it in the list below.";
      cap.appendChild(hint);
    }
    return true;
  }

  /* -- C8 -----------------------------------------------------------
     The characterised profile at the experimental target moves up
     beside the base-case profile, so 1.5 mg P/g and the target case
     are read side by side, each at half width.                       */
  function fixFigurePair() {
    var r03 = document.querySelector("#r03");
    if (!r03) return false;
    var figs = r03.querySelectorAll(":scope > figure");
    if (figs.length < 3) return false;
    var base = figs[0], target = figs[2];
    if (base.parentElement.classList.contains("rv-fig-pair")) return true;
    var row = document.createElement("div");
    row.className = "rv-fig-pair";
    base.parentNode.insertBefore(row, base);
    row.appendChild(base);
    row.appendChild(target);
    return true;
  }

  /* -- C7 -----------------------------------------------------------
     The CEDEX / Roberto Arranz block, rebuilt in the format of the
     version reviewed in the meeting: photo, question-challenge-response
     card, and five steps revealed one at a time instead of one long
     expanded column.                                                 */
  function fixRobertoLoop() {
    var r02 = document.querySelector("#r02");
    if (!r02) return false;
    var panels = r02.querySelectorAll(":scope > div.sus-prose-panel");
    var old = null;
    panels.forEach(function (p) {
      if (p.textContent.indexOf("Roberto Arranz Arranz") !== -1) old = p;
    });
    if (!old) return false;
    if (old.dataset.rvReplaced) return true;

    var wrap = document.createElement("div");
    wrap.className = "rv-loop";
    wrap.innerHTML = LOOP_HTML;
    var inner = wrap.querySelector("#loop");
    if (inner) {                       /* unwrap the reference container */
      inner.removeAttribute("id");
      wrap.innerHTML = inner.innerHTML;
    }
    old.dataset.rvReplaced = "1";
    old.replaceWith(wrap);

    function wire(btnSel, panSel, attr) {
      var bs = [].slice.call(wrap.querySelectorAll(btnSel));
      var ps = [].slice.call(wrap.querySelectorAll(panSel));
      bs.forEach(function (b) {
        b.addEventListener("click", function () {
          var k = b.getAttribute(attr);
          bs.forEach(function (x) {
            var on = x.getAttribute(attr) === k;
            x.classList.toggle("on", on);
            x.classList.toggle("done",
              !on && Number(x.getAttribute(attr)) < Number(k));
            if (x.hasAttribute("role")) x.setAttribute("aria-selected", on);
          });
          ps.forEach(function (x) {
            x.classList.toggle("on", x.getAttribute(attr) === k);
          });
        });
      });
    }
    wire(".ls", ".lp", "data-s");

    /* the four pillars inside step 2 */
    var pils = [].slice.call(wrap.querySelectorAll(".pil"));
    var note = wrap.querySelector(".pil-note");
    if (pils.length && note) {
      var texts = pils.map(function (p) {
        return p.getAttribute("data-note") || "";
      });
      pils.forEach(function (p, i) {
        p.addEventListener("click", function () {
          pils.forEach(function (x) { x.classList.remove("on"); });
          p.classList.add("on");
          if (texts[i]) note.innerHTML = texts[i];
        });
      });
    }
    return true;
  }

  var STEPS = [
    ["plant labels", fixPlantLabels],
    ["canvas hotspots", fixCanvasHotspots],
    ["figure pair", fixFigurePair],
    ["roberto loop", fixRobertoLoop]
  ];

  var tries = 0;
  function run() {
    var all = true;
    STEPS.forEach(function (s) { if (!step(s[0], s[1])) all = false; });
    if (!all && ++tries < 40) setTimeout(run, 250);
  }

  /* The water chain lives inside target 12.2 of the goal console, which is
     mounted only once a reader opens that target - and remounted every time
     they switch. Watch for it instead of running once at load. */
  function watchWaterChain() {
    var pending = false;
    function apply() {
      pending = false;
      var svg = document.querySelector("svg.sus-chain:not(.rv-chain-in-panel)");
      if (!svg) return;
      if (svg.style.display === "none") return;   /* already moved */
      try { fixWaterChain(); } catch (e) { console.warn("[review fix] chain", e); }
    }
    new MutationObserver(function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(apply);
    }).observe(document.body, { childList: true, subtree: true });
    apply();
  }
  function boot() { setTimeout(run, 120); watchWaterChain(); }
  if (document.readyState === "complete") boot();
  else addEventListener("load", boot);
})();
