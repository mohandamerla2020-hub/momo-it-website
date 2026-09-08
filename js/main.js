/* ============================================
   MOMO IT Technologies — main.js
   Page Interactions, Animations & Forms
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Scroll-triggered Animations ----
  const animatedEls = document.querySelectorAll('[data-animate]');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || 0, 10);
        setTimeout(() => el.classList.add('in-view'), delay);
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: immediately display
    animatedEls.forEach(el => el.classList.add('in-view'));
  }

  // ---- Hero elements initial reveal ----
  setTimeout(() => {
    document.querySelectorAll('.hero [data-animate], .page-header [data-animate]').forEach((el, i) => {
      setTimeout(() => el.classList.add('in-view'), i * 120);
    });
  }, 80);

  // ---- Counter Animation (Stats) ----
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 1800;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
          el.textContent = Math.floor(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = target;
          }
        };

        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));
  }

  // ---- Accordion (Curriculum & FAQs) ----
  const accordionLists = document.querySelectorAll('.accordion-list');
  accordionLists.forEach(list => {
    const items = list.querySelectorAll('.accordion-item');
    items.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close siblings if in same accordion list
        items.forEach(i => {
          i.classList.remove('active');
          const btn = i.querySelector('.accordion-trigger');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  // ---- Enrollment Form (Home & Contact pages) ----
  const enrollForm = document.getElementById('enrollForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (enrollForm && submitBtn) {
    enrollForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateEnrollForm()) return;

      // Loading state
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="ph ph-circle-notch" style="animation:spin 1s linear infinite; display:inline-block"></i> <span>Sending...</span>';

      const name = (enrollForm.fullName ? enrollForm.fullName.value : '').trim();
      const phone = (enrollForm.phoneNum ? enrollForm.phoneNum.value : '').trim();
      const email = (enrollForm.emailAddr ? enrollForm.emailAddr.value : '').trim();
      const mode = (enrollForm.classMode ? enrollForm.classMode.value : '');
      const type = (enrollForm.enquiryType ? enrollForm.enquiryType.value : '');
      const msg = (enrollForm.msgArea ? enrollForm.msgArea.value : '').trim();

      const typeMap = {
        enroll: 'Enroll in Course',
        demo: 'Book Free Demo Class',
        info: 'Course Details & Fee Enquiry'
      };
      const modeMap = {
        online: 'Online Live Classes',
        offline: 'Offline (Kadapa)',
        any: 'Either works'
      };

      const waMsg = encodeURIComponent(
        `Hi Mohan sir,\n\nI am contacting you from MOMO IT Technologies website:\n\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        (email ? `📧 Email: ${email}\n` : '') +
        `💻 Preferred Mode: ${modeMap[mode] || mode}\n` +
        `📋 Purpose: ${typeMap[type] || type}\n` +
        (msg ? `💬 Message: ${msg}\n` : '') +
        `\nPlease share the course curriculum, schedule & fee details.`
      );

      await new Promise(r => setTimeout(r, 600));

      submitBtn.innerHTML = '<i class="ph-fill ph-check-circle"></i> <span>Enquiry Sent!</span>';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
      if (formSuccess) formSuccess.classList.add('show');

      setTimeout(() => {
        window.open(`https://wa.me/918639831132?text=${waMsg}`, '_blank');
      }, 500);

      setTimeout(() => {
        enrollForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        if (formSuccess) formSuccess.classList.remove('show');
      }, 5000);
    });
  }

  function validateEnrollForm() {
    let valid = true;
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNum');
    const modeInput = document.getElementById('classMode');
    const typeInput = document.getElementById('enquiryType');

    const nameErr = document.getElementById('nameError');
    const phoneErr = document.getElementById('phoneError');
    const modeErr = document.getElementById('modeError');
    const typeErr = document.getElementById('typeError');

    // Reset errors
    [nameInput, phoneInput, modeInput, typeInput].forEach(inp => inp && inp.classList.remove('error'));
    [nameErr, phoneErr, modeErr, typeErr].forEach(err => err && (err.textContent = ''));

    if (nameInput && !nameInput.value.trim()) {
      if (nameErr) nameErr.textContent = 'Please enter your name.';
      nameInput.classList.add('error');
      valid = false;
    }

    if (phoneInput) {
      const pVal = phoneInput.value.trim().replace(/[\s-]/g, '');
      if (!pVal || !/^[+]?[\d]{10,14}$/.test(pVal)) {
        if (phoneErr) phoneErr.textContent = 'Please enter a valid 10-digit phone number.';
        phoneInput.classList.add('error');
        valid = false;
      }
    }

    if (modeInput && !modeInput.value) {
      if (modeErr) modeErr.textContent = 'Please select a learning mode.';
      modeInput.classList.add('error');
      valid = false;
    }

    if (typeInput && !typeInput.value) {
      if (typeErr) typeErr.textContent = 'Please select what you want to do.';
      typeInput.classList.add('error');
      valid = false;
    }

    if (!valid && enrollForm) {
      const firstError = enrollForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstError.focus();
      }
    }
    return valid;
  }

  // ---- Teach with MOMO IT Form ----
  const teachForm = document.getElementById('teachForm');
  const teachSubmit = document.getElementById('teachSubmitBtn');
  const teachSuccess = document.getElementById('teachFormSuccess');

  if (teachForm && teachSubmit) {
    teachForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      let valid = true;
      const fields = [
        { id: 'tName', errId: 'tNameErr', msg: 'Please enter your full name.' },
        { id: 'tPhone', errId: 'tPhoneErr', msg: 'Please enter a valid phone number.' },
        { id: 'tEmail', errId: 'tEmailErr', msg: 'Please enter your email address.' },
        { id: 'tCourse', errId: 'tCourseErr', msg: 'Please enter the course/technology you want to teach.' },
        { id: 'tExp', errId: 'tExpErr', msg: 'Please select your teaching/industry experience.' }
      ];

      fields.forEach(f => {
        const input = document.getElementById(f.id);
        const err = document.getElementById(f.errId);
        if (input) input.classList.remove('error');
        if (err) err.textContent = '';

        if (input && !input.value.trim()) {
          if (err) err.textContent = f.msg;
          input.classList.add('error');
          valid = false;
        }
      });

      if (!valid) {
        const firstErr = teachForm.querySelector('.error');
        if (firstErr) {
          firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstErr.focus();
        }
        return;
      }

      teachSubmit.disabled = true;
      const originalText = teachSubmit.innerHTML;
      teachSubmit.innerHTML = '<i class="ph ph-circle-notch" style="animation:spin 1s linear infinite; display:inline-block"></i> <span>Submitting...</span>';

      const tName = document.getElementById('tName').value.trim();
      const tPhone = document.getElementById('tPhone').value.trim();
      const tEmail = document.getElementById('tEmail').value.trim();
      const tCourse = document.getElementById('tCourse').value.trim();
      const tExp = document.getElementById('tExp').value;
      const tMode = document.getElementById('tMode') ? document.getElementById('tMode').value : 'Online Only';
      const tMsg = document.getElementById('tMsg') ? document.getElementById('tMsg').value.trim() : '';

      const waMsg = encodeURIComponent(
        `🎓 *New Tutor Partnership Application — MOMO IT Technologies*\n\n` +
        `👤 Trainer Name: ${tName}\n` +
        `📞 Phone: ${tPhone}\n` +
        `📧 Email: ${tEmail}\n` +
        `📚 Subject/Course to Teach: ${tCourse}\n` +
        `⏳ Experience: ${tExp} years\n` +
        `💻 Teaching Mode: ${tMode}\n` +
        (tMsg ? `📝 Profile/Bio: ${tMsg}\n` : '') +
        `\nI would like to partner with MOMO IT Technologies on the 50% revenue share model.`
      );

      await new Promise(r => setTimeout(r, 600));

      teachSubmit.innerHTML = '<i class="ph-fill ph-check-circle"></i> <span>Application Sent!</span>';
      teachSubmit.style.background = 'linear-gradient(135deg, #f59e0b, #fbbf24)';
      if (teachSuccess) teachSuccess.classList.add('show');

      setTimeout(() => {
        window.open(`https://wa.me/918639831132?text=${waMsg}`, '_blank');
      }, 500);

      setTimeout(() => {
        teachForm.reset();
        teachSubmit.disabled = false;
        teachSubmit.innerHTML = originalText;
        teachSubmit.style.background = '';
        if (teachSuccess) teachSuccess.classList.remove('show');
      }, 5000);
    });
  }

});
