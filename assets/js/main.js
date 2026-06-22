/* =================================================================
   Portfolio — Adriana Kikufi · main.js (vanilla)
   ================================================================= */

/* ---------- Données projets ----------
   Pour ajouter / modifier un projet, édite simplement ce tableau.
   cats : sert au filtre (all est ajouté automatiquement). */
const PROJECTS = [
  {
    title: "Howl's Moving Castle",
    cat: "Typographie",
    cats: ["typo"],
    desc: "De l'expérimentation à un spécimen imprimé : création complète d'une typographie originale, née de recherches plastiques puis mise en situation à travers un livret de spécimen éditorial.",
    thumb: "typo-poster-right",
    images: ["typo-poster-right", "typo-poster-left", "typo-howls-specimen"]
  },
  {
    title: "Manga Café — Rebranding",
    cat: "Branding",
    cats: ["branding"],
    desc: "Refonte complète de l'identité visuelle du Manga Café : nouvelle charte graphique (logotype, palette, typographie) pour un univers de marque fort et mémorable, déclinée en mockups de merchandising et de packaging.",
    thumb: "mangacafe-merch",
    images: ["mangacafe-merch", "mangacafe-logo", "mangacafe-cards", "mangacafe-letter", "mangacafe-palette"]
  },
  {
    title: "jooj Studio",
    cat: "Infographie · Branding",
    cats: ["branding", "infographie"],
    desc: "Conception de l'identité visuelle et des supports de communication d'une boutique pop-up locale : affiche, infographie produit et brochure dépliante.",
    thumb: "jooj-poster",
    images: ["jooj-poster", "jooj-infographic", "jooj-insitu", "jooj-brochure"]
  },
  {
    title: "Le Magicien d'Oz",
    cat: "Infographie · Édition",
    cats: ["infographie", "illustration"],
    desc: "Conception d'une double page interactive en relief destinée aux 6-8 ans. De l'illustration au prototype papier : graphisme et mécanisme d'ouverture pour faire jaillir l'histoire hors du livre.",
    thumb: "oz-illustration",
    images: ["oz-illustration", "oz-cover"]
  },
  {
    title: "StudyPal",
    cat: "UI / UX",
    cats: ["uiux"],
    desc: "Application et borne pour étudiants et campus. Charte graphique et maquettage sous Figma : une solution numérique innovante qui répond aux besoins réels de la vie étudiante en explorant les codes du jeu vidéo et de la gamification.",
    thumb: "studypal-screens",
    images: ["studypal-screens", "studypal-logo", "studypal-characters"]
  },
  {
    title: "Carnet du voyageur",
    cat: "Illustration",
    cats: ["illustration"],
    desc: "Création d'un carnet de curiosités sous forme de récit de voyage d'exploration extraterrestre. Illustration de créatures et design éditorial pour un univers de science-fiction immersif et détaillé.",
    thumb: "deer-illustration",
    images: ["deer-illustration", "alien-illustration"]
  },
  {
    title: "Naita Aka-Oni",
    cat: "Illustration",
    cats: ["illustration"],
    desc: "Couverture et illustration intérieure pour le conte japonais « L'Oni rouge qui pleurait ». Un projet axé sur le storytelling visuel, la composition et l'expression des émotions pour le jeune public.",
    thumb: "oni-poster",
    images: ["oni-poster", "oni-book", "oni-interior"]
  },
  {
    title: "Quizz de Génie",
    cat: "Entreprise · Game Art",
    cats: ["illustration"],
    desc: "Réalisation d'assets pour le jeu Quizz de Génie (culture générale) : création de backgrounds, d'emotes, de photos de profil et autres éléments graphiques.",
    thumb: "quizz-emotes",
    images: ["quizz-emotes", "quizz-phone"]
  },
  {
    title: "Chipstime",
    cat: "UI / UX · Entreprise",
    cats: ["uiux"],
    desc: "Refonte complète de l'application Chipstime : UI, UX et webdesign. Modernisation du site et de l'application, création de pages et de nouveaux outils tels que la recherche.",
    thumb: "chipstime-screens",
    images: ["chipstime-screens"]
  },
  {
    title: "The Cozy Tiger",
    cat: "Projet perso · Branding",
    cats: ["branding", "illustration"],
    desc: "Projet personnel d'illustration et de branding. « Come for the coffee, stay for the warmth » : identité complète d'un café cosy — logo, packaging, réseaux sociaux et mockups.",
    thumb: "cozytiger-mockups",
    images: ["cozytiger-mockups", "cozytiger-logo"]
  }
];

const IMG = (name) => `assets/img/${name}.jpg`;

/* =================================================================
   1. Génération de la grille de projets
   ================================================================= */
const grid = document.getElementById("projectGrid");

PROJECTS.forEach((p, i) => {
  const card = document.createElement("article");
  card.className = "card";
  card.dataset.cats = p.cats.join(" ");
  card.dataset.index = i;
  card.innerHTML = `
    <div class="card__media">
      <img src="${IMG(p.thumb)}" alt="${p.title}" loading="lazy" />
    </div>
    <span class="card__plus">+</span>
    ${p.images.length > 1 ? `<span class="card__count">${p.images.length} visuels</span>` : ""}
    <div class="card__body">
      <span class="card__cat">${p.cat}</span>
      <h3 class="card__title">${p.title}</h3>
      <p class="card__desc">${p.desc}</p>
    </div>`;
  card.addEventListener("click", () => openLightbox(i));
  grid.appendChild(card);
});

/* =================================================================
   2. Filtres
   ================================================================= */
const filters = document.getElementById("filters");
filters.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;
  filters.querySelector(".is-active")?.classList.remove("is-active");
  btn.classList.add("is-active");

  const f = btn.dataset.filter;
  document.querySelectorAll(".card").forEach((card) => {
    const show = f === "all" || card.dataset.cats.includes(f);
    card.classList.toggle("hide", !show);
    // ré-anime l'apparition
    if (show) {
      card.classList.remove("in");
      requestAnimationFrame(() => card.classList.add("in"));
    }
  });
});

/* =================================================================
   3. Reveal au scroll (IntersectionObserver)
   ================================================================= */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal, .card").forEach((el) => io.observe(el));

/* =================================================================
   4. Nav : état au scroll + menu mobile + scrollspy léger
   ================================================================= */
const nav = document.getElementById("nav");
const navLinks = document.getElementById("navLinks");
const burger = document.getElementById("navBurger");

const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  })
);

/* =================================================================
   5. Lightbox / galerie projet
   ================================================================= */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCat = document.getElementById("lbCat");
const lbTitle = document.getElementById("lbTitle");
const lbDesc = document.getElementById("lbDesc");
const lbThumbs = document.getElementById("lbThumbs");

let currentProject = 0;
let currentImg = 0;

function openLightbox(projectIndex) {
  currentProject = projectIndex;
  currentImg = 0;
  const p = PROJECTS[projectIndex];
  lbCat.textContent = p.cat;
  lbTitle.textContent = p.title;
  lbDesc.textContent = p.desc;

  // miniatures
  lbThumbs.innerHTML = "";
  p.images.forEach((name, idx) => {
    const t = document.createElement("img");
    t.src = IMG(name);
    t.alt = `${p.title} — visuel ${idx + 1}`;
    t.addEventListener("click", () => setImage(idx));
    lbThumbs.appendChild(t);
  });
  lbThumbs.style.display = p.images.length > 1 ? "flex" : "none";

  setImage(0);
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function setImage(idx) {
  const p = PROJECTS[currentProject];
  currentImg = (idx + p.images.length) % p.images.length;
  lbImg.src = IMG(p.images[currentImg]);
  lbImg.alt = `${p.title} — visuel ${currentImg + 1}`;
  [...lbThumbs.children].forEach((t, i) => t.classList.toggle("active", i === currentImg));
  // affiche/masque les flèches si une seule image
  const multi = p.images.length > 1;
  document.getElementById("lbPrev").style.display = multi ? "" : "none";
  document.getElementById("lbNext").style.display = multi ? "" : "none";
}

function closeLightbox() {
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.getElementById("lbClose").addEventListener("click", closeLightbox);
document.getElementById("lbPrev").addEventListener("click", () => setImage(currentImg - 1));
document.getElementById("lbNext").addEventListener("click", () => setImage(currentImg + 1));
lb.addEventListener("click", (e) => { if (e.target === lb || e.target.id === "lbPanel") closeLightbox(); });

document.addEventListener("keydown", (e) => {
  if (!lb.classList.contains("is-open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") setImage(currentImg - 1);
  if (e.key === "ArrowRight") setImage(currentImg + 1);
});

/* =================================================================
   6. Champ d'étoiles flottantes (déco)
   ================================================================= */
(function sparkles() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const field = document.querySelector(".sparkle-field");
  const glyphs = ["✦", "✧", "✶", "·"];
  const N = 16;
  for (let i = 0; i < N; i++) {
    const s = document.createElement("span");
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.fontSize = 0.6 + Math.random() * 1.4 + "rem";
    s.style.animationDuration = 10 + Math.random() * 12 + "s";
    s.style.animationDelay = -Math.random() * 14 + "s";
    field.appendChild(s);
  }
})();
