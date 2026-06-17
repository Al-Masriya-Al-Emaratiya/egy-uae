/**
 * EGY UAE - Dynamic Dashboard Core Engine
 * Handles SPA tab routing and async JSON data rendering
 */

document.addEventListener('DOMContentLoaded', () => {
    let dashboardData = null;

    const DATA_URL = 'data/dashboard.json'; 

    async function loadDashboardContent() {
        try {
            const response = await fetch(DATA_URL);
            if (!response.ok) throw new Error('Failed to fetch dashboard data');
            
            dashboardData = await response.json();
            
            document.getElementById('merchantName').textContent = dashboardData.merchant.name;
            document.getElementById('merchantMeta').innerHTML = `Trader ID: <span>${dashboardData.merchant.id}</span> | Location: <span>${dashboardData.merchant.country}</span>`;
            document.getElementById('accountStatus').innerHTML = `<span class="dot"></span> ${dashboardData.merchant.status}`;

            document.getElementById('stat-total').textContent = String(dashboardData.stats.totalShipments).padStart(2, '0');
            document.getElementById('stat-customs').textContent = String(dashboardData.stats.inCustoms).padStart(2, '0');
            document.getElementById('stat-delivered').textContent = String(dashboardData.stats.delivered).padStart(2, '0');

            renderOverviewTable(dashboardData.overview);
            renderShipmentsTable(dashboardData.shipments);
            renderDocumentsTable(dashboardData.documents);
            renderPaymentsTable(dashboardData.payments);

        } catch (error) {
            console.error('Error rendering dashboard:', error);
            document.getElementById('merchantName').textContent = "Error loading data.";
        }
    }

    function renderOverviewTable(data) {
        const container = document.getElementById('table-overview');
        container.innerHTML = data.map(item => `
            <tr>
                <td><span class="awb">${item.awb}</span></td>
                <td>${item.origin}</td>
                <td>${item.destination}</td>
                <td><span class="badge ${item.statusClass}">${item.status}</span></td>
            </tr>
        `).join('');
    }

    function renderShipmentsTable(data) {
        const container = document.getElementById('table-shipments');
        container.innerHTML = data.map(item => `
            <tr>
                <td><span class="awb">${item.awb}</span></td>
                <td>${item.origin}</td>
                <td>${item.destination}</td>
                <td>${item.weight}</td>
                <td>${item.eta}</td>
                <td><span class="badge ${item.statusClass}">${item.status}</span></td>
            </tr>
        `).join('');
    }

    function renderDocumentsTable(data) {
        const container = document.getElementById('table-documents');
        container.innerHTML = data.map(item => `
            <tr>
                <td><i class="far fa-file-pdf text-red" style="margin-right: 8px;"></i> ${item.name}</td>
                <td><strong>${item.type}</strong></td>
                <td>${item.size}</td>
                <td>${item.date}</td>
                <td><a href="#" class="btn-small" style="font-size:12px; padding:2px 8px; border:1px solid var(--primary);"><i class="fas fa-download"></i> View</a></td>
            </tr>
        `).join('');
    }

    function renderPaymentsTable(data) {
        const container = document.getElementById('table-payments');
        container.innerHTML = data.map(item => `
            <tr>
                <td><strong>${item.invoice}</strong></td>
                <td class="text-white">${item.amount}</td>
                <td>${item.date}</td>
                <td><span class="badge ${item.statusClass}">${item.status}</span></td>
            </tr>
        `).join('');
    }

    const navItems = document.querySelectorAll('.side-nav .nav-item[data-page]');
    const pageSections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            pageSections.forEach(section => section.classList.remove('active-page'));

            item.classList.add('active');
            const targetPage = item.getAttribute('data-page');
            const targetSection = document.getElementById(`page-${targetPage}`);
            
            if (targetSection) {
                targetSection.classList.add('active-page');
            }
        });
    });

    // تشغيل جلب البيانات تلقائياً عند تحميل الواجهة
    loadDashboardContent();
});
