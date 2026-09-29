/* ─────────────────────────────────────────────────────────────
   app.js — the browser shell, the tab logic, the page rendering.
   You should never need to edit this file.

   To change your name or domain  → settings.js
   To add or edit a project       → projects/
   ───────────────────────────────────────────────────────────── */

window.site = {
  settings: { name: "Your Name", domain: "example.com", corner: [] },
  projects: [],

  configure(opts){ Object.assign(this.settings, opts); },

  add(p){
    const need = ["id","tile","initial","color","path","title","tagline","meta","body"];
    const missing = need.filter(k => p[k] === undefined || p[k] === "");
    if (missing.length){
      console.error(`site.add(): a project is missing ${missing.join(", ")}. It was skipped.`, p);
      return;
    }
    if (this.projects.some(x => x.id === p.id)){
      console.error(`site.add(): the id "${p.id}" is already used. Give this one a different id.`, p);
      return;
    }
    p.groups = p.groups || [];
    p.links  = p.links  || [];
    this.projects.push(p);
  }
};

(function(){
"use strict";

let S, P;
let tabs = [{id:"home"}], active = "home", past = [], future = [], query = "";
let strip, view, urlEl, backBtn, fwdBtn;

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const byId = id => P.find(p => p.id === id);

/* ---------- tab strip ---------- */
function drawTabs(){
  strip.innerHTML = tabs.map(t => {
    const on = t.id === active ? " on" : "";
    if (t.id === "home")
      return `<div class="tab home-tab${on}" data-id="home" title="${esc(S.name)}">
        <span class="fav"><svg viewBox="0 0 24 24" fill="#5f6368"><path d="M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z"/></svg></span></div>`;
    if (t.id === "results")
      return `<div class="tab${on}" data-id="results">
        <span class="fav"><svg viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2.4"><circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/></svg></span>
        <span class="label">${esc(query)} — search</span>
        <button class="x" data-close="results" aria-label="Close tab"><svg viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7"/></svg></button></div>`;
    const p = byId(t.id);
    return `<div class="tab${on}" data-id="${esc(p.id)}" title="${esc(p.title)}">
      <span class="fav" style="background:${esc(p.color)};color:#fff;font-size:9px;font-weight:700">${esc(p.initial)}</span>
      <span class="label">${esc(p.tile)}</span>
      <button class="x" data-close="${esc(p.id)}" aria-label="Close ${esc(p.tile)}"><svg viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7"/></svg></button></div>`;
  }).join("");
}

function open(id, push = true){
  if (id !== "home" && id !== "results" && !byId(id)){
    console.warn(`No project with id "${id}".`); return;
  }
  if (!tabs.some(t => t.id === id)) tabs.push({id});
  if (active !== id){
    if (push){ past.push(active); future = []; }
    active = id;
  }
  render();
}

function close(id){
  const el = strip.querySelector(`.tab[data-id="${id}"]`);
  const finish = () => {
    const i = tabs.findIndex(t => t.id === id);
    if (i < 0) return;
    tabs.splice(i, 1);
    past   = past.filter(x => x !== id);
    future = future.filter(x => x !== id);
    if (active === id){
      // Chrome activates the tab to the right, or the one to the left if there isn't one.
      active = (tabs[i] || tabs[i - 1] || tabs[0]).id;
    }
    render();
  };
  if (el && !matchMedia("(prefers-reduced-motion:reduce)").matches){
    el.classList.add("closing");
    el.addEventListener("transitionend", finish, {once:true});
    setTimeout(finish, 260);
  } else finish();
}

/* ---------- pages ---------- */
function homePage(){
  const corner = (S.corner || []).map(([label, dest]) =>
    dest.startsWith("#")
      ? `<a href="#" data-go="${esc(dest.slice(1))}">${esc(label)}</a>`
      : `<a href="${esc(dest)}">${esc(label)}</a>`).join("");

  const tiles = P.length
    ? P.map(p => `<button class="tile" data-go="${esc(p.id)}">
        <span class="disc" style="background:${esc(p.color)}">${esc(p.initial)}</span>
        <span>${esc(p.tile)}</span></button>`).join("")
    : `<p class="none" style="grid-column:1/-1;text-align:center">No projects loaded yet. Add a file to
       <code>projects/</code> and link it from index.html.</p>`;

  return `<div class="home fade">
    <div class="home-top">${corner}</div>
    <h1 class="mark">${[...S.name].map(c => c === " " ? " " : `<span>${esc(c)}</span>`).join("")}</h1>
    <div class="box">
      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.3-4.3"/></svg>
      <input id="q" autocomplete="off" spellcheck="false" aria-label="Search projects" value="${esc(query)}">
    </div>
    <div class="btns">
      <button id="go">Search projects</button>
      <button id="lucky">Surprise me</button>
    </div>
    <div class="tiles">${tiles}</div>
  </div>`;
}

function projectPage(p){
  return `<article class="doc fade">
    <div class="banner" style="background:${esc(p.color)}"></div>
    <h1>${esc(p.title)}</h1>
    <p class="meta">${p.meta.map(esc).join("<i>•</i>")}</p>
    <p class="lede">${esc(p.tagline)}</p>
    ${p.body.map(t => `<p>${esc(t)}</p>`).join("")}
    ${p.groups.map(([h, items]) => `<h2>${esc(h)}</h2>
      <ul class="facts">${items.map(f => `<li>${esc(f)}</li>`).join("")}</ul>`).join("")}
    ${p.links.length ? `<h2>Get in touch</h2>
      <div class="links">${p.links.map(([l,h]) => `<a href="${esc(h)}">${esc(l)}</a>`).join("")}</div>` : ""}
  </article>`;
}

function resultsPage(){
  const q = query.toLowerCase();
  const hits = P.filter(p =>
    (p.title + p.tagline + p.meta.join(" ") +
     p.groups.map(g => g[1].join(" ")).join(" ") +
     p.body.join(" ")).toLowerCase().includes(q));

  if (!hits.length) return `<div class="res fade">
    <p class="res-count">No results for “${esc(query)}”</p>
    <p class="none">Nothing here matches that. Try a tool or a language, or open something from the home page.</p></div>`;

  return `<div class="res fade">
    <p class="res-count">${hits.length} result${hits.length > 1 ? "s" : ""} for “${esc(query)}”</p>
    ${hits.map(p => `<div class="hit">
      <div class="crumb">${esc(S.domain)}${esc(p.path)}</div>
      <button data-go="${esc(p.id)}">${esc(p.title)}</button>
      <p>${esc(p.tagline)}</p></div>`).join("")}
  </div>`;
}

function render(){
  drawTabs();
  if (active === "home"){
    view.innerHTML = homePage();
    urlEl.innerHTML = `<b>${esc(S.domain)}</b>`;
    document.title = S.name;
  } else if (active === "results"){
    view.innerHTML = resultsPage();
    urlEl.innerHTML = `${esc(S.domain)}<b>/search?q=${esc(query)}</b>`;
    document.title = `${query} — ${S.name}`;
  } else {
    const p = byId(active);
    view.innerHTML = projectPage(p);
    urlEl.innerHTML = `${esc(S.domain)}<b>${esc(p.path)}</b>`;
    document.title = `${p.title} — ${S.name}`;
  }
  view.scrollTop = 0;
  backBtn.disabled = !past.length;
  fwdBtn.disabled  = !future.length;
  const q = document.getElementById("q");
  if (q && matchMedia("(min-width:700px)").matches) q.focus();
}

function search(){
  const q = document.getElementById("q");
  if (!q || !q.value.trim()) return;
  query = q.value.trim();
  if (!tabs.some(t => t.id === "results")) tabs.push({id:"results"});
  past.push(active); future = []; active = "results";
  render();
}

/* ---------- boot ---------- */
function boot(){
  S = window.site.settings;
  P = window.site.projects;
  strip   = document.getElementById("strip");
  view    = document.getElementById("view");
  urlEl   = document.getElementById("url");
  backBtn = document.getElementById("back");
  fwdBtn  = document.getElementById("fwd");

  strip.addEventListener("click", e => {
    const x = e.target.closest("[data-close]");
    if (x){ e.stopPropagation(); close(x.dataset.close); return; }
    const t = e.target.closest(".tab");
    if (t) open(t.dataset.id);
  });
  strip.addEventListener("auxclick", e => {            // middle-click closes, as it should
    const t = e.target.closest(".tab");
    if (e.button === 1 && t && t.dataset.id !== "home"){ e.preventDefault(); close(t.dataset.id); }
  });

  view.addEventListener("click", e => {
    const g = e.target.closest("[data-go]");
    if (g){ e.preventDefault(); open(g.dataset.go); return; }
    if (e.target.id === "go") search();
    if (e.target.id === "lucky" && P.length) open(P[Math.floor(Math.random() * P.length)].id);
  });
  view.addEventListener("keydown", e => {
    if (e.target.id === "q" && e.key === "Enter") search();
  });

  backBtn.onclick = () => { if (past.length){ future.push(active); active = past.pop(); render(); } };
  fwdBtn.onclick  = () => { if (future.length){ past.push(active); active = future.pop(); render(); } };
  document.getElementById("reload").onclick = () => render();

  addEventListener("keydown", e => {
    if (e.key === "Escape" && active !== "home") open("home");
    if ((e.metaKey || e.ctrlKey) && e.key === "w" && active !== "home"){ e.preventDefault(); close(active); }
  });

  render();
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();
})();
