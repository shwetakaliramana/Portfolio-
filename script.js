// Keep footer year current.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const navbarElement = document.getElementById("navbarNav");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

if (navbarElement) {
  const navbarCollapse = new bootstrap.Collapse(navbarElement, { toggle: false });

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const targetSection = targetId ? document.querySelector(targetId) : null;

      // Smooth section scroll with navbar offset for fixed header.
      if (targetSection) {
        event.preventDefault();
        const navbarHeight = document.querySelector(".portfolio-nav")?.offsetHeight || 0;
        const topOffset = targetSection.offsetTop - navbarHeight - 8;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }

      if (window.innerWidth < 992 && navbarElement.classList.contains("show")) {
        navbarCollapse.hide();
      }
    });
  });
}

// Reveal cards and blocks progressively as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 320)}ms`;
  revealObserver.observe(element);
});
