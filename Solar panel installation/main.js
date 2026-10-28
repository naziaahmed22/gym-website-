/* ==========================================================================
   Nevada City Solar Panel Installation - Interactive Logic (main.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  const checkScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check

  // --- Mobile Menu Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Scroll-Triggered Fade-In Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll('.fade-in-up');
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing after anim triggers
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // --- FAQ Accordion (Services Page) ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQs first
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        // Set dynamic height for transition
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // --- Projects Grid Filter (Projects Page) ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Button Class
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          // Add card animation transition
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';

          setTimeout(() => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
              card.classList.remove('hidden');
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, 50);
            } else {
              card.classList.add('hidden');
            }
          }, 300);
        });
      });
    });
  }

  // --- Contact Form Handling (Contact Page) ---
  const contactForm = document.getElementById('solarContactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Check simple validity
      if (contactForm.checkValidity()) {
        // Display nice submission effect (simulation)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Quote Request...';

        setTimeout(() => {
          // Hide Form, Show Success Message with animation
          contactForm.style.transition = 'opacity 0.4s ease';
          contactForm.style.opacity = '0';
          
          setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            formSuccess.style.opacity = '0';
            formSuccess.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              formSuccess.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
              formSuccess.style.opacity = '1';
              formSuccess.style.transform = 'translateY(0)';
            }, 50);
          }, 400);

        }, 1500); // 1.5 seconds mock server latency
      }
    });
  }

  // --- Newsletter Form Submission (Footer) ---
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput.value.trim() !== '') {
        const btn = newsletterForm.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = 'Subscribed!';
        emailInput.value = '';
        emailInput.disabled = true;
      }
    });
  }
});
