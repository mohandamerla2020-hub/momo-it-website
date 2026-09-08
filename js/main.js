/* ============================================
   MOMO IT Technologies — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar: Scroll effect + mobile toggle ----
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const navLinkEls = navLinks.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    highlightNavLink();
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ---- Active nav link on scroll ----
  function highlightNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinkEls.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  // ---- Scroll-triggered animations ----
  const animatedEls = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => el.classList.add('in-view'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  animatedEls.forEach(el => observer.observe(el));

  // ---- Counter animation (Stats section) ----
  const counters = document.querySelectorAll('.stat-num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const duration = 1800;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ---- Accordion ----
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      accordionItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Enrollment Form ----
  const form       = document.getElementById('enrollForm');
  const submitBtn  = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      // Loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="ph ph-circle-notch" style="animation:spin 1s linear infinite"></i> <span>Sending...</span>';

      // Build WhatsApp message from form data
      const name  = form.fullName.value.trim();
      const phone = form.phoneNum.value.trim();
      const email = form.emailAddr.value.trim();
      const mode  = form.classMode.value;
      const type  = form.enquiryType.value;
      const msg   = form.msgArea.value.trim();

      const typeMap = { enroll: 'Enroll in Course', demo: 'Book Free Demo', info: 'Get Information' };
      const modeMap = { online: 'Online', offline: 'Offline (Kadapa)', any: 'Either works' };

      const waMsg = encodeURIComponent(
        `Hi Mohan sir,\n\nNew enquiry from your website:\n\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        (email ? `📧 Email: ${email}\n` : '') +
        `💻 Mode: ${modeMap[mode] || mode}\n` +
        `📋 Purpose: ${typeMap[type] || type}\n` +
        (msg ? `💬 Message: ${msg}` : '')
      );

      // Simulate brief processing
      await new Promise(r => setTimeout(r, 800));

      // Show success
      submitBtn.innerHTML = '<i class="ph-fill ph-check-circle"></i> <span>Enquiry Sent!</span>';
      submitBtn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
      formSuccess.classList.add('show');

      // Open WhatsApp with pre-filled message
      setTimeout(() => {
        window.open(`https://wa.me/918639831132?text=${waMsg}`, '_blank');
      }, 600);

      // Reset after delay
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="ph-fill ph-paper-plane-tilt"></i> <span>Submit Enquiry</span>';
        submitBtn.style.background = '';
        formSuccess.classList.remove('show');
      }, 5000);
    });
  }

  function validateForm() {
    let valid = true;
    const nameInput  = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNum');
    const modeInput  = document.getElementById('classMode');
    const typeInput  = document.getElementById('enquiryType');

    const nameErr  = document.getElementById('nameError');
    const phoneErr = document.getElementById('phoneError');
    const modeErr  = document.getElementById('modeError');
    const typeErr  = document.getElementById('typeError');

    // Clear previous
    [nameInput, phoneInput, modeInput, typeInput].forEach(i => i.classList.remove('error'));
    [nameErr, phoneErr, modeErr, typeErr].forEach(e => e.textContent = '');

    if (!nameInput.value.trim()) {
      nameErr.textContent = 'Please enter your name.';
      nameInput.classList.add('error');
      valid = false;
    }
    const phoneVal = phoneInput.value.trim().replace(/\s/g, '');
    if (!phoneVal || !/^[+]?[\d]{10,13}$/.test(phoneVal)) {
      phoneErr.textContent = 'Please enter a valid phone number.';
      phoneInput.classList.add('error');
      valid = false;
    }
    if (!modeInput.value) {
      modeErr.textContent = 'Please select a class mode.';
      modeInput.classList.add('error');
      valid = false;
    }
    if (!typeInput.value) {
      typeErr.textContent = 'Please select an enquiry type.';
      typeInput.classList.add('error');
      valid = false;
    }

    if (!valid) {
      const firstError = form.querySelector('.error');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
  }

  // ---- Smooth hover effect for contact cards ----
  document.querySelectorAll('.contact-card:not(.no-hover)').forEach(card => {
    card.style.cursor = 'pointer';
  });

  // ---- CSS spin keyframe for loader ----
  const styleTag = document.createElement('style');
  styleTag.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(styleTag);

  // ---- Animate hero content on load ----
  setTimeout(() => {
    document.querySelectorAll('.hero [data-animate]').forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), i * 150);
    });
  }, 100);

  // ---- Teach with MOMO IT Form ----
  const teachForm    = document.getElementById('teachForm');
  const teachSubmit  = document.getElementById('teachSubmitBtn');
  const teachSuccess = document.getElementById('teachFormSuccess');

  if (teachForm) {
    teachForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let valid = true;
      const checks = [
        { id: 'tName',   errId: 'tNameErr',   msg: 'Please enter your name.' },
        { id: 'tPhone',  errId: 'tPhoneErr',  msg: 'Please enter a valid phone number.' },
        { id: 'tEmail',  errId: 'tEmailErr',  msg: 'Please enter your email.' },
        { id: 'tCourse', errId: 'tCourseErr', msg: 'Please enter the course/subject you want to teach.' },
        { id: 'tExp',    errId: 'tExpErr',    msg: 'Please select your experience level.' },
      ];
      checks.forEach(c => {
        const el = document.getElementById(c.id);
        const err = document.getElementById(c.errId);
        el.classList.remove('error'); err.textContent = '';
        if (!el.value.trim()) { err.textContent = c.msg; el.classList.add('error'); valid = false; }
      });
      if (!valid) { teachForm.querySelector('.error')?.scrollIntoView({ behavior:'smooth', block:'center' }); return; }

      teachSubmit.disabled = true;
      teachSubmit.innerHTML = '<i class="ph ph-circle-notch" style="animation:spin 1s linear infinite"></i> <span>Sending...</span>';

      const name   = document.getElementById('tName').value.trim();
      const phone  = document.getElementById('tPhone').value.trim();
      const email  = document.getElementById('tEmail').value.trim();
      const course = document.getElementById('tCourse').value.trim();
      const exp    = document.getElementById('tExp').value;
      const mode   = document.getElementById('tMode').value;
      const tmsg   = document.getElementById('tMsg').value.trim();

      const waMsg = encodeURIComponent(
        `🎓 *New Tutor Application — MOMO IT Technologies*\n\n` +
        `👤 Name: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email}\n` +
        `📚 Course to Teach: ${course}\n⏳ Experience: ${exp} years\n` +
        `💻 Mode: ${mode === 'both' ? 'Online + Offline' : 'Online Only'}\n` +
        (tmsg ? `💬 About: ${tmsg}` : '')
      );

      await new Promise(r => setTimeout(r, 800));
      teachSubmit.innerHTML = '<i class="ph-fill ph-check-circle"></i> <span>Application Sent!</span>';
      teachSubmit.style.background = 'linear-gradient(135deg,#f59e0b,#fbbf24)';
      teachSuccess.classList.add('show');
      setTimeout(() => window.open(`https://wa.me/918639831132?text=${waMsg}`, '_blank'), 600);
      setTimeout(() => {
        teachForm.reset();
        teachSubmit.disabled = false;
        teachSubmit.innerHTML = '<i class="ph-fill ph-paper-plane-tilt"></i> <span>Apply to Teach</span>';
        teachSubmit.style.background = '';
        teachSuccess.classList.remove('show');
      }, 5000);
    });
  }

});
