document.addEventListener('DOMContentLoaded', () => {
    // 1. التحقق من وجود بيانات دخول
    const clientData = localStorage.getItem('activeClient');

    if (!clientData) {
        // إذا لم يسجل دخول يرجع لصفحة البوابة portal.html
        window.location.href = 'portal.html';
        return;
    }

    const client = JSON.parse(clientData);

    // 2. تحديث البيانات في الصفحة
    document.getElementById('client-name-title').textContent = `Welcome, ${client.name}`;
    document.getElementById('user-name').textContent = client.name;
    document.getElementById('client-id-label').textContent = `Account ID: ${client.id}`;
    
    document.getElementById('stat-total').textContent = client.data.total;
    document.getElementById('stat-transit').textContent = client.data.transit;
    document.getElementById('stat-delivered').textContent = client.data.delivered;

    // 3. ملء جدول الشحنات
    const tableBody = document.getElementById('shipment-data');
    if(tableBody) {
        tableBody.innerHTML = ""; 
        client.shipments.forEach(s => {
            tableBody.innerHTML += `
                <tr>
                    <td><b style="color:var(--primary)">${s.id}</b></td>
                    <td>${s.goods}</td>
                    <td>${s.route}</td>
                    <td><span class="status-tag">${s.status}</span></td>
                </tr>
            `;
        });
    }

    // 4. زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('activeClient'); // مسح البيانات
            window.location.href = 'portal.html'; // الرجوع للبوابة
        });
    }
});
