const header = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = [...document.querySelectorAll('.nav-links a')];

const closeMenu = () => {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
};

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    navAnchors.forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });
}

const updateHeader = () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('visible'));
} else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px' });

    reveals.forEach((element) => revealObserver.observe(element));
}

const observedSections = [...document.querySelectorAll('main section[id]')];

if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navAnchors.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });

    observedSections.forEach((section) => sectionObserver.observe(section));
}
