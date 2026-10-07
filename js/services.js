/* ========================================
   SERVICES PAGE JAVASCRIPT - services.js
   Specific functionality for services.html
   ======================================== */

// ===== FAQ ACCORDION =====
function toggleFaq(element) {
    var faqItem = element.parentElement;
    var isActive = faqItem.classList.contains('active');

    // Close all FAQs
    var allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(function (item) {
        item.classList.remove('active');
    });

    // Open clicked one (if it wasn't already open)
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== Animate service cards on scroll =====
document.addEventListener('DOMContentLoaded', function () {
    var serviceCards = document.querySelectorAll('.service-detail-card');

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    serviceCards.forEach(function (card, index) {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});