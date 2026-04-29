// تأكد أن هذا الملف مربوط في أسفل صفحة index.html
document.addEventListener('DOMContentLoaded', () => {
    
    // قاعدة بيانات العملاء
    const clientsDB = {
        "client_emirates": {
            pass: "ame2025",
            name: "Emirates Logistics LLC",
            id: "AME-DXB-771",
            data: { total: 154, transit: 8, delivered: 146 },
            shipments: [
                { id: "TRK-0091", goods: "Industrial Pumps", route: "Dubai > Cairo", status: "In Port" },
                { id: "TRK-0095", goods: "Spare Parts", route: "Sharjah > Alex", status: "On Way" }
            ]
        },
        "client_egypt": {
            pass: "egypt123",
            name: "Al-Masriya Trading",
            id: "AME-CAI-102",
            data: { total: 42, transit: 2, delivered: 40 },
            shipments: [
                { id: "TRK-1100", goods: "Textiles", route: "Damietta > Dubai", status: "Completed" }
            ]
        }
    };

    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            // منع الصفحة من التحديث التلقائي
            e.preventDefault();

            const userField = document.getElementById('username').value.trim();
            const passField = document.getElementById('password').value.trim();

            console.log("Attempting login for:", userField); // للتأكد من البيانات في Console المتصفح

            if (clientsDB[userField]) {
                if (clientsDB[userField].pass === passField) {
                    console.log("Login Successful!");
                    
                    // حفظ بيانات العميل في ذاكرة المتصفح
                    localStorage.setItem('activeClient', JSON.stringify(clientsDB[userField]));
                    
                    // الانتقال لصفحة الداش بورد
                    window.location.href = 'dashboard.html';
                } else {
                    console.error("Wrong Password");
                    showError();
                }
            } else {
                console.error("User Not Found");
                showError();
            }
        });
    }

    function showError() {
        errorMsg.style.display = 'block';
        // إخفاء رسالة الخطأ بعد 3 ثواني تلقائياً
        setTimeout(() => { errorMsg.style.display = 'none'; }, 3000);
    }
});
