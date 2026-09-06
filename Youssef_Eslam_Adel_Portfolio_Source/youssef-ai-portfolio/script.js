const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];

function closeNavigation() {
  toggle?.setAttribute('aria-expanded', 'false');
  navLinks?.classList.remove('is-open');
  document.body.classList.remove('nav-open');
}

toggle?.addEventListener('click', () => {
  const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(willOpen));
  navLinks?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('nav-open', willOpen);
});

navAnchors.forEach((anchor) => anchor.addEventListener('click', closeNavigation));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNavigation();
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((anchor) => {
        const active = anchor.getAttribute('href') === `#${entry.target.id}`;
        if (active) anchor.setAttribute('aria-current', 'true');
        else anchor.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());
