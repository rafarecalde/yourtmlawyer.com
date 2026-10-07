document.addEventListener('DOMContentLoaded', function() {
    // Check for thank you parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('thankyou')) {
    alert('Thank you for your message! We will get back to you within 24 hours.');
}   
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.getElementById('main-nav');
    
    if(mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
// Calendly popup for all schedule buttons
const calendlyPopup = document.getElementById('calendly-popup');
const closeCalendly = document.getElementById('close-calendly');

// Open popup for any .schedule-button
document.querySelectorAll('.schedule-button').forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    calendlyPopup.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

// Close popup
if (closeCalendly && calendlyPopup) {
  closeCalendly.addEventListener('click', function() {
    calendlyPopup.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close when clicking outside the content
  calendlyPopup.addEventListener('click', function(e) {
    if (e.target === calendlyPopup) {
      calendlyPopup.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

    
  // Form submission
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Show loading indicator or disable submit button
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Send to your Firebase function
        fetch('https://us-central1-trademarkflow-8e938.cloudfunctions.net/sendContactForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            
            if (response.ok) {
                // Show success message
                alert('Thank you for your message! We will get back to you within 24 hours.');
                contactForm.reset();
            } else {
                // Show error message
                alert('Oops! There was a problem submitting your form. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
            alert('Oops! There was a problem submitting your form. Please try again.');
        });
    });
}
    
    // Add a simple scroll reveal effect for elements
    const revealElements = document.querySelectorAll('.about-card, .service-card, .attorney-card, .testimonial-card, .pricing-card');
    
    // Create a simple scroll observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    // Set initial styles and observe elements
    revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(el);
    });
});