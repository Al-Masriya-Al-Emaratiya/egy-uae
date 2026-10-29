/**
 * AL MASSRIYA AL EMARATIYA - GLOBAL TRADE ENGINE CONTROLLER
 * Zero-Jank & Multi-Device Responsive Execution
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART HEADER & SCROLLSPY CONTROLLER
    // ==========================================
    const header = document.getElementById('header');
    let lastScroll = 0;
    const desktopNavLinks = document.querySelectorAll('.desktop-navigation .nav-item-link');
    const bottomDockLinks = document.querySelectorAll('.app-bottom-dock .dock-nav-item:not(.center-portal)');
    const mainSections = document.querySelectorAll('main section[id]');
    const progressBar = document.getElementById('progress-bar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Smart Header Hide / Show Logic
        if (currentScroll <= 15) {
            header.classList.remove('hidden');
            header.style.boxShadow = "none";
        } else {
            header.style.boxShadow = "0 8px 30px rgba(4, 77, 161, 0.08)";
            if (currentScroll > lastScroll && currentScroll > 140) {
                header.classList.add('hidden'); // Scrolling Down -> Hide
            } else {
                header.classList.remove('hidden'); // Scrolling Up -> Show
            }
        }
        lastScroll = currentScroll;

        // Performant Scrollspy
        let activeId = '';
        mainSections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            const sectionHeight = section.offsetHeight;
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                activeId = section.getAttribute('id');
            }
        });

        // Update Desktop Links
        desktopNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });

        // Update Mobile Bottom Dock
        bottomDockLinks.forEach(dock => {
            dock.classList.remove('active');
            if (dock.getAttribute('href') === `#${activeId}`) {
                dock.classList.add('active');
            }
        });

        // Reading Progress Indicator
        if (progressBar) {
            const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (currentScroll / winHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        }
    }, { passive: true });

    // ==========================================
    // 2. MOBILE DRAWER WITH BACKDROP CONTROLLER
    // ==========================================
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const sideDrawer = document.getElementById('side-drawer');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const drawerLinks = document.querySelectorAll('.drawer-nav-list a');

    function toggleMobileDrawer() {
        if (!sideDrawer) return;
        const isActive = sideDrawer.classList.toggle('active');
        if (drawerBackdrop) drawerBackdrop.classList.toggle('active');
        sideDrawer.setAttribute('aria-hidden', !isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }

    menuToggles.forEach(btn => btn.addEventListener('click', toggleMobileDrawer));

    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideDrawer && sideDrawer.classList.contains('active')) {
                toggleMobileDrawer();
            }
        });
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideDrawer && sideDrawer.classList.contains('active')) {
                toggleMobileDrawer();
            }
            if (resultsDropdown) resultsDropdown.classList.add('hidden');
            if (langMenu) langMenu.classList.remove('active');
        }
    });

    // ==========================================
    // 3. ENTERPRISE SEARCH & QUICK JUMP
    // ==========================================
    const tradeSearchDB = [
        { title: "Food & Agricultural Division", url: "pages/food-division.html", category: "Division", keywords: "food, fresh, citrus, potatoes, export, sharjah" },
        { title: "Hotel Linen & Operating Supplies", url: "pages/hotel-supplies.html", category: "Division", keywords: "hotel, cotton, linen, bedsheets, giza, port said, jebel ali" },
        { title: "Chemicals & Cosmetics Raw Materials", url: "pages/chemicals-cosmetics.html", category: "Division", keywords: "chemicals, detergents, cosmetics, reach, sokhna, khalifa" },
        { title: "OS&E & Turnkey Project Procurement", url: "pages/ose-procurement.html", category: "Division", keywords: "ose, ffe, turnkey, hospital, resort, project cargo" },
        { title: "Damietta Office Furniture Systems", url: "pages/office-furniture.html", category: "Division", keywords: "office, desk, chairs, hardwood, damietta, sharjah" },
        { title: "Banquet & Convention Installations", url: "pages/banquet-furniture.html", category: "Division", keywords: "banquet, event, ballroom, stackable chairs, tables" },
        { title: "Accommodation Metal Beds & Lockers", url: "pages/metal-beds-lockers.html", category: "Division", keywords: "bunk bed, lockers, metal, accommodation, 10th of ramadan" },
        { title: "Staff Residential Modular Suites", url: "pages/staff-furniture.html", category: "Division", keywords: "modular, staff housing, wardrobes, dorms, damietta" },
        { title: "Commercial Lounges & Sofa Systems", url: "pages/staff-sofa-sets.html", category: "Division", keywords: "sofa, lounge, lobby, reception, waiting area" },
        { title: "Customs Clearance (Nafeza & Mirsal)", url: "#services", category: "Service", keywords: "nafeza, customs, acid, mirsal, egypt, uae, clearance" },
        { title: "Ocean & Air Freight Forwarding", url: "#services", category: "Service", keywords: "freight, ocean, sea, air, fcl, lcl, containers" },
        { title: "Commercial Agency Representation", url: "#services", category: "Service", keywords: "agency, trade proxy, commercial license, representation" },
        { title: "Live Cargo Telematics Tracking", url: "tracking.html", category: "System", keywords: "tracking, telemetry, container status, bill of lading" },
        { title: "Launch Sourcing RFQ Desk", url: "#contact", category: "Support", keywords: "rfq, quote, inquiry, proposal, procurement" }
    ];

    const searchInput = document.getElementById('global-search-input');
    const drawerSearchInput = document.getElementById('drawer-search-input');
    const resultsDropdown = document.getElementById('search-results-dropdown');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    function executeSearch(query) {
        if (!resultsDropdown) return;
        resultsDropdown.innerHTML = '';

        if (query.length < 2) {
            resultsDropdown.classList.add('hidden');
            if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            return;
        }

        if (clearSearchBtn) clearSearchBtn.classList.remove('hidden');

        const filtered = tradeSearchDB.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            const noRes = document.createElement('div');
            noRes.className = 'search-item';
            noRes.innerHTML = `<span class="title">No trade matches for "${query}"</span>`;
            resultsDropdown.appendChild(noRes);
        } else {
            filtered.forEach(item => {
                const el = document.createElement('div');
                el.className = 'search-item';
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
        searchInput.addEventListener('input', (e) => executeSearch(e.target.value.toLowerCase().trim()));
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                resultsDropdown.classList.add('hidden');
                clearSearchBtn.classList.add('hidden');
            });
        }
    }

    if (drawerSearchInput) {
        drawerSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = drawerSearchInput.value.toLowerCase().trim();
                const match = tradeSearchDB.find(i => i.title.toLowerCase().includes(q) || i.keywords.includes(q));
                if (match) {
                    window.location.href = match.url;
                    toggleMobileDrawer();
                }
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (searchInput && resultsDropdown && !searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
            resultsDropdown.classList.add('hidden');
        }
    });

    // ==========================================
    // 4. TRADE DIVISION FILTER TABS
    // ==========================================
    const filterPills = document.querySelectorAll('.filter-pill-btn');
    const catalogCards = document.querySelectorAll('.b2b-trade-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterTarget = pill.getAttribute('data-filter');

            catalogCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterTarget === 'all' || category === filterTarget) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
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
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isOpen = item.classList.contains('active');

            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));

            if (!isOpen) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 6. LANGUAGE MENU DROPDOWN
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
    // 7. RFQ AUTO-FILL TRIGGER & FOCUS
    // ==========================================
    const rfqAutofillButtons = document.querySelectorAll('.rfq-autofill-btn');
    const rfqSubjectField = document.getElementById('rfq-division-subject');
    const contactSection = document.getElementById('contact');

    rfqAutofillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target-subject');
            if (rfqSubjectField) {
                rfqSubjectField.value = `Procurement Inquiry: ${target}`;
                rfqSubjectField.focus();
            }
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // 8. HARDWARE-ACCELERATED TECH CURSOR
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

        const hoverTargets = document.querySelectorAll('a, button, input, textarea, .epic-card');
        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '48px';
                follower.style.height = '48px';
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
    // 9. DYNAMIC CURRENT YEAR
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
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
            offset: 50
        });
    }

    // Swiper Testimonial Slider
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
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

    // Vanilla Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 8,
            speed: 500,
            glare: true,
            "max-glare": 0.15
        });
    }

});
