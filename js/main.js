/* ============================================
   MJC - Mariam Juice Cafe | Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. NAVBAR: Scroll state ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── 2. HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  /* ── 3. SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  // Expose reveal function globally for dynamic content
  window.reveal = function() {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      if (!el.classList.contains('visible')) {
        revealObserver.observe(el);
      }
    });
  };

  // Initial reveal
  window.reveal();

  /* ── 4. MENU CATEGORY FILTER ── */
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.cat;
      cards.forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? 'block' : 'none';
        if (show) {
          // Small pop-in animation
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        }
      });
    });
  });

  /* ── 5. ADD TO ORDER: Micro-interaction ── */
  document.querySelectorAll('.menu-add-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const original = this.textContent;
      this.textContent = '✓';
      this.style.background = '#22c55e';
      this.style.color = '#fff';
      setTimeout(() => {
        this.textContent = original;
        this.style.background = '';
        this.style.color = '';
      }, 1500);
    });
  });

  /* ── 6. CONTACT FORM VALIDATION ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      // Clear previous errors
      form.querySelectorAll('.form-error-msg').forEach(msg => msg.classList.remove('show'));
      form.querySelectorAll('input, textarea').forEach(el => el.classList.remove('error'));

      // Name validation
      const name = form.querySelector('#f-name');
      if (!name.value.trim() || name.value.trim().length < 2) {
        showError(name, 'name-error', 'Please enter your full name.');
        valid = false;
      }

      // Email validation
      const email = form.querySelector('#f-email');
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) {
        showError(email, 'email-error', 'Please enter a valid email address.');
        valid = false;
      }

      // Phone validation (optional but if filled, must be valid)
      const phone = form.querySelector('#f-phone');
      if (phone.value.trim() && !/^[\d\s\+\-\(\)]{7,15}$/.test(phone.value.trim())) {
        showError(phone, 'phone-error', 'Please enter a valid phone number.');
        valid = false;
      }

      // Message validation
      const msg = form.querySelector('#f-message');
      if (!msg.value.trim() || msg.value.trim().length < 10) {
        showError(msg, 'msg-error', 'Message must be at least 10 characters.');
        valid = false;
      }

      if (valid) {
        // Success state
        const successMsg = document.getElementById('form-success');
        successMsg.classList.add('show');
        form.reset();
        setTimeout(() => successMsg.classList.remove('show'), 5000);
      }
    });

    function showError(field, errorId, message) {
      field.classList.add('error');
      const errEl = document.getElementById(errorId);
      if (errEl) { errEl.textContent = message; errEl.classList.add('show'); }
    }

    // Live validation: remove error on input
    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('error');
        const errId = el.dataset.err;
        if (errId) {
          const errEl = document.getElementById(errId);
          if (errEl) errEl.classList.remove('show');
        }
      });
    });
  }

  /* ── 7. SMOOTH ACTIVE NAV HIGHLIGHT on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = '#F5A623';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ── 8. GALLERY: subtle click feedback ── */
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
      this.style.transform = 'scale(0.97)';
      setTimeout(() => this.style.transform = '', 200);
    });
  });

  /* ── 9. Animated counter for hero stats ── */
  function animateCounter(el, target, suffix = '') {
    let start = 0;
    const duration = 1600;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-count]').forEach(el => {
          const target = parseInt(el.dataset.count);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObserver.observe(statsEl);

});
