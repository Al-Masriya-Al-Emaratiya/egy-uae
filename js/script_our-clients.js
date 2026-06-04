// 6. Mobile Navigation Toggle
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
