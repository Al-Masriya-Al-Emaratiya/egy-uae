document.addEventListener('DOMContentLoaded', () => {
    // التحقق من حالة الدخول
    const loginStatus = localStorage.getItem('isLoggedIn');
    const clientName = localStorage.getItem('clientUsername');

    if (loginStatus !== 'true') {
        // إذا لم يسجل دخول، ارجع للبوابة فوراً
        window.location.href = "portal.html";
        return;
    }

    // إذا كان الكود وصل هنا، يعني الدخول صحيح
    console.log("Dashboard Loaded for client:", clientName);
    
    // باقي كود ملء البيانات هنا...
    if(document.getElementById('user-name')) {
        document.getElementById('user-name').textContent = clientName.toUpperCase();
    }
});
