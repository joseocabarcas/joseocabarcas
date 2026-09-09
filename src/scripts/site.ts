/**
 * Minimal progressive enhancement (design §1, §7):
 * - mobile menu toggle behavior with aria state, Escape, close-on-link,
 *   focus handling, and a `data-menu-enhanced` gate so the no-JS fallback
 *   keeps all links visible;
 * - `data-scrolled` header attribute after 8px of scroll;
 * - one IntersectionObserver reveal (threshold 0.12, unobserve after reveal),
 *   with `.reveal-pending` applied only when reduced motion is NOT requested.
 *
 * No hydration framework, animation package, or data fetching.
 */

const root = document.documentElement;

/* ----- Mobile menu ----- */

const nav = document.querySelector<HTMLElement>('.site-nav');
const toggle = document.querySelector<HTMLButtonElement>('.menu-toggle');

if (nav && toggle) {
  // Mark the root before collapsing anything: without this script the
  // nav links are never hidden, so no-JS users never lose navigation.
  root.setAttribute('data-menu-enhanced', 'true');

  const navLinks = Array.from(
    nav.querySelectorAll<HTMLAnchorElement>('.nav-list a')
  );
  const firstLink = navLinks[0];

  const isOpen = () => nav.hasAttribute('data-open');

  const setOpen = (open: boolean) => {
    if (open) {
      nav.setAttribute('data-open', '');
    } else {
      nav.removeAttribute('data-open');
    }
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector<HTMLElement>('.menu-toggle-label')!.textContent = open
      ? 'Close'
      : 'Menu';
  };

  toggle.addEventListener('click', () => {
    if (isOpen()) {
      setOpen(false);
      toggle.focus();
    } else {
      setOpen(true);
      firstLink?.focus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Close after any in-page menu link is activated.
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  toggle.setAttribute('aria-expanded', 'false');
}

/* ----- Header scroll state ----- */

const header = document.querySelector<HTMLElement>('.site-header');

if (header) {
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.setAttribute('data-scrolled', '');
    } else {
      header.removeAttribute('data-scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ----- Reveal enhancement ----- */

const revealEls = Array.from(
  document.querySelectorAll<HTMLElement>('[data-reveal]')
);

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  revealEls.forEach((el) => el.classList.add('reveal-pending'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove('reveal-pending');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // IntersectionObserver unavailable: reveal everything immediately.
    revealEls.forEach((el) => el.classList.remove('reveal-pending'));
  }
}
