// CURSOR
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
let isTouch = window.matchMedia('(pointer: coarse)').matches;

if (!isTouch) {
    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    const anim = () => {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(anim);
    };
    anim();

    document.querySelectorAll('a, .stack-item, .btn, .project-card, .exp-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            ring.style.width = '48px';
            ring.style.height = '48px';
            ring.style.borderColor = 'var(--accent-glow)';
            ring.style.opacity = '0.9';
        });
        el.addEventListener('mouseleave', () => {
            ring.style.width = '36px';
            ring.style.height = '36px';
            ring.style.borderColor = 'var(--accent)';
            ring.style.opacity = '0.25';
        });
    });
}

// HAMBURGER MENU
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}


// NAVBAR SCROLL
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
        }
    });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));
