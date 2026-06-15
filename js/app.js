document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const modalOverlay = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Modal Elements to populate
    const modalImg = document.getElementById('modal-img');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSpecsList = document.getElementById('modal-specs-list');
    const modalQuoteBtn = document.getElementById('modal-quote-btn');

    let allProducts = [];

    // 1. Fetch JSON Data
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            renderProducts(data);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: #ff4757;">Failed to load products. Please check connection.</p>';
        });

    // 2. Render Products into Grid
    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Clear loading text
        
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'system-card';
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <span class="product-category-badge">${product.category}</span>
                <h3>${product.name}</h3>
                <p>${product.short_desc}</p>
                <button class="system-link">
                    View Details <i class="fas fa-arrow-right"></i>
                </button>
            `;

            // Open Modal on click
            card.addEventListener('click', () => openModal(product));
            
            productsContainer.appendChild(card);
        });
    }

    // 3. Handle Modal Logic
    function openModal(product) {
        // Populate Data
        modalImg.src = product.image;
        modalCategory.textContent = product.category;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.long_desc;
        
        // Populate Specs
        modalSpecsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            modalSpecsList.innerHTML += `
                <li><strong>${key}:</strong> <span>${value}</span></li>
            `;
        }

        // Setup Quote Button Personal Touch
        modalQuoteBtn.onclick = () => {
            closeModal();
            // Scroll to form and auto-fill the subject field
            document.getElementById('contact-subject').value = `Quote Request: ${product.name}`;
            window.location.href = '#contact';
            
            // Smoothly highlight the input field temporarily
            setTimeout(() => {
                const subjectInput = document.getElementById('contact-subject');
                subjectInput.focus();
                subjectInput.style.borderColor = 'var(--primary)';
                subjectInput.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.4)';
            }, 800);
        };

        // Show Modal
        modalOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    // Close Modals on click outside or "X" button
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});
