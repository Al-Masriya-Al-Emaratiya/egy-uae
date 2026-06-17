/**
 * EGY UAE - Core SPA Engine (Demo Edition)
 * Dynamically fetches JSON profiles and updates interface layout seamlessly.
 */

document.addEventListener('DOMContentLoaded', () => {
    const CONFIG_DATA_PATH = 'data/dashboard.json';

    async function initializeDashboard() {
        try {
            const response = await fetch(CONFIG_DATA_PATH);
            if (!response.ok) throw new Error('Demo data stream failed to initialize.');
            
            const data = await response.json();
            
            document.getElementById('merchantName').textContent = data.merchant.name;
            document.getElementById('merchantMeta').innerHTML = `Trader ID: <span>${data.merchant.id}</span> | Terminal: <span>${data.merchant.country}</span>`;
            
            document.getElementById('stat-total').textContent = String(data.stats.totalShipments).padStart(2, '0');
            document.getElementById('stat-customs').textContent = String(data.stats.inCustoms).padStart(2, '0');
            document.getElementById('stat-delivered').textContent = String(data.stats.delivered).padStart(2, '0');

            buildOverview(data.overview);
            buildShipments(data.shipments);
            buildDocuments(data.documents);
            buildPayments(data.payments);

        } catch (error) {
            console.error('SPA Engine Exception:', error);
            document.getElementById('merchantName').textContent = "Demo Mode: Active Profile Container";
        }
    }

    function buildOverview(items) {
        const target = document.getElementById('table-overview');
        target.innerHTML = items.map(i => `
            <tr>
                <td><span class="awb">${i.awb}</span></td>
                <td>${i.origin}</td>
                <td>${i.destination}</td>
                <td><span class="badge ${i.statusClass}">${i.status}</span></td>
            </tr>
        `).join('');
    }

    function buildShipments(items) {
        const target = document.getElementById('table-shipments');
        target.innerHTML = items.map(i => `
            <tr>
                <td><span class="awb">${i.awb}</span></td>
                <td>${i.origin}</td>
                <td>${i.destination}</td>
                <td>${i.weight}</td>
                <td>${i.eta}</td>
                <td><span class="badge ${i.statusClass}">${i.status}</span></td>
            </tr>
        `).join('');
    }

    function buildDocuments(items) {
        const target = document.getElementById('table-documents');
        target.innerHTML = items.map(i => `
            <tr>
                <td><i class="far fa-file-alt" style="color: #174388; margin-right:6px;"></i> ${i.name}</td>
                <td><strong>${i.type}</strong></td>
                <td>${i.size}</td>
                <td>${i.date}</td>
                <td><a href="#" class="action-link"><i class="fas fa-external-link-alt"></i> View</a></td>
            </tr>
        `).join('');
    }

    function buildPayments(items) {
        const target = document.getElementById('table-payments');
        target.innerHTML = items.map(i => `
            <tr>
                <td><strong>${i.invoice}</strong></td>
                <td style="font-weight: 600; color: #174388;">${i.amount}</td>
                <td>${i.date}</td>
                <td><span class="badge ${i.statusClass}">${i.status}</span></td>
            </tr>
        `).join('');
    }

    const navButtons = document.querySelectorAll('.side-nav .nav-item[data-page]');
    const dashboardSections = document.querySelectorAll('.page-section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            
            navButtons.forEach(b => b.classList.remove('active'));
            dashboardSections.forEach(s => s.classList.remove('active-page'));

            btn.classList.add('active');
            const targetPage = btn.getAttribute('data-page');
            const targetDomSection = document.getElementById(`page-${targetPage}`);
            
            if (targetDomSection) {
                targetDomSection.classList.add('active-page');
            }
        });
    });

    // إطلاق محرك جلب البيانات
    initializeDashboard();
});
