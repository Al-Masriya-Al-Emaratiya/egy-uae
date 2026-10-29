/**
 * AL MASSRIYA AL EMARATIYA - GLOBAL TRADE ENGINE CONTROLLER
 * High-performance, accessible, and reactive cross-device execution
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SMART HEADER & SCROLL CONTROLLER
    // ==========================================
    const header = document.getElementById('header');
    const progressBar = document.getElementById('progress-bar');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

                // Smart Header Hide / Show Logic
                if (currentScroll <= 15) {
                    header.classList.remove('hidden');
                    header.style.boxShadow = "none";
                } else {
                    header.style.boxShadow = "0 8px 30px rgba(4, 77, 161, 0.08)";
                    if (currentScroll > lastScroll && currentScroll > 140) {
                        header.classList.add('hidden');
                    } else {
                        header.classList.remove('hidden');
                    }
                }
                lastScroll = Math.max(0, currentScroll);

                // Progress Bar
                if (progressBar) {
                    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = winHeight > 0 ? (currentScroll / winHeight) * 100 : 0;
                    progressBar.style.width = `${scrolled}%`;
                }

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ==========================================
    // 2. INTERSECTION OBSERVER SCROLLSPY (Zero Layout Thrashing)
    // ==========================================
    const desktopNavLinks = document.querySelectorAll('.desktop-navigation .nav-item-link');
    const bottomDockLinks = document.querySelectorAll('.app-bottom-dock .dock-nav-item:not(.center-portal)');
    const trackedSections = document.querySelectorAll('main section[id]');

    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                desktopNavLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    link.classList.toggle('active', href === `#${activeId}`);
                });

                bottomDockLinks.forEach(dock => {
                    const href = dock.getAttribute('href');
                    dock.classList.toggle('active', href === `#${activeId}`);
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    });

    trackedSections.forEach(section => scrollspyObserver.observe(section));

    // ==========================================
    // 3. MOBILE SIDE DRAWER (With Focus Management)
    // ==========================================
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const sideDrawer = document.getElementById('side-drawer');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const burgerBtn = document.querySelector('.menu-burger-btn');

    function toggleMobileDrawer(forceState) {
        if (!sideDrawer) return;
        const willBeActive = typeof forceState === 'boolean' 
            ? forceState 
            : !sideDrawer.classList.contains('active');

        sideDrawer.classList.toggle('active', willBeActive);
        if (drawerBackdrop) drawerBackdrop.classList.toggle('active', willBeActive);
        sideDrawer.setAttribute('aria-hidden', !willBeActive);
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', willBeActive);
        document.body.style.overflow = willBeActive ? 'hidden' : '';

        if (willBeActive) {
            const firstLink = sideDrawer.querySelector('input, a, button');
            if (firstLink) firstLink.focus();
        } else if (burgerBtn) {
            burgerBtn.focus();
        }
    }

    menuToggles.forEach(btn => btn.addEventListener('click', () => toggleMobileDrawer()));

    // Close on navigation link selection
    document.querySelectorAll('.drawer-nav-list a').forEach(link => {
        link.addEventListener('click', () => toggleMobileDrawer(false));
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (sideDrawer && sideDrawer.classList.contains('active')) {
                toggleMobileDrawer(false);
            }
            if (resultsDropdown) resultsDropdown.classList.add('hidden');
            if (drawerResultsDropdown) drawerResultsDropdown.classList.add('hidden');
            if (langMenu) {
                langMenu.classList.remove('active');
                if (langTrigger) langTrigger.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // ==========================================
    // 4. ENTERPRISE SEARCH & QUICK DISPATCH
    // ==========================================
    const tradeSearchDB = [
        { title: "Food & Agricultural Division", url: "pages/food-division.html", category: "Division", keywords: "food fresh citrus potatoes export sharjah crops vegetables" },
        { title: "Hotel Linen & Operating Supplies", url: "pages/hotel-supplies.html", category: "Division", keywords: "hotel cotton linen bedsheets giza port said jebel ali fabrics amenities" },
        { title: "Chemicals & Cosmetics Raw Materials", url: "pages/chemicals-cosmetics.html", category: "Division", keywords: "chemicals detergents cosmetics reach sokhna khalifa industrial" },
        { title: "OS&E & Turnkey Project Procurement", url: "pages/ose-procurement.html", category: "Division", keywords: "ose ffe turnkey hospital clinic resort project cargo fixtures" },
        { title: "Damietta Office Furniture Systems", url: "pages/office-furniture.html", category: "Division", keywords: "office desk chairs hardwood damietta sharjah workstations mahogany" },
        { title: "Banquet & Convention Installations", url: "pages/banquet-furniture.html", category: "Division", keywords: "banquet event ballroom stackable chairs tables staging" },
        { title: "Accommodation Metal Beds & Lockers", url: "pages/metal-beds-lockers.html", category: "Division", keywords: "bunk bed lockers metal accommodation 10th of ramadan labor housing" },
        { title: "Staff Residential Modular Suites", url: "pages/staff-furniture.html", category: "Division", keywords: "modular staff housing wardrobes dorms damietta residential suites" },
        { title: "Commercial Lounges & Sofa Systems", url: "pages/staff-sofa-sets.html", category: "Division", keywords: "sofa lounge lobby reception waiting area leather armchairs" },
        { title: "Customs Clearance (Nafeza & Mirsal)", url: "#services", category: "Service", keywords: "nafeza customs acid mirsal egypt uae clearance broker" },
        { title: "Ocean & Air Freight Forwarding", url: "#services", category: "Service", keywords: "freight ocean sea air fcl lcl containers charter booking" },
        { title: "Commercial Agency Representation", url: "#services", category: "Service", keywords: "agency trade proxy commercial license legal representation MENA" },
        { title: "Live Cargo Telematics Tracking", url: "tracking.html", category: "System", keywords: "tracking telemetry container status bill of lading flight manifest" },
        { title: "Launch Sourcing RFQ Desk", url: "#contact", category: "Support", keywords: "rfq quote inquiry proposal procurement dispatch" }
    ];

    const searchInput = document.getElementById('global-search-input');
    const drawerSearchInput = document.getElementById('drawer-search-input');
    const resultsDropdown = document.getElementById('search-results-dropdown');
    const drawerResultsDropdown = document.getElementById('drawer-search-results');
    const clearSearchBtn = document.getElementById('clear-search-btn');

    function renderSearchResults(query, container, onSelect) {
        if (!container) return;
        container.innerHTML = '';

        if (query.length < 2) {
            container.classList.add('hidden');
            return;
        }

        const filtered = tradeSearchDB.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.keywords.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            const noRes = document.createElement('div');
            noRes.className = 'search-item';
            noRes.innerHTML = `<span class="title">No trade matches for "${escapeHtml(query)}"</span>`;
            container.appendChild(noRes);
        } else {
            filtered.forEach(item => {
                const el = document.createElement('div');
                el.className = 'search-item';
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'option');
                el.innerHTML = `
                    <span class="title">${escapeHtml(item.title)}</span>
                    <span class="category">${escapeHtml(item.category)}</span>
                `;
                
                const selectItem = () => {
                    if (onSelect) onSelect();
                    navigateToDestination(item.url);
                };

                el.addEventListener('click', selectItem);
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') selectItem();
                });

                container.appendChild(el);
            });
        }
        container.classList.remove('hidden');
    }

    function navigateToDestination(url) {
        if (url.startsWith('#')) {
            const target = document.querySelector(url);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        window.location.href = url;
    }

    function escapeHtml(str) {
        return str.replace(/[&<>"']/g, (match) => {
            const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
            return map[match];
        });
    }

    if (searchInput && resultsDropdown) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (clearSearchBtn) clearSearchBtn.classList.toggle('hidden', query.length === 0);
            renderSearchResults(query, resultsDropdown, () => {
                resultsDropdown.classList.add('hidden');
                searchInput.value = '';
                if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
            });
        });

        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                searchInput.value = '';
                resultsDropdown.classList.add('hidden');
                clearSearchBtn.classList.add('hidden');
                searchInput.focus();
            });
        }
    }

    if (drawerSearchInput && drawerResultsDropdown) {
        drawerSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            renderSearchResults(query, drawerResultsDropdown, () => {
                toggleMobileDrawer(false);
                drawerResultsDropdown.classList.add('hidden');
                drawerSearchInput.value = '';
            });
        });
    }

    // Dismiss search when clicking outside
    document.addEventListener('click', (e) => {
        if (resultsDropdown && !resultsDropdown.contains(e.target) && !e.target.closest('.search-box')) {
            resultsDropdown.classList.add('hidden');
        }
        if (drawerResultsDropdown && !drawerResultsDropdown.contains(e.target) && !e.target.closest('.drawer-search-box')) {
            drawerResultsDropdown.classList.add('hidden');
        }
    });

    // ==========================================
    // 5. TRADE DIVISION FILTER TABS
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
                const shouldShow = filterTarget === 'all' || category === filterTarget;

                if (shouldShow) {
                    card.classList.remove('is-filtered-out');
                } else {
                    card.classList.add('is-filtered-out');
                }
            });
        });
    });

    // ==========================================
    // 6. ACCESSIBLE ACCORDION FAQ
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(headerBtn => {
        headerBtn.addEventListener('click', () => {
            const currentItem = headerBtn.closest('.accordion-item');
            const isCurrentlyActive = currentItem.classList.contains('active');

            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const btn = item.querySelector('.accordion-header');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // Toggle selected item
            if (!isCurrentlyActive) {
                currentItem.classList.add('active');
                headerBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================
    // 7. LANGUAGE DROPDOWN
    // ==========================================
    const langTrigger = document.getElementById('lang-trigger');
    const langMenu = document.getElementById('lang-menu');

    if (langTrigger && langMenu) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = langMenu.classList.toggle('active');
            langTrigger.setAttribute('aria-expanded', isActive);
        });

        document.addEventListener('click', () => {
            if (langMenu.classList.contains('active')) {
                langMenu.classList.remove('active');
                langTrigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ==========================================
    // 8. RFQ AUTOFILL JUMP
    // ==========================================
    const rfqAutofillButtons = document.querySelectorAll('.rfq-autofill-btn');
    const rfqSubjectField = document.getElementById('rfq-division-subject');
    const contactSection = document.getElementById('contact');

    rfqAutofillButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSubject = btn.getAttribute('data-target-subject');
            if (rfqSubjectField) {
                rfqSubjectField.value = `Procurement Sourcing: ${targetSubject}`;
            }
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (rfqSubjectField) rfqSubjectField.focus();
                }, 400);
            }
        });
    });

    // ==========================================
    // 9. HIGH-CONVERTING ASYNC RFQ SUBMISSION
    // ==========================================
    const rfqForm = document.getElementById('rfq-main-form');
    const rfqAlert = document.getElementById('rfq-form-alert');
    const rfqSubmitBtn = document.getElementById('rfq-submit-btn');

    if (rfqForm) {
        rfqForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Native validation check
            if (!rfqForm.checkValidity()) {
                rfqForm.reportValidity();
                return;
            }

            const btnText = rfqSubmitBtn.querySelector('.btn-text');
            const btnLoader = rfqSubmitBtn.querySelector('.btn-loader');
            
            // Set loading state
            rfqSubmitBtn.disabled = true;
            if (btnText) btnText.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');
            if (rfqAlert) rfqAlert.classList.add('hidden');

            try {
                const formData = new FormData(rfqForm);
                const response = await fetch(rfqForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    rfqAlert.className = 'rfq-alert success';
                    rfqAlert.textContent = 'RFQ Transmitted Successfully. Your consignment manifest has been queued for dispatch review.';
                    rfqAlert.classList.remove('hidden');
                    rfqForm.reset();
                } else {
                    const data = await response.json();
                    throw new Error(data?.errors?.[0]?.message || 'Server rejected submission');
                }
            } catch (error) {
                rfqAlert.className = 'rfq-alert error';
                rfqAlert.textContent = 'Transmission Error: Unable to route your RFQ. Please reach our direct line: +20 101 176 6232.';
                rfqAlert.classList.remove('hidden');
            } finally {
                rfqSubmitBtn.disabled = false;
                if (btnText) btnText.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // 10. PRECISION DESKTOP CURSOR (Hover-Only)
    // ==========================================
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cursor = document.getElementById('tech-cursor');
    const follower = document.getElementById('tech-cursor-follower');

    if (isFinePointer && cursor && follower) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let followerX = mouseX;
        let followerY = mouseY;
        let isCursorMoving = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;

            if (!isCursorMoving) {
                document.body.classList.add('cursor-active');
                isCursorMoving = true;
            }
        }, { passive: true });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.16;
            followerY += (mouseY - followerY) * 0.16;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;
            requestAnimationFrame(animateFollower);
        }
        requestAnimationFrame(animateFollower);

        // Delegated hover magnification
        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, input, textarea, .epic-card, .filter-pill-btn');
            if (target) {
                follower.style.width = '48px';
                follower.style.height = '48px';
                follower.style.borderColor = 'var(--accent)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, input, textarea, .epic-card, .filter-pill-btn');
            if (target) {
                follower.style.width = '32px';
                follower.style.height = '32px';
                follower.style.borderColor = 'var(--primary)';
            }
        });
    }

    // ==========================================
    // 11. DYNAMIC CURRENT YEAR
    // ==========================================
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 12. THIRD-PARTY INITIALIZATION
    // ==========================================
    // AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40
        });
    }

    // Swiper Testimonial Slider
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
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
    if (typeof VanillaTilt !== 'undefined' && isFinePointer) {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 8,
            speed: 500,
            glare: true,
            "max-glare": 0.15
        });
    }
});
