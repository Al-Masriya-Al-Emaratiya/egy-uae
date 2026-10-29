/**
 * AL MASSRIYA AL EMARATIYA - CORE INTERACTION CONTROLLER
 * Optimized for Enterprise Global B2B Performance
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART DYNAMIC HEADER & SCROLLSPY
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
    const sections = document.querySelectorAll('main section[id]');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Header Shadow & Hide/Show Logic
        if (currentScroll <= 10) {
            header.classList.remove('hidden');
            header.style.boxShadow = "none";
        } else {
            header.style.boxShadow = "0 8px 30px rgba(4, 77, 161, 0.08)";
            if (currentScroll > lastScroll && currentScroll > 150) {
                header.classList.add('hidden'); // Scrolling down
            } else {
                header.classList.remove('hidden'); // Scrolling up
            }
        }
        lastScroll = currentScroll;

        // Performant Scrollspy to Highlight Active Menu
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 120;
            const sectionHeight = sec.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Reading Progress Indicator
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }
    }, { passive: true });

    // ==========================================
    // 2. MOBILE DRAWER CONTROLLER
    // ==========================================
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const sideDrawer = document.getElementById('side-drawer');
    const drawerOverlay = document.querySelector('.drawer-overlay');
    const drawerLinks = document.querySelectorAll('.drawer-links a');

    function toggleDrawer() {
        const isActive = sideDrawer.classList.toggle('active');
        drawerOverlay.classList.toggle('active');
        sideDrawer.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggles.forEach(btn => btn.addEventListener('click', toggleDrawer));
    if (drawerOverlay) drawerOverlay.addEventListener('click', toggleDrawer);

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            sideDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            sideDrawer.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideDrawer && sideDrawer.classList.contains('active')) {
                toggleDrawer();
            }
            if (resultsDropdown) {
                resultsDropdown.classList.add('hidden');
            }
            if (langMenu) {
                langMenu.classList.remove('active');
            }
        }
    });

    // ==========================================
    // 3. ENTERPRISE SEARCH DATABASE & AUTOCOMPLETE
    // ==========================================
    const searchDatabase = [
        { title: "Food & Agricultural Division", url: "pages/food-division.html", category: "Trade Division", keywords: "food, orange, onions, grain, export, corridor, sharjah" },
        { title: "Hotel & Hospitality Supplies", url: "pages/hotel-supplies.html", category: "Trade Division", keywords: "hotel, cotton, linen, bedsheets, luxury, port said" },
        { title: "Chemicals & Cosmetics", url: "pages/chemicals-cosmetics.html", category: "Trade Division", keywords: "chemicals, cosmetics, safety, alexandria, reach, iso" },
        { title: "OS&E Project Procurement", url: "pages/ose-procurement.html", category: "Trade Division", keywords: "ose, ff&e, procurement, turnkey, hotel build, cargo" },
        { title: "Office Furniture Systems", url: "pages/office-furniture.html", category: "Trade Division", keywords: "office, furniture, hardwood, desks, chairs, damietta" },
        { title: "Banquet & Convention Sets", url: "pages/banquet-furniture.html", category: "Trade Division", keywords: "banquet, event, stackable chairs, convention, ballroom" },
        { title: "Metal Accommodation Beds & Lockers", url: "pages/metal-beds-lockers.html", category: "Trade Division", keywords: "metal, bunk beds, lockers, steel, rust proof, dorm" },
        { title: "Staff Modular Housing Furniture", url: "pages/staff-furniture.html", category: "Trade Division", keywords: "staff, modular, dorms, housing, damietta" },
        { title: "Commercial Lounge & Sofa Sets", url: "pages/staff-sofa-sets.html", category: "Trade Division", keywords: "sofa, lounge, lobby, reception, modular" },
        { title: "Freight Forwarding & Sea Transit", url: "#services", category: "Service", keywords: "freight, ocean, sea, fcl, lcl, jebel ali, alexandria" },
        { title: "Trade Facilitation & Commercial Agency", url: "#services", category: "Service", keywords: "agency, trade license, business setup, proxy, legal" },
        { title: "Customs Clearance (Nafeza & ACI)", url: "#services", category: "Service", keywords: "customs, nafeza, acid, clearance, tariffs, taxes" },
        { title: "Inland Road Transit & Trucking", url: "#services", category: "Service", keywords: "trucks, trailers, bonded transit, inland, terminal" },
        { title: "Smart Tracking System", url: "tracking.html", category: "System", keywords: "track, telemetry, cargo status, container, airway bill" },
        { title: "Launch Sourcing RFQ Desk", url: "#contact", category: "Desk", keywords: "rfq, quote, inquiry, proposal, procurement" }
    ];

    const searchInput = document.getElementById('global-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const resultsDropdown = document.getElementById('search-results-dropdown');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    function handleSearch(query) {
        if (!resultsDropdown) return;
        resultsDropdown.innerHTML = '';

        if (query.length < 2) {
            resultsDropdown.classList.add('hidden');
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            return;
        }

        if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');

        const filtered = searchDatabase.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'search-result-item';
            empty.innerHTML = `<span class="title">No verified matches found for "${query}"</span>`;
            resultsDropdown.appendChild(empty);
        } else {
            filtered.forEach(item => {
                const el = document.createElement('div');
                el.className = 'search-result-item';
                el.innerHTML = `
                    <span class="title">${item.title}</span>
                    <span class="category">${item.category}</span>
                `;
                el.addEventListener('click', () => {
                    window.location.href = item.url;
                    resultsDropdown.classList.add('hidden');
                    if (searchInput) searchInput.value = '';
                });
                resultsDropdown.appendChild(el);
            });
        }
        resultsDropdown.classList.remove('hidden');
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => handleSearch(e.target.value.toLowerCase().trim()));
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                resultsDropdown.classList.add('hidden');
                clearSearchBtn.classList.add('hidden');
            });
        }
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = mobileSearchInput.value.toLowerCase().trim();
                const matched = searchDatabase.find(item => item.title.toLowerCase().includes(q) || item.keywords.includes(q));
                if (matched) {
                    window.location.href = matched.url;
                    toggleDrawer();
                }
            }
        });
    }

    // Click Outside Search Closes Dropdown
    document.addEventListener('click', (e) => {
        if (searchInput && resultsDropdown && !searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.classList.add('hidden');
        }
    });

    // ==========================================
    // 4. TRADE DIVISION FILTER TABS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-tab-btn');
    const productCards = document.querySelectorAll('.b2b-product-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==========================================
    // 5. ACCORDION FAQ
    // ==========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const currentItem = q.parentElement;
            const isOpen = currentItem.classList.contains('active');

            // Close siblings
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));

            if (!isOpen) {
                currentItem.classList.add('active');
            }
        });
    });

    // ==========================================
    // 6. LANGUAGE MENU TOGGLE
    // ==========================================
    const langTrigger = document.getElementById('lang-trigger');
    const langMenu = document.getElementById('lang-menu');
    if (langTrigger && langMenu) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const expanded = langMenu.classList.toggle('active');
            langTrigger.setAttribute('aria-expanded', expanded);
        });

        document.addEventListener('click', () => {
            langMenu.classList.remove('active');
            langTrigger.setAttribute('aria-expanded', 'false');
        });
    }

    // ==========================================
    // 7. SMOOTH RFQ AUTO-FILL TRIGGER
    // ==========================================
    const rfqButtons = document.querySelectorAll('.rfq-trigger-btn');
    const rfqSubjectInput = document.getElementById('rfq-division-subject');
    const contactSection = document.getElementById('contact');

    rfqButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSubject = btn.getAttribute('data-subject');
            if (rfqSubjectInput) {
                rfqSubjectInput.value = `Sourcing Inquiry: ${targetSubject}`;
                rfqSubjectInput.focus();
            }
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 8. HARDWARE ACCELERATED TECH CURSOR
    // ==========================================
    const cursor = document.getElementById('tech-cursor');
    const follower = document.getElementById('tech-cursor-follower');

    if (cursor && follower && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        }, { passive: true });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
            requestAnimationFrame(animateFollower);
        }
        requestAnimationFrame(animateFollower);

        // Hover scale effects
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .epic-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '50px';
                follower.style.height = '50px';
                follower.style.borderColor = 'var(--accent)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '32px';
                follower.style.height = '32px';
                follower.style.borderColor = 'var(--primary)';
            });
        });
    }

    // ==========================================
    // 9. DYNAMIC FOOTER YEAR
    // ==========================================
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 10. THIRD-PARTY LIBRARIES INITIALIZATION
    // ==========================================
    // AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60
        });
    }

    // Swiper Testimonials Slider
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 25,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 30 }
            }
        });
    }

    // Vanilla Tilt for Systems Cards
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 8,
            speed: 500,
            glare: true,
            "max-glare": 0.15
        });
    }

});
