/**
 * Hybrid Tech UI Script
 * Includes: Custom Tech Cursor, Data Streams, Tilt effects, and UI Logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    const qs = (selector) => document.querySelector(selector);
    const qsa = (selector) => document.querySelectorAll(selector);

    // --- 1. Custom Tech Cursor (Crosshair/Square Style) ---
    const cursor = qs('#tech-cursor');
    const follower = qs('#tech-cursor-follower');
    
    // Only activate cursor if not on touch device
    if (window.matchMedia("(pointer: fine)").matches && cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        });

        // Hover effect on interactable elements
        const interactables = qsa('a, button, input, textarea, .faq-question, .dropdown-trigger, .profile-trigger');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.width = '45px';
                follower.style.height = '45px';
                follower.style.borderColor = 'var(--secondary)';
                follower.style.transform = 'translate(-50%, -50%) rotate(45deg)'; // Tech target rotation
                follower.style.backgroundColor = 'rgba(213, 36, 43, 0.05)';
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                follower.style.width = '30px';
                follower.style.height = '30px';
                follower.style.borderColor = 'var(--primary)';
                follower.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                follower.style.backgroundColor = 'transparent';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // --- 2. Reading Progress Bar ---
    const progressBar = qs('#progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // --- 3. Animated Data Streams (Matrix effect) ---
    const linesContainer = qs('.animated-lines-container');
    if (linesContainer) {
        const createLine = () => {
            if (qsa('.data-stream').length > 15) return; // Limit number of streams
            const line = document.createElement('div');
            line.classList.add('data-stream');
            line.style.left = Math.random() * 100 + 'vw';
            line.style.height = (50 + Math.random() * 150) + 'px'; // Random length
            line.style.animationDuration = (3 + Math.random() * 5) + 's'; 
            linesContainer.appendChild(line);
            line.addEventListener('animationend', () => line.remove());
        };
        setInterval(createLine, 400); // Generate streams
    }

    // --- 4. Auth State Logic ---
    function checkLoginState() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const dLogin = qs('#desktop-login-btn');
        const dProfile = qs('#desktop-user-profile');
        const mLogin = qs('#mobile-login-item');
        const mProfile = qs('#mobile-profile-item');

        if (isLoggedIn) {
            if (dLogin) dLogin.classList.add('hidden');
            if (dProfile) dProfile.classList.remove('hidden');
            if (mLogin) mLogin.classList.add('hidden');
            if (mProfile) mProfile.classList.remove('hidden');
        } else {
            if (dLogin) dLogin.classList.remove('hidden');
            if (dProfile) dProfile.classList.add('hidden');
            if (mLogin) mLogin.classList.remove('hidden');
            if (mProfile) mProfile.classList.add('hidden');
        }
    }
    checkLoginState();
    
    // Testing Function to simulate Login
    window.login = function() { localStorage.setItem('isLoggedIn', 'true'); checkLoginState(); }; 

    qsa('#logout-btn, #mobile-logout-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            checkLoginState();
            window.location.href = 'index.html';
        });
    });

    // --- 5. Dropdowns (Profile & Language) ---
    const toggleDropdown = (triggerSelector, containerSelector) => {
        const trigger = qs(triggerSelector);
        const container = qs(containerSelector);
        if (trigger && container) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                container.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) container.classList.remove('active');
            });
        }
    };
    toggleDropdown('#profile-trigger', '.user-profile');
    toggleDropdown('#lang-trigger', '.custom-dropdown');

    // --- 6. Mobile Nav & Sticky Header ---
    const header = qs('#header');
    const sections = qsa('section');
    const navLinks = qsa('.desktop-nav a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 150) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    const hamburger = qs('.hamburger');
    const mobileNav = qs('.mobile-nav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
        qsa('.mobile-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
            });
        });
    }

    // --- 7. FAQ Accordion ---
    qsa('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            qsa('.faq-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- 8. Tech Chat Widget Logic ---
    const chatToggle = qs('#chat-toggle'), chatBox = qs('#chat-box'), chatClose = qs('#chat-close');
    const chatInput = qs('#chat-input'), chatSend = qs('#chat-send'), chatBody = qs('#chat-body');
    
    if (chatToggle) chatToggle.addEventListener('click', () => chatBox.classList.add('active'));
    if (chatClose) chatClose.addEventListener('click', () => chatBox.classList.remove('active'));
    
    const sendMsg = () => {
        const text = chatInput.value.trim();
        if (text) {
            chatBody.innerHTML += `<div class="message outgoing"><p>${text}</p></div>`;
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // AI Simulation Response
            setTimeout(() => {
                chatBody.innerHTML += `<div class="message incoming"><p>Data received securely. A specialist will sync with you shortly.</p></div>`;
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    };
    if (chatSend) chatSend.addEventListener('click', sendMsg);
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMsg(); });

    // Dynamic Year Update
    const yearSpan = qs('#current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 9. Libraries Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }
    
    if (typeof Swiper !== 'undefined' && qs('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            loop: true, 
            autoplay: { delay: 5000 },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    }

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), { 
            max: 5, 
            speed: 400,
            glare: true,
            "max-glare": 0.2
        });
    }
});
// bot
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');
    
    const lang = document.documentElement.lang || 'en';
    
    const basePath = (lang === 'ar') ? 'ar/data/' : 'data/';
    
    let knowledgeBase = {};

    async function initChat() {
        try {
            const files = ['support.json', 'products.json'];
            const promises = files.map(file => fetch(basePath + file).then(res => res.json()));
            const results = await Promise.all(promises);
            knowledgeBase = Object.assign({}, ...results);
            console.log("تم تحميل البيانات بنجاح من مسار:", basePath);
        } catch (e) {
            console.error("خطأ في تحميل ملفات JSON:", e);
        }
    }

    function addMessage(text, type) {
        const div = document.createElement('div');
        div.className = `message ${type}`;
        div.innerHTML = `<p>${text}</p>`;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    chatSend.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (!text) return;
        
        addMessage(text, 'outgoing');
        chatInput.value = '';

        const response = knowledgeBase[text] || (lang === 'ar' ? "عذراً، لم أفهم." : "Sorry, I didn't understand.");
        
        setTimeout(() => addMessage(response, 'incoming'), 500);
    });

    initChat();
});
