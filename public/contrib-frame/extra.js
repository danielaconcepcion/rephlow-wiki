/* Changes requested on 20 Oct 2026 (runs after main.js):
   - Parts: the status legend inside each family instead of once at the top
   - PDFs: an "Open in browser" button next to each one
   - How-to guides: each title in the colour of its number */
(function () {
  var ICON_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
  var files = (typeof FILES !== "undefined") ? FILES : {};

  /* 1) legend in each family */
  var legend = document.getElementById("cb-legend");
  var hint = document.getElementById("cb-hint");
  var heads = document.querySelectorAll("#panel-parts .cb-family__head");
  if (legend && hint && heads.length) {
    heads.forEach(function (head, i) {
      if (i === 0) {
        head.after(legend, hint);
      } else {
        var l = legend.cloneNode(true); l.removeAttribute("id");
        var h = hint.cloneNode(true); h.removeAttribute("id");
        head.after(l, h);
      }
    });
    // each family only shows the statuses its own parts have
    heads.forEach(function (head) {
      var fam = head.closest(".cb-family");
      var l = head.nextElementSibling;
      if (!fam || !l || !l.classList.contains("cb-legend")) return;
      var have = {};
      fam.querySelectorAll(".cb-part[data-st]").forEach(function (c) { have[c.getAttribute("data-st")] = true; });
      l.querySelectorAll(".cb-legend__item").forEach(function (b) {
        if (!have[b.getAttribute("data-st")]) (b.closest("li") || b).remove();
      });
    });
    legend.classList.add("cb-legend--family");
    document.querySelectorAll("#panel-parts .cb-legend").forEach(function (l) { l.classList.add("cb-legend--family"); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest(".cb-legend__item")) return;
      setTimeout(function () {
        var txt = hint.textContent;
        document.querySelectorAll("#panel-parts .cb-hint").forEach(function (h) { h.textContent = txt; });
      }, 0);
    });
  }

  /* 1b) side index: the Parts links pointed to "imm", "gen"... while the blocks are
     "fam-imm", "fam-gen"... so they neither jumped nor followed the reading */
  document.querySelectorAll(".page-section-nav__link[data-jump]").forEach(function (a) {
    var id = a.getAttribute("data-jump");
    if (!document.getElementById(id) && document.getElementById("fam-" + id)) a.setAttribute("data-jump", "fam-" + id);
  });
  /* and the highlighted entry follows the block being read, like Experiments:
     the block whose top has passed just under the menu is the current one */
  var spyPanel = null;
  function spy() {
    if (!spyPanel) return;
    var links = spyPanel.querySelectorAll(".page-section-nav__link[data-jump]");
    var blocks = spyPanel.querySelectorAll(".cb-block[id]");
    if (!blocks.length) return;
    var cur = blocks[0];
    blocks.forEach(function (b) { if (b.getBoundingClientRect().top <= 170) cur = b; });
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) cur = blocks[blocks.length - 1];
    links.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("data-jump") === cur.id); });
  }
  window.addEventListener("scroll", spy, { passive: true });
  try {
    watchBlocks = function (panel) {
      try { if (navIO) navIO.disconnect(); } catch (e) {}
      spyPanel = panel;
      spy();
    };
    watchBlocks(document.getElementById("panel-" + active));
  } catch (e) { console.warn("[extra] index", e); }

  /* 2) "Open in browser" next to every PDF */
  function addOpen(btn, id) {
    var url = files[id];
    if (!url || btn.parentNode.querySelector('a[data-open="' + id + '"]')) return;
    var a = document.createElement("a");
    a.className = "btn btn--ghost cb-open";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("data-open", id);
    a.innerHTML = ICON_OPEN + "Open in browser";
    btn.after(a);
  }
  document.querySelectorAll(".btn[data-view]").forEach(function (b) { addOpen(b, b.getAttribute("data-view")); });
  document.querySelectorAll(".btn[data-dl]").forEach(function (b) {
    if (/\.pdf$/i.test(b.getAttribute("data-fn") || "")) addOpen(b, b.getAttribute("data-dl"));
  });

  /* 3) how-to titles in the colour of their number */
  document.querySelectorAll(".cb-guide").forEach(function (g) {
    var num = g.querySelector(".cb-guide__num");
    var h3 = g.querySelector(".cb-guide__body h3");
    if (num && h3) h3.style.color = num.style.background || getComputedStyle(num).backgroundColor;
  });
})();

/* v5 (20 Oct): the PDFs now live in iGEM Uploads (static.igem.wiki). If the
   browser is not allowed to read them from this page, the viewer shows them
   with the browser's own PDF reader, the guide covers come from small
   pictures, and the "download all" zips still contain everything they can,
   plus a Links.txt with the address of anything left out. */
(function () {
  var THUMBS = { "file-entrep": 1, "file-lca": 1, "file-meetup": 1, "file-selffund": 1, "file-wiki": 1 };
  document.querySelectorAll("[data-thumb]").forEach(function (el) {
    var id = el.getAttribute("data-thumb");
    if (!THUMBS[id]) return;
    el.style.backgroundImage = 'url("https://static.igem.wiki/teams/6124/wiki/contrubutions/thumb-' + id.replace("file-", "") + '.webp")';
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "top center";
  });
  try {
    viewerError = function (stage, id, fn) {
      var url = FILES[id];
      if (!url) return;
      stage.innerHTML = "";
      var f = document.createElement("iframe");
      f.className = "cb-pdf-frame";
      f.title = fn || "PDF";
      f.src = url + "#view=FitH";
      stage.appendChild(f);
    };
  } catch (e) { console.warn("[extra] viewer", e); }
  try {
    downloadBundle = async function (key) {
      var b = BUNDLES[key], all = [], miss = [];
      for (var i = 0; i < b.files.length; i++) {
        var id = b.files[i][0], name = b.files[i][1];
        try { all.push([name, await assetBytes(id)]); }
        catch (e) { miss.push(name + "\r\n  " + FILES[id]); }
      }
      if (miss.length) all.push(["Links.txt", new TextEncoder().encode("Download these files here:\r\n\r\n" + miss.join("\r\n\r\n") + "\r\n")]);
      var blob = makeZip(all);
      var url = URL.createObjectURL(blob), a = document.createElement("a");
      a.href = url; a.download = b.zip;
      document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 600);
    };
  } catch (e) { console.warn("[extra] bundle", e); }
})();

/* v6 (20 Oct): the in-page PDF reader (pdf.js, 1.3 MB) is removed so the wiki
   fits iGEM's publishing limit. PDFs open with the browser's own reader. */
(function () {
  try {
    openPdf = async function (id, fn) {
      mTitle.textContent = fn; mFile = [id, fn]; mText = null;
      mCopy.hidden = true; mTab.hidden = false; mTab.href = assetUrl(id, fn);
      mBody.className = "cb-modal__body is-pdf"; mBody.innerHTML = "";
      mPager.hidden = true;
      openModal();
      viewerError(mBody, id, fn);
    };
    openProtocolBook = async function () {
      viewerError($("#pv-stage"), "file-protocol", "rePhlow_Protocol_book.pdf");
    };
  } catch (e) { console.warn("[extra] pdf", e); }
  var hint = document.getElementById("pv-hint");
  if (hint) hint.textContent = "The book opens here with your browser's PDF reader.";
})();

/* v7 (20 Oct): only documents that live in iGEM Uploads stay on this page.
   The .zip, .pptx, .xlsx, .png and .py files are removed with their buttons. */
(function () {
  var GONE = ["file-parts", "file-pitch", "file-sf-calc", "file-mu-logo1", "file-mu-logo2"];
  function gone(id) { return id && GONE.indexOf(id) >= 0; }
  try {
    Object.keys(BUNDLES).forEach(function (k) {
      BUNDLES[k].files = BUNDLES[k].files.filter(function (f) { return !gone(f[0]); });
    });
  } catch (e) { console.warn("[extra] bundles", e); }
  // banners whose only purpose was a removed download go away, with their index entry
  ["parts-files"].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.remove();
    document.querySelectorAll('.page-section-nav__link[data-jump="' + id + '"]').forEach(function (a) { (a.closest("li") || a).remove(); });
  });
  document.querySelectorAll("[data-dl],[data-code],[data-view],[data-open]").forEach(function (b) {
    var id = b.getAttribute("data-dl") || b.getAttribute("data-code") || b.getAttribute("data-view") || b.getAttribute("data-open");
    if (gone(id)) b.remove();
  });
  document.querySelectorAll(".cb-tile__actions").forEach(function (d) { if (!d.children.length) d.remove(); });
})();

/* v8 (20 Oct): the complete self-funding budget (PDF in iGEM Uploads) goes into the
   self-funding pack, and every "The pack holds..." line is rewritten from the packs
   as they are now (the .xlsx calculator is no longer in it). */
(function () {
  try {
    FILES["file-sf-budget"] = "https://static.igem.wiki/teams/6124/wiki/contrubutions/igem-self-funding-budget-complete.pdf";
    var b = BUNDLES["file-selffund"];
    if (b && !b.files.some(function (f) { return f[0] === "file-sf-budget"; })) {
      b.files.push(["file-sf-budget", "iGEM self-funding budget (complete).pdf"]);
    }
    document.querySelectorAll("[data-bundle]").forEach(function (btn) {
      var pack = BUNDLES[btn.getAttribute("data-bundle")];
      var guide = btn.closest(".cb-guide");
      var p = guide && guide.querySelector(".cb-pack");
      if (!pack || !p) return;
      p.innerHTML = "<b>The pack holds " + pack.files.length + " files:</b> " +
        pack.files.map(function (f) { return esc(f[1]); }).join(" · ");
    });
  } catch (e) { console.warn("[extra] v8", e); }
})();

/* v10 (21 Oct): the Blender toolkit is back. Uploads does not take .py/.md/.txt, so the
   7 scripts, README and LICENSE live in one JSON file in iGEM Uploads; each file is read
   from it, single scripts download with their own name, and "Download all (.zip)"
   builds rephlow-blender-tools-v1.0.zip in the page. */
(function () {
  try {
    var SRC = "https://static.igem.wiki/teams/6124/wiki/contrubutions/rephlow-blender-tools.json";
    var NAME = {
      "asset-script-01": "01_procedural_hydrogel_generator.py",
      "asset-script-02": "02_procedural_perforated_mesh.py",
      "asset-script-03": "03_macro_studio_lighting_rig.py",
      "asset-script-04": "04_optimized_particle_instancing.py",
      "asset-script-05": "05_parametric_hardware_engraving.py",
      "asset-script-06": "06_procedural_mesh_slicer.py",
      "asset-script-07": "07_automated_infinite_rotation.py",
      "asset-bl-readme": "README.md",
      "asset-bl-license": "LICENSE"
    };
    Object.keys(NAME).forEach(function (id) { FILES[id] = SRC; });
    var pack = null;
    function blText(id) {
      if (!pack) pack = fetch(SRC).then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); });
      return pack.then(function (j) { var t = j.files[NAME[id]]; if (t == null) throw new Error("missing " + NAME[id]); return t; });
    }
    var plainBytes = getBytes;
    getBytes = function (id) {
      if (!NAME[id]) return plainBytes(id);
      return blText(id).then(function (t) { return new TextEncoder().encode(t); });
    };
    var DIR = "rephlow-blender-tools-v1.0/";
    BUNDLES["asset-zip-blender"] = { zip: "rephlow-blender-tools-v1.0.zip", files: Object.keys(NAME).map(function (id) { return [id, DIR + NAME[id]]; }) };
    var b = document.querySelector('[data-dl="asset-zip-blender"]');
    if (b) { b.removeAttribute("data-dl"); b.setAttribute("data-bundle", "asset-zip-blender"); }
    var plainDownload = download;
    download = function (id, fn) {
      if (!NAME[id]) return plainDownload(id, fn);
      getBytes(id).then(function (bytes) {
        var url = URL.createObjectURL(new Blob([bytes], { type: "text/plain" }));
        var a = document.createElement("a"); a.href = url; a.download = fn || NAME[id];
        document.body.appendChild(a); a.click();
        setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 600);
      }).catch(function (e) { console.warn("[extra] v10", e); });
    };
  } catch (e) { console.warn("[extra] v10", e); }
})();
