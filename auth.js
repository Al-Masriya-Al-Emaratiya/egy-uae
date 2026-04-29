document.addEventListener('DOMContentLoaded', () => {
    
    // هذا هو ملف الـ JSON الخاص بك (يمكنك إضافة أي عدد من العملاء هنا)
    const userMapping = {
        "30604041304577": { 
            "pass": "123456", 
            "target": "eg-30604041304577-dasbhboard.html" 
        },
        "20501012233445": { 
            "pass": "ame77", 
            "target": "eg-20501012233445-dashboard.html" 
        },
        "10020030040050": { 
            "pass": "pass2025", 
            "target": "eg-10020030040050-dashboard.html" 
        }
    };

    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userInp = document.getElementById('username').value.trim();
            const passInp = document.getElementById('password').value.trim();

            console.log("Checking credentials for ID:", userInp);

            // 1. البحث عن المستخدم في الـ JSON
            const userAccount = userMapping[userInp];

            if (userAccount && userAccount.pass === passInp) {
                // 2. إذا كانت البيانات صحيحة، حفظ جلسة الدخول
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUserPath', userAccount.target);
                
                console.log("Success! Redirecting to:", userAccount.target);

                // 3. التوجيه الفوري للمجلد الخاص به
                window.location.href = userAccount.target;
            } else {
                // بيانات خاطئة
                errorMsg.style.display = 'block';
                setTimeout(() => { errorMsg.style.display = 'none'; }, 3000);
            }
        });
    }
});
