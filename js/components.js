/* ============================================
   MOMO IT Technologies — components.js
   Shared Navbar, Footer & Floating Elements
   ============================================ */

(function () {
  'use strict';

  function initSiteComponents() {
    const currentPage = document.body.dataset.page || 'home';

    // 1. Inject Navbar
    const headerSlot = document.getElementById('site-header');
    if (headerSlot) {
      headerSlot.innerHTML = `
        <nav class="navbar" id="navbar">
          <div class="nav-container">
            <a href="index.html" class="nav-logo" aria-label="MOMO IT Technologies Home">
              <div class="logo-icon">&lt;/&gt;</div>
              <div class="logo-text-wrap">
                <span class="logo-momo">MOMO IT</span>
                <span class="logo-tech">TECHNOLOGIES</span>
              </div>
            </a>
            <ul class="nav-links" id="navLinks">
              <li><a href="index.html" class="nav-link ${currentPage === 'home' ? 'active' : ''}">Home</a></li>
              <li><a href="about.html" class="nav-link ${currentPage === 'about' ? 'active' : ''}">About</a></li>
              <li><a href="courses.html" class="nav-link ${currentPage === 'courses' ? 'active' : ''}">Courses</a></li>
              <li><a href="reviews.html" class="nav-link ${currentPage === 'reviews' ? 'active' : ''}">Reviews</a></li>
              <li><a href="teach-with-us.html" class="nav-link teach-link ${currentPage === 'teach' ? 'active' : ''}">
                <i class="ph-fill ph-chalkboard-teacher"></i> Teach with Us
              </a></li>
              <li><a href="contact.html" class="nav-link ${currentPage === 'contact' ? 'active' : ''}">Contact</a></li>
              <li class="nav-cta-item">
                <a href="contact.html#enroll" class="btn btn-primary btn-nav" id="navEnrollBtn">
                  <i class="ph-fill ph-rocket-launch"></i> Enroll Now
                </a>
              </li>
            </ul>
            <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      `;
    }

    // 2. Inject Footer
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
      footerSlot.innerHTML = `
        <footer class="footer">
          <div class="footer-wrap">
            <div class="footer-brand">
              <a href="index.html" class="footer-logo">
                <div class="logo-icon">&lt;/&gt;</div>
                <div>
                  <span class="footer-logo-text">MOMO IT</span>
                  <span class="footer-logo-sub">TECHNOLOGIES</span>
                </div>
              </a>
              <p class="footer-tagline">
                Premier Selenium Automation with Java training institute in Kadapa, Andhra Pradesh.
                Delivering high-impact online live classes pan-India and personalized offline coaching.
                Empowering students &amp; professionals to crack MNC QA roles.
              </p>
              <div class="footer-socials">
                <a href="tel:+918639831132" aria-label="Call Mohan sir" class="social-link" title="Call +91 86398 31132"><i class="ph-fill ph-phone"></i></a>
                <a href="https://wa.me/918639831132?text=Hi%20Mohan%20sir%2C%20I%20have%20an%20enquiry%20regarding%20training%20at%20MOMO%20IT%20Technologies." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-link" title="WhatsApp"><i class="ph-fill ph-whatsapp-logo"></i></a>
                <a href="mailto:mohandamerla2020@gmail.com" aria-label="Email MOMO IT" class="social-link" title="Email"><i class="ph-fill ph-envelope"></i></a>
                <a href="https://www.urbanpro.com/kadapa/momo-it-technologies" target="_blank" rel="noopener noreferrer" aria-label="UrbanPro Profile" class="social-link" title="UrbanPro Verified Profile"><i class="ph-fill ph-seal-check"></i></a>
              </div>
            </div>

            <div class="footer-links-col">
              <h5>Quick Navigation</h5>
              <ul>
                <li><a href="index.html"><i class="ph ph-caret-right"></i> Home</a></li>
                <li><a href="about.html"><i class="ph ph-caret-right"></i> About Trainer &amp; Institute</a></li>
                <li><a href="courses.html"><i class="ph ph-caret-right"></i> Selenium Course &amp; Curriculum</a></li>
                <li><a href="reviews.html"><i class="ph ph-caret-right"></i> Student Reviews (5.0 ⭐)</a></li>
                <li><a href="teach-with-us.html" style="color: #fbbf24;"><i class="ph ph-caret-right"></i> Teach with Us (50% Share)</a></li>
                <li><a href="contact.html"><i class="ph ph-caret-right"></i> Contact &amp; Kadapa Center</a></li>
              </ul>
            </div>

            <div class="footer-contact-col">
              <h5>Direct Contact</h5>
              <p><i class="ph-fill ph-user-circle"></i> <strong>Mohan Damerla</strong> &nbsp;(Founder &amp; Trainer)</p>
              <p><i class="ph-fill ph-phone-call"></i> <a href="tel:+918639831132">+91 86398 31132</a></p>
              <p><i class="ph-fill ph-envelope-simple"></i> <a href="mailto:mohandamerla2020@gmail.com">mohandamerla2020@gmail.com</a></p>
              <p><i class="ph-fill ph-map-pin"></i> Kadapa, Andhra Pradesh, India</p>
              <p><i class="ph-fill ph-globe-hemisphere-east"></i> Pan-India Online Live Batches</p>
              <a href="contact.html#enroll" class="btn btn-primary btn-sm footer-enroll-btn">
                <i class="ph-fill ph-rocket-launch"></i> Book Free Demo Class
              </a>
            </div>
          </div>

          <div class="footer-bottom">
            <p>© 2024 MOMO IT Technologies. All rights reserved.</p>
            <p>Made with <span class="heart">❤️</span> in Kadapa · Transforming Careers Across India</p>
          </div>
        </footer>
      `;
    }

    // 3. Inject Floating WhatsApp Button if not already on page
    if (!document.getElementById('whatsappFloat')) {
      const waFloat = document.createElement('a');
      waFloat.id = 'whatsappFloat';
      waFloat.className = 'whatsapp-float';
      waFloat.target = '_blank';
      waFloat.rel = 'noopener noreferrer';
      waFloat.setAttribute('aria-label', 'Chat with Mohan sir on WhatsApp');
      waFloat.href = 'https://wa.me/918639831132?text=Hi%20Mohan%20sir%2C%20I%27m%20interested%20in%20Selenium%20Automation%20training.%20Please%20share%20course%20details.';
      waFloat.innerHTML = `
        <i class="ph-fill ph-whatsapp-logo"></i>
        <span class="whatsapp-label">Chat on WhatsApp</span>
      `;
      document.body.appendChild(waFloat);
    }

    // 4. Setup Navbar Events (Scroll & Mobile Toggle)
    setupNavbarEvents();
  }

  function setupNavbarEvents() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (!navbar) return;

    // Scroll styling
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobile Toggle
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('nav-menu-open', isOpen);
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-menu-open');
        }
      });

      // Close on link click
      navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('nav-menu-open');
        });
      });
    }
  }

  // Initialize once DOM is ready or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteComponents);
  } else {
    initSiteComponents();
  }
})();
