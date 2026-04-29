document.addEventListener('DOMContentLoaded', () => {
    
    // بيانات التجربة - تأكد من كتابتها بدقة
    const clientsDB = {
        "info@egy-uae.com": "123", // يوزر: admin | باسور: 123
        "digital@egy-uae.com": "ame2025" // يوزر: ame_user | باسور: ame2025
    };

    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // منع التحديث التلقائي للمتصفح
            event.preventDefault();

            const user = document.getElementById('username').value.trim();
            const pass = document.getElementById('password').value.trim();

            console.log("Login Attempt:", user); // للمراقبة

            // التحقق من صحة البيانات
            if (clientsDB[user] && clientsDB[user] === pass) {
                console.log("Success! Redirecting...");
                
                // حفظ اسم العميل ليعرفه الداش بورد
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('clientUsername', user);

                // الانتقال لصفحة الداش بورد
                window.location.href = "dashboard.html";
            } else {
                console.log("Failed Login");
                errorMsg.style.display = 'block';
                // إخفاء رسالة الخطأ بعد 3 ثواني
                setTimeout(() => { errorMsg.style.display = 'none'; }, 3000);
            }
        });
    }
});
