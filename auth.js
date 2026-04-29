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
if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('username').value;
        const pass = document.getElementById('password').value;

        if(clientsDB[user] && clientsDB[user].pass === pass) {
            sessionStorage.setItem('activeClient', JSON.stringify(clientsDB[user]));
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('error-message').style.display = 'block';
        }
    });
}
