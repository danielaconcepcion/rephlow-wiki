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
    el.style.backgroundImage = 'url("thumbs/thumb-' + id.replace("file-", "") + '.webp")';
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
  var GONE = ["file-parts", "asset-zip-blender", "file-pitch", "file-sf-calc", "file-mu-logo1", "file-mu-logo2",
    "asset-script-01", "asset-script-02", "asset-script-03", "asset-script-04", "asset-script-05", "asset-script-06", "asset-script-07"];
  function gone(id) { return id && GONE.indexOf(id) >= 0; }
  try {
    Object.keys(BUNDLES).forEach(function (k) {
      BUNDLES[k].files = BUNDLES[k].files.filter(function (f) { return !gone(f[0]); });
    });
  } catch (e) { console.warn("[extra] bundles", e); }
  // banners whose only purpose was a removed download go away, with their index entry
  ["parts-files", "bl-kit"].forEach(function (id) {
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
