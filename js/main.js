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

        select('a, button, .service-box, .philosophy-item, .team-member, .testimonial-item, .faq-item, input, textarea, .swiper-button-prev, .swiper-button-next, .wa-btn', true).forEach(item => {
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
            // Prevent division by zero if content is too short
            if (totalHeight <= 0) { // Changed to <= 0 to handle very short pages
                progressBar.style.width = '100%';
                return;
            }
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = progress + '%';
        });
    }

    // 3. Animated Lines Background (New)
    const animatedLinesContainer = select('.animated-lines-container');
    if (animatedLinesContainer) {
        const createLine = () => {
            const line = document.createElement('div');
            line.classList.add('animated-line');
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 10 + 's'; // Random start time
            animatedLinesContainer.appendChild(line);

            // Remove line after it finishes animation to prevent DOM clutter
            line.addEventListener('animationend', () => {
                line.remove();
            });
        };

        // Create initial lines
        for (let i = 0; i < 15; i++) { // Adjust number of lines
            createLine();
        }

        // Periodically create new lines
        setInterval(createLine, 1000); // Create a new line every 1 second
    }

    // Ensure body always has 'dark-theme'
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark'); // Force dark theme in local storage

    // 4. Header Scroll Effect (Removed expansion logic)
    // The header CSS has been modified to keep it fixed and consistent.
    // So, no JS needed to change header styles on scroll anymore.

    // 5. Mobile Navigation Toggle (Hamburger)
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

    // 6. 3D Tilt Effect for Hero Section
    const card = select('#tilt-card');
    if (card) {
        // Reduced sensitivity for less extreme tilting
        const tiltIntensityX = 20; 
        const tiltIntensityY = 20;

        document.addEventListener('mousemove', (e) => {
            let xAxis = (window.innerWidth / 2 - e.clientX) / tiltIntensityX;
            let yAxis = (window.innerHeight / 2 - e.clientY) / tiltIntensityY;
            card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;

            select('.hero-3d-card > *', true).forEach(child => {
                const baseZ = parseFloat(child.getAttribute('data-z')) || 0;
                // Stronger parallax effect, but controlled
                const parallaxX = xAxis * 0.4 * (baseZ / 50); 
                const parallaxY = yAxis * 0.4 * (baseZ / 50);
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

    // 7. Smooth Scroll for Navigation Links
    select('header .nav-links a, .mobile-nav a, .footer-links a', true).forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = select(`#${targetId}`);

            if (targetElement) {
                // Header is now fixed and does not change height significantly, so a fixed offset works
                const headerOffset = select('header').offsetHeight; 
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // Add some extra margin

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 8. Active Navigation Link on Scroll
    const sections = select('section', true);
    const mainNavLinks = select('.nav-links li a', true);
    const mobileNavLinks = select('.mobile-nav li a', true);

    const setActiveNav = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = select('header') ? select('header').offsetHeight : 0; // Get header height if it exists
            
            // Adjust offset for better timing, considering fixed header height
            if (scrollY >= (sectionTop - headerHeight - 100)) { 
                current = section.getAttribute('id');
            }
        });

        // Update main navigation
        mainNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });

        // Update mobile navigation
        mobileNavLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); // Set active on initial load

    // 9. FAQ Accordion
    select('.faq-question', true).forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');

            // Close other open FAQ items (optional, but good UX)
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

    // 10. Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true, // Only animate once
        mirror: false, // Do not repeat animation on scroll back up
    });

    // 11. Testimonial Slider (Swiper.js)
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

    // 12. In-page WhatsApp Chat Widget Logic
    const waBtn = select('.whatsapp-widget .wa-btn');
    const chatContainer = select('.whatsapp-widget .chat-container');
    const chatClose = select('.chat-close');
    const chatInput = select('#wa-chat-input');
    const chatSend = select('#wa-chat-send');
    const chatBody = select('.chat-body');

    if (waBtn && chatContainer && chatClose && chatInput && chatSend && chatBody) {
        waBtn.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
            // Prevent body scroll when chat is open on mobile
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
                chatBody.scrollTop = chatBody.scrollHeight; // Scroll to bottom

                // Simulate a reply (optional)
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
