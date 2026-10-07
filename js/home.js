/* ========================================
   HOME PAGE JAVASCRIPT - home.js
   Specific functionality for index.html
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initCounters();
    initTestimonialSlider();
});

// ===== PARTICLES =====
function initParticles() {
    var container = document.getElementById('particles');
    if (!container) return;

    for (var i = 0; i < 30; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 8 + 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(particle);
    }
}

// ===== COUNTERS =====
function initCounters() {
    var counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    var started = false;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !started) {
                started = true;
                startCounting();
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats section
    var statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    function startCounting() {
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var duration = 2000;
            var start = 0;
            var startTime = null;

            function animate(currentTime) {
                if (!startTime) startTime = currentTime;
                var elapsed = currentTime - startTime;
                var progress = Math.min(elapsed / duration, 1);

                // Easing function
                progress = 1 - Math.pow(1 - progress, 3);

                var current = Math.floor(progress * target);
                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    counter.textContent = target;
                }
            }

            requestAnimationFrame(animate);
        });
    }
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    var track = document.getElementById('testimonialTrack');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var dotsContainer = document.getElementById('sliderDots');

    if (!track || !prevBtn || !nextBtn || !dotsContainer) return;

    var cards = track.querySelectorAll('.testimonial-card');
    var totalCards = cards.length;
    var currentIndex = 0;
    var cardsPerView = getCardsPerView();
    var totalSlides = Math.ceil(totalCards / cardsPerView);
    var autoPlayInterval;

    // Create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (var i = 0; i < totalSlides; i++) {
            var dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function () {
                goToSlide(parseInt(this.getAttribute('data-index')));
            });
            dotsContainer.appendChild(dot);
        }
    }

    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        var cardWidth = cards[0].offsetWidth + 20; // card width + margin
        var offset = currentIndex * cardsPerView * cardWidth;
        track.style.transform = 'translateX(-' + offset + 'px)';

        // Update dots
        var dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Event Listeners
    prevBtn.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
    });

    // Auto Play
    function startAutoPlay() {
        autoPlayInterval = setInterval(function () {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Handle resize
    window.addEventListener('resize', function () {
        cardsPerView = getCardsPerView();
        totalSlides = Math.ceil(totalCards / cardsPerView);
        createDots();
        goToSlide(0);
    });

    // Touch/Swipe support
    var startX = 0;
    var isDragging = false;

    track.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
        if (!isDragging) return;
        var endX = e.changedTouches[0].clientX;
        var diff = startX - endX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
            resetAutoPlay();
        }
        isDragging = false;
    }, { passive: true });

    // Initialize
    createDots();
    startAutoPlay();
}