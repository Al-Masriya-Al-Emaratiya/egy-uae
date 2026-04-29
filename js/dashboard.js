document.addEventListener('DOMContentLoaded', () => {
    const client = JSON.parse(sessionStorage.getItem('activeClient'));

    if(!client) {
        window.location.href = 'index.html';
        return;
    }

    // تعبئة البيانات
    document.getElementById('client-name-title').textContent = `Welcome, ${client.name}`;
    document.getElementById('user-name').textContent = client.name;
    document.getElementById('client-id-label').textContent = `Account ID: ${client.id}`;
    
    document.getElementById('stat-total').textContent = client.data.total;
    document.getElementById('stat-transit').textContent = client.data.transit;
    document.getElementById('stat-delivered').textContent = client.data.delivered;

    const tableBody = document.getElementById('shipment-data');
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

    // خروج
    document.getElementById('logout-btn').addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'index.html';
    });
});
