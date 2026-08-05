/**
 * Al Massriya Al Emaratiya - B2B Dynamic Auth & Interface Controllers
 */

document.addEventListener('DOMContentLoaded', () => {

    const qs = (selector) => document.querySelector(selector);
    const qsa = (selector) => document.querySelectorAll(selector);

    const SUPABASE_PROJECT_ID = "yoniptlacaorxqqojdko"; 
    const SUPABASE_URL = `https://yoniptlacaorxqqojdko.supabase.co`;
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbmlwdGxhY2FvcnhxcW9qZGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMzUyOTcsImV4cCI6MjEwMDkxMTI5N30.52jAALxRLC-ZRPWliZUr5TO4EZgSCjqm8UlZcsp7tzo";
    
    let supabaseClient = null;
    try {
        if (typeof supabase !== 'undefined') {
            supabaseClient = supabase.createClient("https://yoniptlacaorxqqojdko.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvbmlwdGxhY2FvcnhxcW9qZGtvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzMzUyOTcsImV4cCI6MjEwMDkxMTI5N30.52jAALxRLC-ZRPWliZUr5TO4EZgSCjqm8UlZcsp7tzo");
        } else {
            console.error("Supabase SDK script failed to load. Authentication offline.");
        }
    } catch (e) {
        console.error("Initialization error inside Supabase Client:", e);
    }

    // --- 2. Custom Tech Cursor Implementation with Smooth Lerping ---
    const cursor = document.getElementById('tech-cursor');
    const follower = document.getElementById('tech-cursor-follower');

    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // تحويل حركة المؤشر مباشرة بشكل سريع
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        });

        // حركة انسيابية ناعمة لتابع مؤشر الماوس
        function updateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.transform = `translate3d(${followerX - 13}px, ${followerY - 13}px, 0)`;
            requestAnimationFrame(updateFollower);
        }
        requestAnimationFrame(updateFollower);

        const interactiveElements = qsa('a, button, .faq-question, .dropdown-trigger, .profile-trigger, input, textarea, .sidebar-menu-list a, .auth-modal-close, .auth-tab-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-interactive');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-interactive');
            });
        });
    }

    // --- 3. B2B RFQ Helper ---
    window.setRFQCategory = function(categoryName) {
        const subjectInput = qs('#rfq-division-subject');
        if (subjectInput) {
            subjectInput.value = `Inquiry: ${categoryName}`;
            const rfqSection = qs('#contact');
            if (rfqSection) {
                rfqSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // --- 4. Interactive Auth Modal Controls ---
    const authModal = qs('#auth-modal');
    const openModalBtns = qsa('#desktop-login-btn, #mobile-login-btn, .trigger-auth-modal');
    const closeModalBtn = qs('#auth-modal-close');
    const authFeedback = qs('#auth-feedback-msg');

    const showFeedback = (text, type = 'error') => {
        if (!authFeedback) return;
        authFeedback.textContent = text;
        authFeedback.className = `auth-feedback ${type}`;
    };

    const clearFeedback = () => {
        if (authFeedback) {
            authFeedback.className = "auth-feedback hidden";
            authFeedback.textContent = "";
        }
    };

    const toggleAuthModal = (state) => {
        if (!authModal) return;
        clearFeedback();
        if (state) {
            authModal.classList.add('active');
        } else {
            authModal.classList.remove('active');
        }
    };

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleAuthModal(true));
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => toggleAuthModal(false));
    }

    // Tab Switching Logic inside Modal
    const tabButtons = qsa('.auth-tab-btn');
    const formTabs = qsa('.auth-form-tab');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            formTabs.forEach(f => f.classList.remove('active'));

            btn.classList.add('active');
            const targetForm = qs(`#${btn.dataset.tab}`);
            if (targetForm) targetForm.classList.add('active');
            clearFeedback();
        });
    });

    // --- 5. Supabase Authentication Core Actions ---
    const signinForm = qs('#signin-form');
    const signupForm = qs('#signup-form');

    // Handle Sign In
    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFeedback();

            const email = qs('#signin-email').value.trim();
            const password = qs('#signin-password').value.trim();

            if (!supabaseClient) {
                showFeedback("Connection pipeline offline. Supabase client failed to initialize.");
                return;
            }

            showFeedback("Authenticating credentials...", "success");

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                showFeedback(error.message, "error");
            } else {
                showFeedback("Access verified successfully! Connecting to dashboard...", "success");
                setTimeout(() => {
                    syncAuthState(data.user);
                    toggleAuthModal(false);
                    signinForm.reset();
                }, 1200);
            }
        });
    }

    // Handle Registration (Sign Up)
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearFeedback();

            const name = qs('#signup-name').value.trim();
            const email = qs('#signup-email').value.trim();
            const password = qs('#signup-password').value.trim();

            if (!supabaseClient) {
                showFeedback("Connection pipeline offline. Supabase client failed to initialize.");
                return;
            }

            showFeedback("Processing credentials...", "success");

            const { data, error } = await supabaseClient.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) {
                showFeedback(error.message, "error");
            } else {
                if (data.session === null) {
                     showFeedback("Account initialization initialized. Please check your email inbox to confirm security nodes.", "success");
                } else {
                     showFeedback("Account built and verified successfully!", "success");
                     setTimeout(() => {
                         syncAuthState(data.user);
                         toggleAuthModal(false);
                         signupForm.reset();
                     }, 1500);
                }
            }
        });
    }

    // Handle Session Logouts
    const logoutBtn = qs('#logout-btn');
    const mobileLogoutBtn = qs('#mobile-logout-btn');

    const handleDisconnect = async (e) => {
        if (e) e.preventDefault();
        if (supabaseClient) {
            await supabaseClient.auth.signOut();
        }
        syncAuthState(null);
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleDisconnect);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener('click', handleDisconnect);

    // Dynamic State Synchronization
    function syncAuthState(user) {
        const dLogin = qs('#desktop-login-btn');
        const dProfile = qs('#desktop-user-profile');
        const mLogin = qs('#mobile-login-item');
        const mProfile = qs('#mobile-profile-item');
        const userDisplayName = qs('#user-display-name');

        if (user) {
            if (dLogin) dLogin.classList.add('hidden');
            if (dProfile) dProfile.classList.remove('hidden');
            if (mLogin) mLogin.classList.add('hidden');
            if (mProfile) mProfile.classList.remove('hidden');

            const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
            if (userDisplayName) userDisplayName.textContent = displayName;
        } else {
            if (dLogin) dLogin.classList.remove('hidden');
            if (dProfile) dProfile.classList.add('hidden');
            if (mLogin) mLogin.classList.remove('hidden');
            if (mProfile) mProfile.classList.add('hidden');
            if (userDisplayName) userDisplayName.textContent = "My Account";
        }
    }

    // آلية المزامنة اللحظية المستمرة (Real-time Session Observer)
    // هذا الجزء يبقي المنصة متزامنة طوال الوقت فور تغيير حالة تسجيل الدخول تلقائياً
    if (supabaseClient) {
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (session) {
                syncAuthState(session.user);
            } else {
                syncAuthState(null);
            }
        });
    }

    // --- 6. Reading Progress Bar ---
    const progressBarNode = qs('#progress-bar');
    if (progressBarNode) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBarNode.style.width = progress + '%';
        });
    }

    // --- 7. Navigation Tracking & Scroll States ---
    const headerNode = qs('#header');
    const sections = qsa('section');
    const navLinks = qsa('.desktop-nav a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) headerNode.classList.add('scrolled');
        else headerNode.classList.remove('scrolled');

        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 200) current = sec.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    });

    // Mobile Navigation Toggle
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

    // --- 8. FAQ Interactive Accordion ---
    qsa('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            qsa('.faq-item').forEach(i => { if (i !== item) i.classList.remove('active'); });
            item.classList.toggle('active');
        });
    });

    // --- 9. Dropdown Triggers ---
    const langTrigger = qs('#lang-trigger');
    const langDropdown = qs('.footer-language.custom-dropdown');
    if (langTrigger && langDropdown) {
        langTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            langDropdown.classList.remove('active');
        });
    }

    const profileTrigger = qs('#profile-trigger');
    const userProfile = qs('#desktop-user-profile');
    if (profileTrigger && userProfile) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfile.classList.toggle('active');
        });
        document.addEventListener('click', () => {
            userProfile.classList.remove('active');
        });
    }

    // --- 10. B2B Chat Widget Logic ---
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
            
            setTimeout(() => {
                chatBody.innerHTML += `<div class="message incoming"><p>System alert: Specifications acknowledged. A trade specialist will review your cargo requirements shortly.</p></div>`;
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    };
    if (chatSend) chatSend.addEventListener('click', sendMsg);
    if (chatInput) chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMsg(); });

    // Dynamic Year Update
    const yearSpan = qs('#current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // --- 11. Libraries Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 50 });
    }
    
    if (typeof Swiper !== 'undefined' && qs('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            loop: true, 
            autoplay: { delay: 6000 },
            pagination: { el: '.swiper-pagination', clickable: true }
        });
    }

    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt-card"), { 
            max: 5, 
            speed: 400,
            glare: true,
            "max-glare": 0.15
        });
    }
});
