document.addEventListener('DOMContentLoaded', () => {
    // Helper function
    const select = (selector, all = false) => {
        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    };

    // 1. Dynamic Year for Footer
    const yearSpan = select('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Custom 3D Cursor (Desktop Only)
    const cursor = select('#cursor');
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    
    if (cursor && !isTouchDevice) {
        cursor.style.display = 'block';
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('a, button, input, textarea, .service-box, .philosophy-item, .team-member, .testimonial-item, .faq-item, .swiper-button-prev, .swiper-button-next, .dropdown-trigger');
            if (target) {
                cursor.style.width = '60px';
                cursor.style.height = '60px';
                cursor.style.borderColor = 'var(--secondary)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target.closest('a, button, input, textarea, .service-box, .philosophy-item, .team-member, .testimonial-item, .faq-item, .swiper-button-prev, .swiper-button-next, .dropdown-trigger');
            if (target) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.borderColor = 'var(--primary)';
            }
        });
    }

    // 3. Reading Progress Bar
    const progressBar = select('#progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) return;
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // 4. Animated Lines Background
    const animatedLinesContainer = select('.animated-lines-container');
    if (animatedLinesContainer) {
        const createLine = () => {
            if (select('.animated-line', true).length > 20) return; 
            
            const line = document.createElement('div');
            line.classList.add('animated-line');
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 5 + 's';
            line.style.animationDuration = (10 + Math.random() * 10) + 's'; 
            animatedLinesContainer.appendChild(line);

            line.addEventListener('animationend', () => line.remove());
        };

        for (let i = 0; i < 10; i++) createLine();
        setInterval(createLine, 2000);
    }

    // 5. Mobile Navigation Toggle
    const hamburger = select('.hamburger');
    const mobileNav = select('.mobile-nav');
    const navLinks = select('.mobile-nav a', true);

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll', mobileNav.classList.contains('active'));
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // 6. 3D Tilt Effect for Hero Section (Desktop Only)
    const card = select('#tilt-card');
    if (card && !isTouchDevice) {
        const tiltIntensity = 15; 

        document.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.clientX) / tiltIntensity;
            let yAxis = (window.innerHeight / 2 - e.clientY) / tiltIntensity;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

            select('.hero-3d-card > *', true).forEach(child => {
                const baseZ = parseFloat(child.getAttribute('data-z')) || 0;
                child.style.transform = `translateZ(${baseZ}px) translateX(${xAxis * 0.3}px) translateY(${yAxis * 0.3}px)`;
            });
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
            select('.hero-3d-card > *', true).forEach(c => c.style.transition = 'none');
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            select('.hero-3d-card > *', true).forEach(child => {
                child.style.transition = 'all 0.5s ease';
                child.style.transform = `translateZ(${child.getAttribute('data-z') || 0}px)`;
            });
        });
    }

    // 7. Smooth Scroll & Active Nav Update
    const scrollLinks = select('a[href^="#"]', true);
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = select('header') ? select('header').offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - headerOffset - 20, behavior: 'smooth' });
            }
        });
    });

    const sections = select('section', true);
    const allNavLinks = select('.nav-links a, .mobile-nav a', true);
    
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = select('header') ? select('header').offsetHeight : 80;
        
        sections.forEach(section => {
            if (scrollY >= (section.offsetTop - headerHeight - 150)) { 
                current = section.getAttribute('id');
            }
        });

        allNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // 8. FAQ Accordion
    select('.faq-question', true).forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');

            select('.faq-item.active', true).forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    item.querySelector('.faq-answer').style.maxHeight = '0';
                    item.querySelector('.faq-answer').style.paddingTop = '0';
                }
            });

            faqItem.classList.toggle('active');
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
                answer.style.paddingTop = '15px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
            }
        });
    });

    // 9. Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100 });
    }

    // 10. Testimonial Slider
    if (typeof Swiper !== 'undefined' && select('.testimonial-slider')) {
        new Swiper('.testimonial-slider', {
            loop: true,
            grabCursor: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }

    // 11. Chat Widget
    const chatBtn = select('.chat-widget .chat-btn'); 
    const chatContainer = select('.chat-container');
    const chatClose = select('.chat-close');
    const chatInput = select('#chat-input'); 
    const chatSend = select('#chat-send');   
    const chatBody = select('.chat-body');

    if (chatBtn && chatContainer) {
        chatBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active')) chatInput.focus();
        });

        chatClose.addEventListener('click', () => chatContainer.classList.remove('active'));

        const sendMessage = () => {
            const text = chatInput.value.trim();
            if (text) {
                chatBody.innerHTML += `<div class="message outgoing"><p>${text}</p></div>`;
                chatInput.value = '';
                chatBody.scrollTop = chatBody.scrollHeight;

                setTimeout(() => {
                    chatBody.innerHTML += `<div class="message incoming"><p>Thank you! We will reply soon.</p></div>`;
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        };

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    }

    // 12. --- اصلاح جذري لقائمة اللغات (Language Dropdown) ---
    const langDropdown = document.querySelector('.custom-dropdown');
    const langTrigger = document.getElementById('lang-trigger');
    const langMenu = document.getElementById('lang-menu');

    if (langTrigger && langDropdown) {
        // عند النقر على الزر الرئيسي
        langTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // منع انتقال النقرة للـ document
            langDropdown.classList.toggle('open');
        });

        // منع إغلاق القائمة عند النقر داخلها
        if (langMenu) {
            langMenu.addEventListener('click', function(e) {
                e.stopPropagation(); 
            });
        }

        // إغلاق القائمة عند النقر في أي مكان آخر بالصفحة
        document.addEventListener('click', function(e) {
            if (langDropdown.classList.contains('open')) {
                langDropdown.classList.remove('open');
            }
        });
    }
});
