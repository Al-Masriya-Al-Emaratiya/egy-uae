document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Custom Cursor ---
    const cursor = document.getElementById("cursor");
    if(window.innerWidth > 768) {
        cursor.style.display = "block";
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
        });

        document.querySelectorAll("a, button, .product-card").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.style.width = "60px";
                cursor.style.height = "60px";
                cursor.style.borderColor = "var(--secondary)";
            });
            el.addEventListener("mouseleave", () => {
                cursor.style.width = "40px";
                cursor.style.height = "40px";
                cursor.style.borderColor = "var(--primary)";
            });
        });
    }

    // --- 2. Progress Bar ---
    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("progress-bar").style.width = scrolled + "%";
    });

    // --- 3. Mobile Menu Toggle ---
    const hamburger = document.querySelector(".hamburger");
    const mobileNav = document.querySelector(".mobile-nav");
    const body = document.body;

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileNav.classList.toggle("active");
        body.classList.toggle("no-scroll");
    });

    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            mobileNav.classList.remove("active");
            body.classList.remove("no-scroll");
        });
    });

    // --- 4. 3D Tilt Effect for Products and Hero (تأثير الـ 3D الأساسي) ---
    const cards = document.querySelectorAll(".product-card, .hero-3d-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            // تحديد موقع الماوس داخل البطاقة
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // حساب المركز
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // حساب مقدار الدوران للحصول على شكل الـ 3D
            const rotateX = ((y - centerY) / centerY) * -15; 
            const rotateY = ((x - centerX) / centerX) * 15;
            
            // تطبيق التأثير
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // إعادة البطاقة لوضعها الطبيعي عند خروج الماوس
        card.addEventListener("mouseleave", () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease-out"; 
        });

        // إزالة الـ transition أثناء الحركة لتكون سلسة ومباشرة
        card.addEventListener("mouseenter", () => {
            card.style.transition = "none";
        });
    });

    // --- 5. WhatsApp Quote Request ---
    const quoteButtons = document.querySelectorAll(".quote-btn");
    
    // رقم الواتساب الخاص بك
    const phoneNumber = "201013378572"; 

    quoteButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); // لمنع تداخل الضغطة مع تأثيرات البطاقة الـ 3D
            
            // جلب اسم المنتج من الـ data-product المكتوب في الـ HTML
            const productName = btn.getAttribute("data-product");
            
            // تجهيز نص الرسالة
            const message = `مرحباً شركة المصرية الإماراتية،\nأود الاستفسار وطلب عرض سعر لمنتج: *${productName}*\nوشكراً لكم.`;
            
            // تحويل النص لصيغة تدعمها الروابط
            const encodedMessage = encodeURIComponent(message);
            
            // إنشاء رابط الواتساب
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            
            // فتح الواتساب في نافذة جديدة
            window.open(whatsappUrl, "_blank");
        });
    });
});
