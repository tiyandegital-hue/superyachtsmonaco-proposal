/* SuperYachtsMonaco — shared site JS.
   Fleet data is DEMO ONLY: placeholder yachts with indicative figures from the
   Stitch export, clearly labelled on every card. No real listings, prices or
   rates are claimed anywhere on this site. */

const IMG = (id, w) => `https://images.unsplash.com/${id}?w=${w || 1200}&q=70&auto=format&fit=crop`;

/* Demo fleet — ONE consistent record per yacht, used by every page.
   Prices/rates/specs are Stitch-invented placeholders, labelled [DEMO FLEET]. */
const DEMO_FLEET = [
  {
    id: "aura", name: "M/Y AURA", type: "motor", length: 76.0, guests: 12, cabins: 6,
    builder: "Lürssen", year: 2022, refit: 2025, price: 89000000, rate: 750000,
    tag: "Central Agency", dest: ["Mediterranean", "French Riviera"],
    img: "photo-1567899378494-47b22a2ae96a"
  },
  {
    id: "navigator", name: "M/Y NAVIGATOR", type: "motor", length: 68.0, guests: 12, cabins: 7,
    builder: "Lürssen", year: 2021, refit: null, price: 54500000, rate: 480000,
    tag: "For Sale", dest: ["Mediterranean", "Greece"],
    img: "photo-1569263979104-865ab7cd8d13"
  },
  {
    id: "calypso", name: "M/Y CALYPSO", type: "motor", length: 62.0, guests: 12, cabins: 6,
    builder: "Benetti", year: 2019, refit: 2024, price: 32500000, rate: null,
    tag: "Price Reduction", dest: ["Caribbean"],
    img: "photo-1605281317010-fe5ffe798166"
  },
  {
    id: "monte-carlo", name: "M/Y MONTE CARLO", type: "motor", length: 58.0, guests: 10, cabins: 5,
    builder: "Sanlorenzo", year: 2021, refit: null, price: null, rate: null,
    tag: "Central Agency", dest: ["French Riviera", "Mediterranean"],
    img: "photo-1520255870062-bd79d3865de7"
  },
  {
    id: "aegean-breeze", name: "M/Y AEGEAN BREEZE", type: "sailing", length: 47.0, guests: 10, cabins: 5,
    builder: "Benetti", year: 2018, refit: null, price: 16500000, rate: null,
    tag: "For Sale", dest: ["Greece", "Croatia"],
    img: "photo-1540946485063-a40da27545f8"
  },
  {
    id: "artemis", name: "M/Y ARTEMIS", type: "motor", length: 42.0, guests: 8, cabins: 4,
    builder: "Princess", year: 2021, refit: null, price: null, rate: 260000,
    tag: "New Listing", dest: ["Bahamas", "Caribbean"],
    img: "photo-1552074284-5e88ef1aef18"
  },
  {
    id: "oceana", name: "M/Y OCEANA", type: "motor", length: 55.0, guests: 10, cabins: 5,
    builder: "Feadship", year: 2020, refit: null, price: null, rate: 310000,
    tag: "Charter", dest: ["Mediterranean", "Croatia"], charterOnly: true,
    img: "photo-1507525428034-b723cf961d3e"
  },
  {
    id: "solace", name: "M/Y SOLACE", type: "catamaran", length: 33.0, guests: 8, cabins: 4,
    builder: "Sunreef", year: 2022, refit: null, price: null, rate: 195000,
    tag: "Charter", dest: ["Bahamas", "Caribbean"], charterOnly: true,
    img: "photo-1500930287596-c1ecaa373bb2"
  },
  {
    id: "isla", name: "M/Y ISLA", type: "sailing", length: 38.0, guests: 8, cabins: 4,
    builder: "Oyster", year: 2019, refit: null, price: null, rate: null,
    tag: "Charter", dest: ["Greece", "Mediterranean"], charterOnly: true,
    img: "photo-1505118380757-91f5f5632de0"
  }
];

const fmtEUR = (n) => "€" + n.toLocaleString("en-IE");

function cardHTML(y, mode) {
  const isCharter = mode === "charter";
  const priceLabel = isCharter
    ? (y.rate ? fmtEUR(y.rate) + " <small>per week · demo rate</small>" : "Please enquire <small>demo rate on request</small>")
    : (y.price ? fmtEUR(y.price) + " <small>demo price</small>" : "Price on application <small>demo listing</small>");
  const yearLine = y.refit ? `${y.year} / Refit ${y.refit}` : `${y.year}`;
  /* Only M/Y AURA has a full detail page (the template). Other demo yachts
     link to the enquiry form pre-filled with the yacht — no dead links. */
  const detailLink = y.id === "aura"
    ? `<a class="card-link" href="yacht-aura.html">View yacht</a>`
    : (isCharter
      ? `<a class="card-link" href="charter-enquiry.html?yacht=${y.id}">Enquire</a>`
      : `<a class="card-link" href="buy-a-yacht.html?yacht=${y.id}">Enquire</a>`);
  const titleLink = y.id === "aura"
    ? `<h3><a href="yacht-aura.html">${y.name}</a></h3>`
    : `<h3>${y.name}</h3>`;
  return `
  <article class="yacht-card" data-type="${y.type}" data-builder="${y.builder}"
    data-length="${y.length}" data-guests="${y.guests}"
    data-price="${y.price || 0}" data-rate="${y.rate || 0}" data-year="${y.year}"
    data-dest="${y.dest.join(",").toLowerCase()}"
    data-search="${(y.name + " " + y.builder + " " + y.type).toLowerCase()}">
    <div class="photo">
      <img src="${IMG(y.img, 900)}" alt="${y.name}, ${y.length} metre ${y.type} yacht at sea — demo fleet photograph" loading="lazy">
      <span class="tag">${y.tag}</span>
      <span class="tag demo">Demo Fleet</span>
    </div>
    <div class="body">
      ${titleLink}
      <p class="sub">${y.length.toFixed(1)}m · ${y.builder} · ${yearLine}</p>
      <p class="spec-strip">
        <b>${y.length.toFixed(1)} m</b> · ${y.guests} guests · ${y.cabins} cabins<br>
        ${y.builder} · ${yearLine} · ${y.type === "sailing" ? "Sailing yacht" : y.type === "catamaran" ? "Catamaran" : y.type === "explorer" ? "Explorer" : "Motor yacht"}
      </p>
      <div class="price-row">
        <span class="price">${priceLabel}</span>
        ${detailLink}
      </div>
    </div>
  </article>`;
}

/* Render a fleet grid into #fleet-grid (sale or charter mode). */
function renderFleet(mode) {
  const grid = document.getElementById("fleet-grid");
  if (!grid) return;
  const list = DEMO_FLEET.filter((y) => (mode === "sale" ? !y.charterOnly : true));
  grid.innerHTML = list.map((y) => cardHTML(y, mode)).join("");
  applyFilters(mode);
}

/* Client-side filters + search + sort. */
function applyFilters(mode) {
  const grid = document.getElementById("fleet-grid");
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("result-count");
  if (!grid) return;
  const q = (document.getElementById("f-search")?.value || "").trim().toLowerCase();
  const type = document.getElementById("f-type")?.value || "all";
  const len = document.getElementById("f-length")?.value || "all";
  const guests = parseInt(document.getElementById("f-guests")?.value || "0", 10);
  const builder = document.getElementById("f-builder")?.value || "all";
  const band = document.getElementById("f-band")?.value || "all";
  const dest = document.getElementById("f-dest")?.value || "all";
  const sort = document.getElementById("f-sort")?.value || "length-desc";
  const cards = Array.from(grid.querySelectorAll(".yacht-card"));
  let visible = 0;
  cards.forEach((c) => {
    const d = c.dataset;
    let ok = true;
    if (q && !d.search.includes(q)) ok = false;
    if (type !== "all" && d.type !== type) ok = false;
    if (builder !== "all" && d.builder !== builder) ok = false;
    if (guests && parseInt(d.guests, 10) < guests) ok = false;
    if (dest !== "all" && !d.dest.includes(dest.toLowerCase())) ok = false;
    const L = parseFloat(d.length);
    if (len === "under-50" && L >= 50) ok = false;
    if (len === "50-65" && (L < 50 || L > 65)) ok = false;
    if (len === "over-65" && L <= 65) ok = false;
    const val = mode === "charter" ? parseFloat(d.rate) : parseFloat(d.price);
    if (band === "under-25" && (val === 0 || val >= 25000000)) ok = false;
    if (band === "25-60" && (val < 25000000 || val > 60000000)) ok = false;
    if (band === "over-60" && val <= 60000000) ok = false;
    if (band === "poa" && val !== 0) ok = false;
    c.style.display = ok ? "" : "none";
    if (ok) visible++;
  });
  const shown = cards.filter((c) => c.style.display !== "none");
  const key = sort === "price-asc" ? "price" : sort === "price-desc" ? "price"
    : sort === "year-desc" ? "year" : sort === "length-asc" ? "length" : "length";
  const dir = sort.endsWith("asc") ? 1 : -1;
  shown.sort((a, b) => (parseFloat(a.dataset[key === "price" && mode === "charter" ? "rate" : key]) - parseFloat(b.dataset[key === "price" && mode === "charter" ? "rate" : key])) * dir);
  shown.forEach((c) => grid.appendChild(c));
  if (empty) empty.style.display = visible === 0 ? "block" : "none";
  if (count) count.textContent = `Showing ${visible} of ${cards.length} yachts`;
}

/* Read URL params into the filter controls (e.g. hero search → charter page). */
function hydrateFiltersFromURL() {
  const p = new URLSearchParams(window.location.search);
  const set = (id, v) => { const el = document.getElementById(id); if (el && v) el.value = v; };
  set("f-dest", p.get("destination"));
  set("f-guests", p.get("guests"));
  set("f-search", p.get("q"));
}

/* ---------- Charter enquiry wizard ---------- */
function initWizard() {
  const form = document.getElementById("charter-wizard");
  if (!form) return;
  const panels = Array.from(form.querySelectorAll(".wizard-panel"));
  const tabs = Array.from(form.querySelectorAll(".wizard-step-tab"));
  let step = 0;
  const state = { destination: "", start: "", end: "", guests: "", type: "", budget: "" };

  function show(n) {
    step = n;
    panels.forEach((p, i) => p.classList.toggle("active", i === n));
    tabs.forEach((t, i) => {
      t.classList.toggle("active", i === n);
      t.classList.toggle("done", i < n);
    });
    window.scrollTo({ top: form.offsetTop - 90, behavior: "smooth" });
  }
  function markInvalid(input, msg) {
    const f = input.closest(".field");
    if (!f) return false;
    f.classList.add("invalid");
    const e = f.querySelector(".error");
    if (e && msg) e.textContent = msg;
    return false;
  }
  function clearInvalid(input) { input.closest(".field")?.classList.remove("invalid"); }

  form.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const group = pill.dataset.group;
      form.querySelectorAll(`.pill[data-group="${group}"]`).forEach((p) => p.setAttribute("aria-pressed", "false"));
      pill.setAttribute("aria-pressed", "true");
      state[group] = pill.dataset.value;
    });
  });

  function validateStep(n) {
    if (n === 0) {
      if (!state.destination) { document.getElementById("dest-error").style.display = "block"; return false; }
      document.getElementById("dest-error").style.display = "none";
      return true;
    }
    if (n === 1) {
      const s = document.getElementById("w-start"), e = document.getElementById("w-end");
      clearInvalid(s); clearInvalid(e);
      if (!s.value) return markInvalid(s, "Choose a start date.");
      if (!e.value) return markInvalid(e, "Choose an end date.");
      if (new Date(e.value) <= new Date(s.value)) return markInvalid(e, "The end date must be after the start date.");
      state.start = s.value; state.end = e.value;
      return true;
    }
    if (n === 2) {
      const g = document.getElementById("w-guests");
      clearInvalid(g);
      if (!g.value || parseInt(g.value, 10) < 1) return markInvalid(g, "Tell us how many guests will be aboard.");
      state.guests = g.value;
      state.type = document.getElementById("w-type").value;
      return true;
    }
    if (n === 3) {
      if (!state.budget) { document.getElementById("budget-error").style.display = "block"; return false; }
      document.getElementById("budget-error").style.display = "none";
      return true;
    }
    if (n === 4) {
      const name = document.getElementById("w-name"), email = document.getElementById("w-email");
      clearInvalid(name); clearInvalid(email);
      let ok = true;
      if (!name.value.trim()) { markInvalid(name, "Please add your name."); ok = false; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { markInvalid(email, "Enter a valid email address so we can reply."); ok = false; }
      const consent = document.getElementById("w-consent");
      if (!consent.checked) { document.getElementById("consent-error").style.display = "block"; ok = false; }
      else document.getElementById("consent-error").style.display = "none";
      return ok;
    }
    return true;
  }

  form.querySelectorAll("[data-next]").forEach((b) => b.addEventListener("click", () => {
    if (validateStep(step)) show(Math.min(step + 1, panels.length - 1));
  }));
  form.querySelectorAll("[data-back]").forEach((b) => b.addEventListener("click", () => show(Math.max(step - 1, 0))));

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!validateStep(4)) return;
    const ref = "SYM-CH-2026-" + String(Math.floor(1000 + Math.random() * 9000));
    document.getElementById("confirm-ref").textContent = "Reference " + ref;
    const sum = document.getElementById("confirm-summary");
    if (sum) {
      sum.textContent = `${state.destination} · ${state.guests} guests · ${state.type || "any yacht type"} · ${state.start || ""} to ${state.end || ""}`.replace(" ·  to ", "");
    }
    form.querySelector(".wizard-steps").style.display = "none";
    panels.forEach((p) => p.classList.remove("active"));
    document.getElementById("wizard-confirm").classList.add("active");
    window.scrollTo({ top: form.offsetTop - 90, behavior: "smooth" });
  });

  /* Pre-fill destination from URL (hero search or yacht page). */
  const p = new URLSearchParams(window.location.search);
  const dest = p.get("destination");
  if (dest) {
    const pill = form.querySelector(`.pill[data-group="destination"][data-value="${dest}"]`);
    if (pill) pill.click();
  }
  const yacht = p.get("yacht");
  if (yacht) {
    const y = DEMO_FLEET.find((v) => v.id === yacht);
    const note = document.getElementById("wizard-yacht-note");
    if (y && note) { note.style.display = "block"; note.querySelector("span strong").textContent = y.name + " — demo fleet yacht"; }
  }
}

/* ---------- Generic demo forms (buy / sell / new build / off-market / contact / detail) ---------- */
function initDemoForms() {
  document.querySelectorAll("form[data-demo-form]").forEach((form) => {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      let ok = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const f = input.closest(".field");
        if (!f) return;
        f.classList.remove("invalid");
        if (input.type === "checkbox" && !input.checked) { f.classList.add("invalid"); ok = false; }
        else if (input.type !== "checkbox" && !input.value.trim()) { f.classList.add("invalid"); ok = false; }
        else if (input.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) { f.classList.add("invalid"); ok = false; }
      });
      if (!ok) return;
      const success = form.parentElement.querySelector(".form-success") || document.getElementById(form.dataset.successTarget);
      form.style.display = "none";
      if (success) {
        success.style.display = "block";
        const ref = success.querySelector(".ref");
        if (ref && !ref.textContent.trim()) ref.textContent = "Reference SYM-2026-" + String(Math.floor(1000 + Math.random() * 9000));
      }
    });
  });
}

/* ---------- Gallery ---------- */
function initGallery() {
  const main = document.getElementById("gallery-main-img");
  if (!main) return;
  document.querySelectorAll(".gallery-thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      main.src = btn.dataset.full;
      main.alt = btn.querySelector("img").alt;
      document.querySelectorAll(".gallery-thumbs button").forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
    });
  });
}

/* ---------- Cookie banner (no analytics are loaded on this site) ---------- */
function initCookies() {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;
  if (!localStorage.getItem("sym-cookie-choice")) banner.classList.add("show");
  banner.querySelectorAll("[data-cookie]").forEach((b) => b.addEventListener("click", () => {
    localStorage.setItem("sym-cookie-choice", b.dataset.cookie);
    banner.classList.remove("show");
  }));
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initCookies();
  initGallery();
  initWizard();
  initDemoForms();
  /* Pre-fill the buy brief when a fleet card links here (?yacht=<id>). */
  const yp = new URLSearchParams(window.location.search).get("yacht");
  if (yp) {
    const y = DEMO_FLEET.find((v) => v.id === yp);
    const brief = document.getElementById("b-brief");
    if (y && brief && !brief.value) brief.value = `I am interested in ${y.name} (${y.length.toFixed(1)}m, ${y.builder} ${y.year}) — demo fleet yacht. Please tell me more.`;
  }
  const fleetEl = document.getElementById("fleet-grid");
  if (fleetEl) {
    hydrateFiltersFromURL();
    renderFleet(fleetEl.dataset.mode || "sale");
    ["f-search", "f-type", "f-length", "f-guests", "f-builder", "f-band", "f-dest", "f-sort"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", () => applyFilters(fleetEl.dataset.mode || "sale"));
      if (el) el.addEventListener("change", () => applyFilters(fleetEl.dataset.mode || "sale"));
    });
    const clear = document.getElementById("f-clear");
    if (clear) clear.addEventListener("click", () => {
      ["f-search", "f-type", "f-length", "f-guests", "f-builder", "f-band", "f-dest", "f-sort"].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = el.tagName === "SELECT" ? el.querySelector("option").value : "";
      });
      applyFilters(fleetEl.dataset.mode || "sale");
    });
  }
  /* Hero search → charter page with filters pre-filled. */
  const heroSearch = document.getElementById("hero-search");
  if (heroSearch) {
    heroSearch.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const dest = document.getElementById("hero-dest").value;
      const guests = document.getElementById("hero-guests").value;
      const params = new URLSearchParams();
      if (dest) params.set("destination", dest);
      if (guests) params.set("guests", guests);
      window.location.href = "yachts-for-charter.html" + (params.toString() ? "?" + params.toString() : "");
    });
  }
});
