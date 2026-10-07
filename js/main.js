/* ========================================
   GLOBAL JAVASCRIPT - main.js
   Common functionality for all pages
   ======================================== */

// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initScrollEffects();
    initAnimations();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Hamburger Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    const whatsappFloat = document.getElementById('whatsappFloat');

    window.addEventListener('scroll', function () {
        // Back to top button
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SCROLL ANIMATIONS =====
function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(function (el) {
        observer.observe(el);
    });

    // Also animate cards, stat cards, service cards etc.
    animateCardsOnScroll();
}

function animateCardsOnScroll() {
    const cards = document.querySelectorAll(
        '.stat-card, .service-card, .service-detail-card, .contact-card, .mission-card, .gallery-item, .faq-item, .testimonial-card'
    );

    if (cards.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(function (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ===== UTILITY: Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});