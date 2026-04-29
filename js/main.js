document.addEventListener('DOMContentLoaded', () => {
    // Helper function for custom cursor and element selection
    const select = (selector, all = false) => {
        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
    };

    // 1. Custom 3D Cursor
    const cursor = select('#cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        select('a, button, .service-box, .philosophy-item, .team-member, .testimonial-item, .faq-item, input, textarea, .swiper-button-prev, .swiper-button-next, .chat-btn', true).forEach(item => { // Updated selector
            item.addEventListener('mouseenter', () => {
                cursor.style.width = '80px';
                cursor.style.height = '80px';
                cursor.style.background = 'rgba(0, 210, 255, 0.1)';
                cursor.style.borderColor = 'transparent';
            });
            item.addEventListener('mouseleave', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.background = 'transparent';
                cursor.style.borderColor = 'var(--primary)';
            });
        });
    }

    // 2. Reading Progress Bar
    const progressBar = select('#progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.body.scrollHeight - window.innerHeight;
            if (totalHeight <= 0) { 
                progressBar.style.width = '100%';
                return;
            }
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // 3. Animated Lines Background
    const animatedLinesContainer = select('.animated-lines-container');
    if (animatedLinesContainer) {
        const createLine = () => {
            const line = document.createElement('div');
            line.classList.add('animated-line');
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 10 + 's';
            line.style.animationDuration = (10 + Math.random() * 10) + 's'; // Random duration for varied speed
            animatedLinesContainer.appendChild(line);

            line.addEventListener('animationend', () => {
                line.remove();
            });
        };

        for (let i = 0; i < 15; i++) {
            createLine();
        }

        setInterval(createLine, 1000);
    }

    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark'); 

    // 4. Mobile Navigation Toggle (Hamburger)
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

    // 5. 3D Tilt Effect for Hero Section
    const card = select('#tilt-card');
    if (card) {
        const tiltIntensityX = 15; // Slightly less intense
        const tiltIntensityY = 15;

        document.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.clientX) / tiltIntensityX;
            let yAxis = (window.innerHeight / 2 - e.clientY) / tiltIntensityY;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

            select('.hero-3d-card > *', true).forEach(child => {
                const baseZ = parseFloat(child.getAttribute('data-z')) || 0;
                const parallaxX = xAxis * 0.3 * (baseZ / 50); // Adjusted parallax
                const parallaxY = yAxis * 0.3 * (baseZ / 50);
                child.style.transform = `translateZ(${baseZ}px) translateX(${parallaxX}px) translateY(${parallaxY}px)`;
            });
        });

        document.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
            select('.hero-3d-card > *', true).forEach(child => {
                child.style.transition = 'none';
            });
        });
        document.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s ease';
            card.style.transform = `rotateY(0deg) rotateX(0deg)`;
            select('.hero-3d-card > *', true).forEach(child => {
                child.style.transition = 'all 0.5s ease';
                const baseZ = parseFloat(child.getAttribute('data-z')) || 0;
                child.style.transform = `translateZ(${baseZ}px) translateX(0px) translateY(0px)`;
            });
        });
    }

    // 6. Smooth Scroll for Navigation Links
    select('header .nav-links a, .mobile-nav a, .footer-links a', true).forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Check if it's an internal anchor link (starts with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = select(`#${targetId}`);

                if (targetElement) {
                    const headerOffset = select('header').offsetHeight; 
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = elementPosition - headerOffset - 20;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // For external language links, allow default behavior
        });
    });

    // 7. Active Navigation Link on Scroll
    const sections = select('section', true);
    const mainNavLinks = select('.nav-links li a', true);
    const mobileNavLinks = select('.mobile-nav li a', true);

    const setActiveNav = () => {
        let current = '';
        const headerHeight = select('header') ? select('header').offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - headerHeight - 100)) { 
                current = section.getAttribute('id');
            }
        });

        mainNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });

        mobileNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    // 8. FAQ Accordion
    select('.faq-question', true).forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
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
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '15px';
            } else {
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0';
            }
        });
    });

    // 9. Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true, 
        mirror: false,
    });

    // 10. Testimonial Slider (Swiper.js)
    const swiper = new Swiper('.testimonial-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 30,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        },
    });

    // 11. In-page Chat Widget Logic (Renamed from WhatsApp)
    const chatBtn = select('.chat-widget .chat-btn'); // Updated selector
    const chatContainer = select('.chat-widget .chat-container');
    const chatClose = select('.chat-close');
    const chatInput = select('#chat-input'); // Updated ID
    const chatSend = select('#chat-send');   // Updated ID
    const chatBody = select('.chat-body');

    if (chatBtn && chatContainer && chatClose && chatInput && chatSend && chatBody) {
        chatBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
            if (window.innerWidth <= 768) { 
                document.body.classList.toggle('no-scroll', chatContainer.classList.contains('active'));
            }
            if (chatContainer.classList.contains('active')) {
                chatInput.focus();
            }
        });

        chatClose.addEventListener('click', () => {
            chatContainer.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });

        const sendMessage = () => {
            const messageText = chatInput.value.trim();
            if (messageText) {
                const messageDiv = document.createElement('div');
                messageDiv.classList.add('message', 'outgoing');
                messageDiv.innerHTML = `<p>${messageText}</p>`;
                chatBody.appendChild(messageDiv);
                chatInput.value = '';
                chatBody.scrollTop = chatBody.scrollHeight;

                setTimeout(() => {
                    const replyDiv = document.createElement('div');
                    replyDiv.classList.add('message', 'incoming');
                    replyDiv.innerHTML = `<p>Thank you for your message! We'll get back to you shortly.</p>`;
                    chatBody.appendChild(replyDiv);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1500);
            }
        };

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = select('#current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
