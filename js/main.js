// Subham Nayak — Portfolio (vanilla JS, no dependencies)
// Everything here is an enhancement: the site still works if this file fails to load.
(function () {
  "use strict";

  // Run a callback when an <img> fails to load (also catches errors that happened before this script ran)
  function onBroken(img, fn) {
    if (img.complete && img.naturalWidth === 0) { fn(); }
    else { img.addEventListener("error", fn, { once: true }); }
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Mobile navigation (opens/closes with a CSS transition) ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    function setMenu(open) {
      links.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    }
    toggle.addEventListener("click", function () {
      setMenu(!links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
  }

  // ---- Profile photo fallback ----
  document.querySelectorAll("img[data-fallback='photo']").forEach(function (img) {
    onBroken(img, function () {
      var ph = document.createElement("div");
      ph.className = "photo-placeholder";
      ph.setAttribute("role", "img");
      ph.setAttribute("aria-label", "Profile photo placeholder");
      ph.textContent = "Profile photo placeholder — add assets/profile.jpg";
      img.replaceWith(ph);
    });
  });

  // ---- Intro video fallback ----
  document.querySelectorAll("video[data-fallback='video']").forEach(function (video) {
    var source = video.querySelector("source");
    function showPlaceholder() {
      var box = document.createElement("div");
      box.className = "placeholder-box";
      box.innerHTML =
        "<strong>Intro video placeholder</strong>" +
        "Add your video as <code>assets/intro.mp4</code>, or use a YouTube/Vimeo embed (see the README).";
      video.replaceWith(box);
    }
    if (source) source.addEventListener("error", showPlaceholder, { once: true });
    video.addEventListener("error", showPlaceholder, { once: true });
  });

  // ---- Project screenshot fallback ----
  document.querySelectorAll("img[data-fallback='shot']").forEach(function (img) {
    onBroken(img, function () {
      var span = document.createElement("span");
      span.textContent = "Screenshot placeholder — add " + (img.getAttribute("data-file") || "an image to assets/projects/");
      img.replaceWith(span);
    });
  });

  // ---- Certificates: placeholder + safe download button when an image is missing ----
  document.querySelectorAll(".cert-card").forEach(function (card) {
    var img = card.querySelector(".cert-img img");
    var btn = card.querySelector("[data-cert-download]");
    if (!img) return;
    onBroken(img, function () {
      var frame = img.parentElement;
      var file = img.getAttribute("src");
      frame.classList.add("is-missing");
      frame.innerHTML = "<p>Certificate image not added yet.<br>Save it as <code>" + file + "</code></p>";
      if (btn) {
        btn.setAttribute("aria-disabled", "true");
        btn.removeAttribute("download");
        btn.textContent = "Add certificate image to enable download";
        btn.addEventListener("click", function (e) { e.preventDefault(); });
      }
    });
  });

  // Links that are still placeholders (aria-disabled) should not jump the page
  document.querySelectorAll("a[aria-disabled='true']").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  // ---- Contact form: front-end only, opens the visitor's email app via mailto: ----
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var to = form.getAttribute("data-mailto");
      var name = form.elements["name"].value.trim();
      var email = form.elements["email"].value.trim();
      var msg = form.elements["message"].value.trim();
      var subject = encodeURIComponent("Portfolio enquiry from " + name);
      var body = encodeURIComponent(msg + "\n\n— " + name + " (" + email + ")");
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }

  // ---- Blog: category filters + keyword search (blog.html) ----
  // Each article card carries data-categories="Python|SQL". Search looks at title, description and categories.
  var grid = document.getElementById("blog-grid");
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".blog-card"));
    var tools = document.getElementById("blog-tools");
    var searchBox = document.getElementById("blog-search");
    var filterBtns = Array.prototype.slice.call(document.querySelectorAll(".filter-btn"));
    var countEl = document.getElementById("blog-count");
    var emptyEl = document.getElementById("blog-empty");
    var clearBtn = document.getElementById("blog-clear");
    var activeCategory = "all";

    // Build a lowercase search string for each card from its visible text
    cards.forEach(function (card) {
      var title = (card.querySelector("h3") || {}).textContent || "";
      var desc = (card.querySelector(".blog-desc") || {}).textContent || "";
      var cats = (card.getAttribute("data-categories") || "").split("|").join(" ");
      card.setAttribute("data-search", (title + " " + desc + " " + cats).toLowerCase());
    });

    function applyFilters() {
      var terms = (searchBox.value || "").toLowerCase().split(/\s+/).filter(Boolean);
      var shown = 0;
      cards.forEach(function (card) {
        var cats = (card.getAttribute("data-categories") || "").split("|");
        var inCategory = activeCategory === "all" || cats.indexOf(activeCategory) !== -1;
        var hay = card.getAttribute("data-search");
        var matches = terms.every(function (t) { return hay.indexOf(t) !== -1; });
        var visible = inCategory && matches;
        card.hidden = !visible;
        if (visible) shown++;
      });
      countEl.textContent = "Showing " + shown + " of " + cards.length + " article" + (cards.length === 1 ? "" : "s");
      emptyEl.hidden = shown !== 0;
    }

    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-filter");
        filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        applyFilters();
      });
    });
    searchBox.addEventListener("input", applyFilters);
    clearBtn.addEventListener("click", function () {
      searchBox.value = "";
      activeCategory = "all";
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === "all")); });
      applyFilters();
      searchBox.focus();
    });

    tools.hidden = false;   // filters need JavaScript, so they only appear when it runs
    applyFilters();
  }

  // ---- Code highlighting for articles (Python, SQL, DAX). Plain text stays readable without JS. ----
  var PY_WORDS = "and|as|assert|break|class|continue|def|del|elif|else|except|False|finally|for|from|if|import|in|is|lambda|None|not|or|pass|raise|return|True|try|while|with|yield";
  var SQL_WORDS = "SELECT|FROM|WHERE|GROUP|BY|ORDER|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AS|AND|OR|NOT|IN|IS|NULL|CASE|WHEN|THEN|ELSE|END|WITH|OVER|PARTITION|ASC|DESC|LIMIT|DISTINCT|UNION|ALL|BETWEEN|LIKE|ROWS|UNBOUNDED|PRECEDING|CURRENT|ROW|COUNT|SUM|AVG|MIN|MAX|ROUND|COALESCE|NULLIF|LAG|ROW_NUMBER|DATE_TRUNC";
  var DAX_WORDS = "VAR|RETURN|SUM|DISTINCTCOUNT|DIVIDE|CALCULATE|SAMEPERIODLASTYEAR|AVERAGE|COUNTROWS|FILTER|ALL";
  var LANGS = {
    python: { comment: /#[^\n]*/.source, string: /"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/.source, words: PY_WORDS, flags: "g" },
    sql: { comment: /--[^\n]*/.source, string: /'(?:''|[^'])*'/.source, words: SQL_WORDS, flags: "gi" },
    dax: { comment: /\/\/[^\n]*/.source, string: /"(?:""|[^"])*"/.source, words: DAX_WORDS, flags: "gi" }
  };
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  document.querySelectorAll("pre code[class*='language-']").forEach(function (block) {
    var m = /language-(\w+)/.exec(block.className);
    var lang = m && LANGS[m[1]];
    if (!lang) return;
    var re = new RegExp("(" + lang.comment + ")|(" + lang.string + ")|\\b(" + lang.words + ")\\b|(\\b\\d+(?:\\.\\d+)?\\b)", lang.flags);
    var text = block.textContent, out = "", last = 0, hit;
    while ((hit = re.exec(text)) !== null) {
      if (hit[0] === "") { re.lastIndex++; continue; }
      out += esc(text.slice(last, hit.index));
      var cls = hit[1] ? "tok-c" : hit[2] ? "tok-s" : hit[3] ? "tok-k" : "tok-n";
      out += '<span class="' + cls + '">' + esc(hit[0]) + "</span>";
      last = hit.index + hit[0].length;
    }
    block.innerHTML = out + esc(text.slice(last));
  });

  // ---- Scroll-triggered fade-in (skipped for reduced motion) ----
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }
})();
