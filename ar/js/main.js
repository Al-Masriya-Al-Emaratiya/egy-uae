/**
 * ALMASSRIYA ALEMARATIYA — REFINED ENTERPRISE CLIENT ENGINE
 * Handles:
 * 1. Default Light Theme Engine with user persistence
 * 2. Multi-Language Switcher Dropdown (EN, AR, CN)
 * 3. Real-Time Global Commodity Search (Arabic & English)
 * 4. Catalog Category Filtering
 * 5. Direct RFQ Payload Autofill & Asynchronous Submission
 * 6. Clean FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Current Year Sync
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Defaults strictly to Light Mode)
  const themeToggleBtn = document.getElementById('theme-toggle');
  const rootHtml = document.documentElement;

  const storedTheme = localStorage.getItem('amae-theme') || 'light';
  rootHtml.setAttribute('data-theme', storedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = rootHtml.getAttribute('data-theme') || 'light';
      const targetTheme = activeTheme === 'light' ? 'dark' : 'light';

      rootHtml.setAttribute('data-theme', targetTheme);
      localStorage.setItem('amae-theme', targetTheme);
    });
  }

  // 3. Multi-Language Selector Dropdown
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');

  if (langBtn && langMenu) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
      langBtn.setAttribute('aria-expanded', !isExpanded);
      langMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
        langMenu.classList.add('hidden');
        langBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Scroll Reading Progress Bar
  const progressLine = document.getElementById('scroll-progress-line');
  window.addEventListener('scroll', () => {
    const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollMax > 0 && progressLine) {
      const percentage = (window.scrollY / scrollMax) * 100;
      progressLine.style.width = `${percentage}%`;
    }
  }, { passive: true });

  // 5. Mobile Drawer Navigation
  const menuTriggers = document.querySelectorAll('.menu-trigger');
  const sideDrawer = document.getElementById('side-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');

  const handleDrawerToggle = () => {
    if (!sideDrawer) return;
    const isOpen = sideDrawer.classList.contains('open');
    if (isOpen) {
      sideDrawer.classList.remove('open');
      drawerBackdrop?.classList.remove('active');
      sideDrawer.setAttribute('aria-hidden', 'true');
    } else {
      sideDrawer.classList.add('open');
      drawerBackdrop?.classList.add('active');
      sideDrawer.setAttribute('aria-hidden', 'false');
    }
  };

  menuTriggers.forEach(btn => btn.addEventListener('click', handleDrawerToggle));

  // 6. Interactive Commodity Search (Arabic & English Support)
  const isArabic = document.documentElement.lang === 'ar';

  const tradeDatabase = [
    { 
      title: isArabic ? 'الحاصلات الزراعية والمواد الغذائية' : 'Food & Agricultural Produce', 
      cat: isArabic ? 'الأغذية والمستهلكات' : 'Consumables', 
      desc: isArabic ? 'موالح طازجة، خضروات مجمدة، وحاصلات تصديرية زراعية.' : 'Citrus, frozen vegetables, and export agro commodities.' 
    },
    { 
      title: isArabic ? 'المفروشات وتجهيزات الفنادق الفاخرة' : 'Hotel Linen & Operating Supplies', 
      cat: isArabic ? 'الضيافة والفنادق' : 'Hospitality', 
      desc: isArabic ? 'مفروشات وبياضات فندقية قطن مصري 100% عالي المتانة.' : '100% Egyptian Giza cotton luxury beddings and bath linens.' 
    },
    { 
      title: isArabic ? 'منظومات الأثاث المكتبي من دمياط' : 'Damietta Office Furniture Systems', 
      cat: isArabic ? 'أثاث ومكاتب' : 'Furniture', 
      desc: isArabic ? 'مكاتب خشب زان تنفيذي، وطاولات مؤتمرات عازلة للصوت.' : 'Executive beechwood desks, acoustic conference tables.' 
    },
    { 
      title: isArabic ? 'الكيماويات وخامات المنظفات الصناعية' : 'Chemicals & Detergents Raw Materials', 
      cat: isArabic ? 'كيماويات وصناعة' : 'Industrial', 
      desc: isArabic ? 'مواد فاعلة سطحياً، خامات منظفات صناعية، وزيوت عطرية.' : 'Surfactants, industrial detergent bases, fragrance oils.' 
    },
    { 
      title: isArabic ? 'تجهيزات قاعات الحفلات والمؤتمرات' : 'Banquet & Convention Installations', 
      cat: isArabic ? 'أثاث وقاعات' : 'Furniture', 
      desc: isArabic ? 'كراسي قاعات ألومنيوم قابلة للتكديس، ومنصات للمؤتمرات.' : 'Stackable aluminum event chairs and staging systems.' 
    },
    { 
      title: isArabic ? 'الأسرة المعدنية وخزائن سكن العمال' : 'Accommodation Metal Beds & Lockers', 
      cat: isArabic ? 'تجهيزات صناعية' : 'Industrial', 
      desc: isArabic ? 'أسرّة معدنية مزدوجة طلاء كهروستاتيكي وخزائن مؤمنة.' : 'Tubular electrostatic steel bunk beds and storage lockers.' 
    }
  ];

  const searchInput = document.getElementById('global-search-input');
  const searchDropdown = document.getElementById('search-dropdown-menu');
  const clearSearchBtn = document.getElementById('clear-search-btn');

  if (searchInput && searchDropdown) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (query.length > 0) {
        clearSearchBtn?.classList.remove('hidden');
        const matches = tradeDatabase.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.cat.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
          searchDropdown.innerHTML = matches.map(m => `
            <div class="search-result-item" data-title="${m.title}">
              <strong>${m.title}</strong>
              <span>${m.cat} &bull; ${m.desc}</span>
            </div>
          `).join('');
          searchDropdown.classList.remove('hidden');
        } else {
          searchDropdown.innerHTML = `<div style="font-size:0.85rem; padding: 0.75rem; color: var(--text-muted); text-align: ${isArabic ? 'right' : 'left'};">${isArabic ? 'لم يتم العثور على قطاعات مطابقة.' : 'No matching trade divisions found.'}</div>`;
          searchDropdown.classList.remove('hidden');
        }
      } else {
        clearSearchBtn?.classList.add('hidden');
        searchDropdown.classList.add('hidden');
      }
    });

    searchDropdown.addEventListener('click', (e) => {
      const item = e.target.closest('.search-result-item');
      if (item) {
        const title = item.dataset.title;
        autofillRFQ(title);
        searchDropdown.classList.add('hidden');
        searchInput.value = '';
        clearSearchBtn?.classList.add('hidden');
      }
    });

    clearSearchBtn?.addEventListener('click', () => {
      searchInput.value = '';
      clearSearchBtn.classList.add('hidden');
      searchDropdown.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  // 7. Catalog Filter Buttons
  const filterBtns = document.querySelectorAll('.catalog-tab-btn');
  const catalogCards = document.querySelectorAll('.catalog-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      catalogCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterVal === 'all' || cardCat === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 8. RFQ Autofill Function
  function autofillRFQ(subjectTitle) {
    const rfqField = document.getElementById('rfq-division-subject');
    const contactSection = document.getElementById('contact');

    if (rfqField) {
      rfqField.value = subjectTitle;
      rfqField.focus();
      rfqField.style.borderColor = 'var(--brand-red)';
      setTimeout(() => {
        rfqField.style.borderColor = '';
      }, 1800);
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.rfq-autofill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSubject = btn.getAttribute('data-target-subject');
      autofillRFQ(targetSubject);
    });
  });

  // 9. FAQ Accordion Handling
  const accHeaders = document.querySelectorAll('.acc-header');
  accHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const panel = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      accHeaders.forEach(h => {
        h.classList.remove('active');
        h.setAttribute('aria-expanded', 'false');
        if (h.nextElementSibling) h.nextElementSibling.style.display = 'none';
      });

      if (!isOpen) {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        if (panel) panel.style.display = 'block';
      }
    });
  });

  // 10. Asynchronous RFQ Submission via Formspree
  const rfqForm = document.getElementById('rfq-main-form');
  const submitBtn = document.getElementById('rfq-submit-btn');
  const alertBox = document.getElementById('rfq-form-alert');

  if (rfqForm) {
    rfqForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');

      if (!rfqForm.checkValidity()) {
        showAlert(isArabic ? 'يرجى استكمال جميع الحقول المطلوبة بشكل صحيح.' : 'Please complete all required fields.', 'error');
        return;
      }

      btnText.classList.add('hidden');
      btnLoader.classList.remove('hidden');
      submitBtn.disabled = true;

      const formData = new FormData(rfqForm);

      try {
        const response = await fetch(rfqForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          showAlert(isArabic ? 'تم استلام طلب التوريد بنجاح لدى مكتب العمليات. سنتواصل معكم خلال ساعتي عمل.' : 'Thank you. Your RFQ has been received. We will revert within 2 hours.', 'success');
          rfqForm.reset();
        } else {
          showAlert(isArabic ? 'تعذر إتمام الإرسال حالياً. يرجى التواصل المباشر عبر الهاتف: +20 101 176 6232' : 'Submission failed. Please call us directly at +20 101 176 6232.', 'error');
        }
      } catch (err) {
        showAlert(isArabic ? 'حدث خطأ في الاتصال بالشبكة. يرجى إعادة المحاولة.' : 'Network error. Please try again.', 'error');
      } finally {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });
  }

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `form-alert-message ${type}`;
    alertBox.classList.remove('hidden');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 11. Swiper Testimonial Slider
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      }
    });
  }

  // 12. AOS Scroll Animations
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 40
    });
  }

  // 13. Active ScrollSpy for Header Ribbon
  const trackedSections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-anchor');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    trackedSections.forEach(section => {
      const topOffset = section.offsetTop - 140;
      const height = section.offsetHeight;
      if (window.scrollY >= topOffset && window.scrollY < topOffset + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navAnchors.forEach(anchor => {
      anchor.classList.remove('active');
      if (anchor.getAttribute('href') === `#${currentSectionId}`) {
        anchor.classList.add('active');
      }
    });
  }, { passive: true });
});
