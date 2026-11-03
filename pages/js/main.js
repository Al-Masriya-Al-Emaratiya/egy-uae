/**
 * Al Masriya Al Emaratiya - Master Client Script
 * Includes: Theme switcher (Dark/Light), Mobile Navigation Drawer, 
 * Products Fetcher & Live Search, Filter Tabs, Modals, and Accordions.
 */

document.addEventListener('DOMContentLoaded', () => {

    const qs = (sel) => document.querySelector(sel);
    const qsa = (sel) => document.querySelectorAll(sel);

    // ==========================================
    // 1. Reading Progress Bar
    // ==========================================
    const progressLine = qs('#scroll-progress-line');
    if (progressLine) {
        window.addEventListener('scroll', () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            progressLine.style.width = scrolled + '%';
        });
    }

    // ==========================================
    // 2. Theme Toggle (Dark / Light Mode)
    // ==========================================
    const themeBtn = qs('#theme-toggle');
    const rootEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    rootEl.setAttribute('data-theme', savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = rootEl.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            rootEl.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
        });
    }

    // ==========================================
    // 3. Language Dropdown Logic
    // ==========================================
    const langTrigger = qs('#lang-trigger');
    const langMenu = qs('#lang-menu');

    if (langTrigger && langMenu) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!langMenu.contains(e.target) && !langTrigger.contains(e.target)) {
                langMenu.classList.add('hidden');
            }
        });
    }

    // ==========================================
    // 4. Mobile Drawer Menu
    // ==========================================
    const mobileToggle = qs('#mobile-toggle');
    const mobileDrawer = qs('#mobile-drawer');
    const drawerClose = qs('#drawer-close');
    const drawerBackdrop = qs('#drawer-backdrop');

    const openDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.add('open');
        if (drawerBackdrop) drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.remove('open');
        if (drawerBackdrop) drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // ==========================================
    // 5. Clean FAQ Accordions
    // ==========================================
    qsa('.acc-header').forEach(header => {
        header.addEventListener('click', () => {
            const panel = header.nextElementSibling;
            const isOpen = header.classList.contains('active');

            // Close siblings
            qsa('.acc-header').forEach(h => {
                h.classList.remove('active');
                if (h.nextElementSibling) h.nextElementSibling.style.display = 'none';
            });

            if (!isOpen && panel) {
                header.classList.add('active');
                panel.style.display = 'block';
            }
        });
    });

    // ==========================================
    // 6. Dynamic Catalog Fetcher, Search & Filters
    // ==========================================
    const productsGrid = qs('#dynamic-products-grid');
    const searchInput = qs('#catalog-search');
    const mobileSearch = qs('#mobile-search-input');
    const clearSearchBtn = qs('#clear-search-btn');
    const filterButtons = qsa('.catalog-tab-btn');

    let allProducts = [];
    let activeFilter = 'all';

    const renderProducts = (productsToRender) => {
        if (!productsGrid) return;

        if (!productsToRender || productsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem 0; color: var(--text-muted);">
                    <i class="fas fa-box-open fa-2x mb-2"></i>
                    <p>No products match your search or filter criteria.</p>
                </div>
            `;
            return;
        }

        productsGrid.innerHTML = productsToRender.map((product, index) => {
            const fallbackImg = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80';
            const img = product.image || fallbackImg;

            return `
                <div class="catalog-card-item" data-aos="fade-up">
                    <div class="card-img-shell">
                        <span class="card-badge">${product.category || 'Agro'}</span>
                        <img src="${img}" alt="${product.name}" class="card-img" loading="lazy" onerror="this.src='${fallbackImg}'">
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="card-summary">${product.description || 'Export-grade specification with international certifications.'}</p>
                        
                        <div class="spec-table">
                            <div class="spec-item">
                                <span>Origin:</span>
                                <strong>${product.origin || 'Egypt / UAE'}</strong>
                            </div>
                            <div class="spec-item">
                                <span>Packaging:</span>
                                <strong>${product.packaging || 'Bulk / Cartons'}</strong>
                            </div>
                        </div>

                        <button class="btn-outline-card" onclick="openProductModalById(${product.id || index})">
                            <i class="fas fa-circle-info"></i> View Specifications
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    };

    // Filter & Search Aggregator
    const filterAndRender = () => {
        const query = (searchInput ? searchInput.value : '').toLowerCase().trim();

        let filtered = allProducts.filter(item => {
            const matchCategory = (activeFilter === 'all') || (item.category && item.category.toLowerCase() === activeFilter.toLowerCase());
            const matchQuery = !query || 
                (item.name && item.name.toLowerCase().includes(query)) ||
                (item.description && item.description.toLowerCase().includes(query)) ||
                (item.category && item.category.toLowerCase().includes(query));
            return matchCategory && matchQuery;
        });

        renderProducts(filtered);
    };

    // Fetch JSON Data
    fetch('products/data/food-division.json')
        .then(res => {
            if (!res.ok) throw new Error('Data file unreachable');
            return res.json();
        })
        .then(data => {
            allProducts = data.map((item, idx) => ({ ...item, id: idx }));
            renderProducts(allProducts);
        })
        .catch(err => {
            console.warn('Fallback products loaded:', err);
            // Default Fallback demo if file not reached locally
            allProducts = [
                {
                    id: 0,
                    name: 'Fresh Valencia Oranges',
                    category: 'Fresh Produce',
                    description: 'Premier Egyptian citrus fruit, high juice content (50%+), ideal for direct retail and juice extraction.',
                    origin: 'Egypt',
                    types: 'Valencia, Navel, Baladi',
                    applications: 'Supermarkets, Fresh Juice Manufacturing',
                    packaging: '15kg Open Top / Telescopic Cartons, 500kg Bins',
                    image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80'
                },
                {
                    id: 1,
                    name: 'Organic Chamomile & Herbs',
                    category: 'Herbs & Spices',
                    description: 'Whole dried chamomile flowers and organic peppermint processed under ISO & Phyto certification.',
                    origin: 'Fayoum, Egypt',
                    types: 'Grade A Flowers, TBC (Tea Bag Cut)',
                    applications: 'Herbal Infusions, Extraction, Pharmaceuticals',
                    packaging: '12.5kg / 20kg Kraft Paper Sacks',
                    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
                },
                {
                    id: 2,
                    name: 'Milling Wheat & Strategic Grains',
                    category: 'Grains & Commodities',
                    description: 'Bulk supply of high protein milling wheat, non-GMO yellow corn, and premium polished white rice.',
                    origin: 'Black Sea / Egypt / India',
                    types: 'Milling Wheat (11.5% - 12.5% Protein), Yellow Corn #2',
                    applications: 'Flour Mills, Animal Feed, Wholesale Distribution',
                    packaging: 'Bulk Vessel Loads or 50kg PP Woven Bags',
                    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'
                }
            ];
            renderProducts(allProducts);
        });

    // Tab buttons filter
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-category');
            filterAndRender();
        });
    });

    // Desktop Search Trigger
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            if (clearSearchBtn) {
                clearSearchBtn.classList.toggle('hidden', searchInput.value.trim() === '');
            }
            filterAndRender();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.classList.add('hidden');
            filterAndRender();
            searchInput.focus();
        });
    }

    // Mobile Search Bridge
    if (mobileSearch) {
        mobileSearch.addEventListener('input', () => {
            if (searchInput) searchInput.value = mobileSearch.value;
            filterAndRender();
        });
    }

    // ==========================================
    // 7. Modal Logic
    // ==========================================
    const modal = qs('#product-modal');
    const closeModalBtn = qs('#close-modal');
    const quoteBtn = qs('#request-quote-btn');
    const contactMessage = qs('#contact-message');
    let selectedProductName = '';

    window.openProductModalById = (id) => {
        const product = allProducts.find(p => p.id === id);
        if (!product || !modal) return;

        selectedProductName = product.name;
        qs('#modal-title').textContent = product.name;
        qs('#modal-img').src = product.image || 'https://via.placeholder.com/600x400/174aa1/ffffff?text=Product';
        qs('#modal-desc').textContent = product.description || '';
        qs('#modal-category').textContent = product.category || 'Commodity';

        const setField = (elemId, contId, val) => {
            const el = qs(elemId);
            const cont = qs(contId);
            if (cont && el) {
                if (val) {
                    cont.style.display = 'flex';
                    el.textContent = val;
                } else {
                    cont.style.display = 'none';
                }
            }
        };

        setField('#modal-origin', '#modal-origin-container', product.origin);
        setField('#modal-types', '#modal-types-container', product.types);
        setField('#modal-applications', '#modal-apps-container', product.applications);
        setField('#modal-packaging', '#modal-pkg-container', product.packaging);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const hideModal = () => {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    // Prefill quote from inside Modal
    if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
            hideModal();
            window.prefillQuote(selectedProductName);
        });
    }

    // Prefill Quote helper
    window.prefillQuote = (productName) => {
        const contactSection = qs('#contact');
        if (contactMessage) {
            contactMessage.value = `Hello Trade Desk,\n\nWe would like to request formal FOB/CIF pricing for: [ ${productName} ].\n- Estimated Quantity (MT/Containers):\n- Target Destination Port:\n- Required Delivery Schedule:\n- Packaging & Stamping Requirements:\n`;
        }
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                if (contactMessage) contactMessage.focus();
            }, 600);
        }
    };

    // ==========================================
    // 8. Dynamic Copyright Year & AOS Init
    // ==========================================
    const yearElem = qs('#current-year');
    if (yearElem) yearElem.textContent = new Date().getFullYear();

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true,
            offset: 40
        });
    }
});
