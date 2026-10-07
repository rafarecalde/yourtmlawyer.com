document.addEventListener('DOMContentLoaded', function() {
    // Check for thank you parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('thankyou')) {
        alert('Thank you for your message! We will get back to you within 24 hours.');
    }

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.getElementById('main-nav');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav) nav.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Calendly popup for all schedule buttons
    const calendlyPopup = document.getElementById('calendly-popup');
    const closeCalendly = document.getElementById('close-calendly');

    document.querySelectorAll('.schedule-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            if (calendlyPopup) {
                calendlyPopup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeCalendly && calendlyPopup) {
        closeCalendly.addEventListener('click', function() {
            calendlyPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        calendlyPopup.addEventListener('click', function(e) {
            if (e.target === calendlyPopup) {
                calendlyPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Honeypot: silently discard bot submissions; otherwise allow native FormSubmit POST
    document.querySelectorAll('form[action*="formsubmit.co"]').forEach(form => {
        form.addEventListener('submit', function(e) {
            const honeypot = form.querySelector('input[name="website"], input[name="company_url"]');
            if (honeypot && honeypot.value.trim() !== '') {
                e.preventDefault();
                return false;
            }
            // Let FormSubmit handle the native POST (no preventDefault)
        });
    });

    // Scroll reveal for cards
    const revealElements = document.querySelectorAll('.about-card, .service-card, .attorney-card, .testimonial-card, .pricing-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
});
