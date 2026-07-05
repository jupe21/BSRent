/* ─── AOS INIT ─── */
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
AOS.init({
  duration: 700,
  once: true,
  easing: "ease-out-cubic",
  offset: 60,
  disable: reduceMotion,
});

/* ─── TYPED.JS ─── */
new Typed("#typed-output", {
  strings: ["Hitra dostava.", "Zanesljiv prevoz.", "Najem kombija"],
  typeSpeed: 60,
  backSpeed: 40,
  backDelay: 2000,
  startDelay: 1800,
  loop: true,
  smartBackspace: false,
});

/* ─── STICKY NAVBAR ─── */
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

/* ─── HAMBURGER MENU ─── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  hamburger.classList.remove("active");
  navLinks.classList.remove("open");
  document.body.style.overflow = "";
}

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
  if (navLinks.classList.contains("open")) {
    const h = navbar.offsetHeight;
    document.documentElement.style.setProperty("--navbar-h", h + "px");
    navLinks.style.top = h + "px";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// zapri meni s tipko Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navLinks.classList.contains("open")) closeMenu();
});

// zapri meni, če uporabnik poveča okno nad mobilno mejo
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && navLinks.classList.contains("open"))
    closeMenu();
});

/* ─── SMOOTH SCROLL for #kontakt btn ─── */
document.querySelectorAll('a[href="#kontakt"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("kontakt").scrollIntoView({ behavior: "smooth" });
  });
});

/* ─── DATUM: onemogoči pretekle datume ─── */
const datumInput = document.getElementById("datum");
if (datumInput) {
  datumInput.min = new Date().toISOString().split("T")[0];
}

/* ─── CONTACT FORM → WHATSAPP ─── */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const ime = document.getElementById("ime").value.trim();
  const telefon = document.getElementById("telefon").value.trim();
  const datum = document.getElementById("datum").value;
  const sporocilo = document.getElementById("sporocilo").value.trim();

  const datumFormatted = datum
    ? new Date(datum).toLocaleDateString("sl-SI", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "ni določen";

  const msg = [
    "🚐 *Novo povpraševanje – BSRENT*",
    "",
    `👤 *Ime in priimek:* ${ime}`,
    `📞 *Telefon:* ${telefon}`,
    `📅 *Datum prevzema:* ${datumFormatted}`,
    sporocilo ? `💬 *Sporočilo:* ${sporocilo}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/38668665230?text=${encoded}`, "_blank");
});

/* ─── ACTIVE NAV LINK on scroll ─── */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.style.color =
            a.getAttribute("href") === `#${entry.target.id}`
              ? "var(--orange)"
              : "";
        });
      }
    });
  },
  { threshold: 0.45 },
);

sections.forEach((s) => observer.observe(s));
