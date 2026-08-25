/* ==========================================================================
   AL MASSRIYA AL EMARATIYA - CLIENT ENGINE (LIGHT EXCLUSIVE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // الوظيفة الأساسية لجلب وتحميل ملفات الـ HTML الخارجية
    async function loadComponent(elementId, filePath) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Could not load ${filePath}, status: ${response.status}`);
            }
            const htmlText = await response.text();
            element.innerHTML = htmlText;
        } catch (error) {
            console.error("Error loading component:", error);
        }
    }

    // تشغيل عملية تحميل الهيدر والفوتر بشكل متوازي
    async function initLayout() {
        // إذا كانت الصفحة في مجلد فرعي (مثل pages)، قد تحتاج لتعديل المسار لـ "../header.html"
        // الكود الحالي يفترض أن الصفحات والملفات المشتركة تقع في نفس المستوى الرئيسي.
        let pathPrefix = "";
        if (window.location.pathname.includes("/pages/") || window.location.pathname.includes("/ar/")) {
            pathPrefix = "../";
        }

        await Promise.all([
            loadComponent('header', pathPrefix + 'header.html'),
            loadComponent('footer-placeholder', pathPrefix + 'footer.html')
        ]);

        // بعد اكتمال تحميل المكونات، يتم تفعيل التفاعلات البرمجية المرتبطة بها
        initializeInteractions();
    }

    // دالة تجميع كل العمليات التفاعلية بعد تحميل العناصر في الـ DOM
    function initializeInteractions() {

        // --- Interactive Search System ---
        const searchDatabase = [
            { title: "Food Division", url: "pages/food-division.html", category: "Trade Division", keywords: "food, orange, export, corridor, sharjah" },
            { title: "Hotel Supplies", url: "pages/hotel-supplies.html", category: "Trade Division", keywords: "hotel, premium, sheets, supplies, ports" },
            { title: "Chemicals & Cosmetics", url: "pages/chemicals-cosmetics.html", category: "Trade Division", keywords: "chemicals, cosmetics, safety, alexandria, reach" },
            { title: "OS&E Procurement", url: "pages/ose-procurement.html", category: "Trade Division", keywords: "ose, procurement, sourcing, cargo" },
            { title: "Office Furniture", url: "pages/office-furniture.html", category: "Trade Division", keywords: "office, furniture, hardwood, desk, chairs, damietta" },
            { title: "Banquet Furniture", url: "pages/banquet-furniture.html", category: "Trade Division", keywords: "banquet, furniture, hotel, luxury, stackable" },
            { title: "Metal Beds & Lockers", url: "pages/metal-beds-lockers.html", category: "Trade Division", keywords: "metal, bed, locker, rust, accommodation" },
            { title: "Staff Furniture", url: "pages/staff-furniture.html", category: "Trade Division", keywords: "staff, modular, desk, office" },
            { title: "Staff Sofa Sets", url: "pages/staff-sofa-sets.html", category: "Trade Division", keywords: "sofa, sets, modular, ergonomic" },
            { title: "Logistics & Supply Chain", url: "#services", category: "Service", keywords: "logistics, shipping, supply, cargo" },
            { title: "Freight Forwarding", url: "#services", category: "Service", keywords: "freight, forwarding, air, sea, transport" },
            { title: "Trade Facilitation", url: "#services", category: "Service", keywords: "trade, facilitation, business, entry, advisory" },
            { title: "Customs Clearance", url: "#services", category: "Service", keywords: "customs, clearance, tax, papers" },
            { title: "Transportation Services", url: "#services", category: "Service", keywords: "transport, trucks, shipping, terminal" },
            { title: "Warehousing Solutions", url: "#services", category: "Service", keywords: "warehouse, storage, inventory" },
            { title: "RFQ Desk & Contact", url: "#contact", category: "Support", keywords: "rfq, quote, contact, mail, phone" }
        ];

        const searchInput = document.getElementById('global-search-input');
        const resultsDropdown = document.getElementById('search-results-dropdown');

        if (searchInput && resultsDropdown) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                resultsDropdown.innerHTML = '';

                if (query.length < 2) {
                    resultsDropdown.classList.add('hidden');
                    return;
                }

                const filteredResults = searchDatabase.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.keywords.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );

                if (filteredResults.length === 0) {
                    const emptyItem = document.createElement('div');
                    emptyItem.className = 'search-result-item';
                    emptyItem.innerHTML = `<span class="title">No matches found for "${e.target.value}"</span>`;
                    resultsDropdown.appendChild(emptyItem);
                } else {
                    filteredResults.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        resultItem.innerHTML = `
                            <span class="title">${item.title}</span>
                            <span class="category">${item.category}</span>
                        `;
                        resultItem.addEventListener('click', () => {
                            window.location.href = item.url;
                            resultsDropdown.classList.add('hidden');
                            searchInput.value = '';
                        });
                        resultsDropdown.appendChild(resultItem);
                    });
                }

                resultsDropdown.classList.remove('hidden');
            });

            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !resultsDropdown.contains(e.target)) {
                    resultsDropdown.classList.add('hidden');
                }
            });
        }

        // --- Interactive Divisions Filtering ---
        const filterButtons = document.querySelectorAll('.filter-tab-btn');
        const productCards = document.querySelectorAll('.b2b-product-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hidden-card');
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            card.classList.add('hidden-card');
                            card.style.display = 'none';
                        }, 400);
                    }
                });
            });
        });

        // --- Smooth Anchor Navigation ---
        const allCategoriesBtn = document.getElementById('all-categories-btn');
        if (allCategoriesBtn) {
            allCategoriesBtn.addEventListener('click', () => {
                const divisionsSection = document.getElementById('divisions');
                if (divisionsSection) {
                    divisionsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // --- Mobile Burger Menu Toggle ---
        const hamburger = document.querySelector('.hamburger');
        const mobileNav = document.querySelector('.mobile-nav');

        if (hamburger && mobileNav) {
            hamburger.addEventListener('click', () => {
                mobileNav.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // --- Language Selector Dropdown ---
        const langTrigger = document.getElementById('lang-trigger');
        const langMenu = document.getElementById('lang-menu');

        if (langTrigger && langMenu) {
            langTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                langMenu.classList.toggle('active');
            });
        }

        document.addEventListener('click', () => {
            if (langMenu) langMenu.classList.remove('active');
        });

        // --- Dynamic Automatic Calendar Year ---
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
    }

    // --- تشغيل دالة جلب المكونات كخطوة أولى ---
    initLayout();

    // ==========================================================================
    // بقية الأكواد المستقلة (تعمل دون انتظار الهيدر والفوتر)
    // ==========================================================================

    // --- Custom Interactive Cursor ---
    const cursor = document.getElementById('tech-cursor');
    const follower = document.getElementById('tech-cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
    }

    // --- Window Scroll Progress Indicator ---
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }

        const header = document.getElementById('header');
        if (header) {
            if (winScroll > 50) {
                header.style.padding = '8px 0';
            } else {
                header.style.padding = '15px 0';
            }
        }
    });

    // --- FAQ Accordeon Slide mechanic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parent = question.parentElement;
            parent.classList.toggle('active');
        });
    });

    // --- Init AOS (Animate On Scroll) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120
        });
    }

    // --- Init Swiper Testimonials Slider ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                }
            }
        });
    }

    // --- Init Vanilla Tilt for Dashboard consoles ---
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }

    // --- Quick Sourcing Selection Auto-fill ---
    window.setRFQCategory = function(categoryName) {
        const rfqInput = document.getElementById('rfq-division-subject');
        const contactSection = document.getElementById('contact');
        if (rfqInput) {
            rfqInput.value = `Sourcing inquiry regarding: ${categoryName}`;
        }
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- AI SUPPORT CHAT MECHANICS ---
    const chatToggle = document.getElementById('chat-toggle');
    const chatBox = document.getElementById('chat-box');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    if (chatToggle && chatBox) {
        chatToggle.addEventListener('click', () => chatBox.classList.toggle('active'));
    }
    if (chatClose && chatBox) {
        chatClose.addEventListener('click', () => chatBox.classList.remove('active'));
    }

    const appendMessage = (text, type = 'outgoing') => {
        const msgElement = document.createElement('div');
        msgElement.className = `message ${type}`;
        msgElement.innerHTML = `<p>${text}</p>`;
        if (chatBody) {
            chatBody.appendChild(msgElement);
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    };

    const handleSendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'outgoing');
        chatInput.value = '';

        setTimeout(() => {
            let aiReply = "Connecting queries with Egypt & UAE databases... How may we help you configure your sourcing line?";
            if (text.toLowerCase().includes('food')) {
                aiReply = "Our Food Division specializes in exporting Egyptian citrus, dry goods, and imports to Dubai. Select 'Source Division' in our Directory to directly initialize cargo.";
            } else if (text.toLowerCase().includes('furniture')) {
                aiReply = "We manage high-density bulk cargo for Banquet and Office furniture directly out of premium Damietta ports to UAE hubs.";
            }
            appendMessage(aiReply, 'incoming');
        }, 1000);
    };

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', handleSendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSendMessage();
        });
    }
});
