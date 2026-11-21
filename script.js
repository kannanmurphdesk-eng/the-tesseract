// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Newsletter demo
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Thanks! We'll send updates to ${email}. (This is a demo form.)`);
    e.target.reset();
}

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
    });
});

// One-time staggered fade/translate reveals
(function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const show = (el) => {
        el.classList.add('is-visible');
        el.addEventListener('animationend', () => el.classList.add('reveal-done'), { once: true });
    };

    if (!('IntersectionObserver' in window)) {
        els.forEach(show);
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            show(entry.target);
            io.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    els.forEach((el) => io.observe(el));
})();
