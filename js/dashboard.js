document.addEventListener('DOMContentLoaded', () => {
    // جلب البيانات من localStorage
    const clientData = localStorage.getItem('activeClient');

    if (!clientData) {
        // إذا لم يجد بيانات دخول، يرجعه لصفحة Login
        window.location.href = 'index.html';
        return;
    }

    const client = JSON.parse(clientData);

    // تحديث الواجهة بالبيانات
    document.getElementById('client-name-title').textContent = `Welcome, ${client.name}`;
    document.getElementById('user-name').textContent = client.name;
    document.getElementById('client-id-label').textContent = `Account ID: ${client.id}`;
    
    document.getElementById('stat-total').textContent = client.data.total;
    document.getElementById('stat-transit').textContent = client.data.transit;
    document.getElementById('stat-delivered').textContent = client.data.delivered;

    const tableBody = document.getElementById('shipment-data');
    tableBody.innerHTML = ""; // مسح الجدول قبل الملء
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

    // زر تسجيل الخروج
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('activeClient');
            window.location.href = 'index.html';
        });
    }
});
