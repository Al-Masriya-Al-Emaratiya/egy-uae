document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const modalOverlay = document.getElementById('product-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    // Modal Elements
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
            renderProducts(allProducts);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: #ff4757;">Failed to load products. Please ensure you are running on a local server.</p>';
        });

    // 2. Render Products function
    function renderProducts(products) {
        productsContainer.innerHTML = ''; // Clear container
        
        if (products.length === 0) {
            productsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No products found matching your search.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'system-card product-card'; // Added product-card for searching reference
            
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <span class="product-category-badge">${product.category}</span>
                <h3 class="product-name-target">${product.name}</h3>
                <p class="product-desc-target">${product.short_desc}</p>
                <button class="system-link">
                    View Details <i class="fas fa-arrow-right"></i>
                </button>
            `;

            // Click triggers modal
            card.addEventListener('click', () => openModal(product));
            
            productsContainer.appendChild(card);
        });
    }

    // 3. Search Box Logic (Integrated from your code)
    window.searchProducts = function() {
        let input = document.getElementById("searchInput").value.toLowerCase();
        
        // Filter the array based on name or category
        let filteredProducts = allProducts.filter(product => {
            return product.name.toLowerCase().includes(input) || 
                   product.category.toLowerCase().includes(input) || 
                   product.short_desc.toLowerCase().includes(input);
        });
        
        // Re-render
        renderProducts(filteredProducts);
    };

    window.handleEnter = function(event) {
        if (event.key === "Enter") {
            searchProducts();
        } else {
            // Live search as you type
            searchProducts();
        }
    };

    // 4. Modal Logic
    function openModal(product) {
        modalImg.src = product.image;
        modalCategory.textContent = product.category;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.long_desc;
        
        modalSpecsList.innerHTML = '';
        for (const [key, value] of Object.entries(product.specs)) {
            modalSpecsList.innerHTML += `
                <li><strong>${key}:</strong> <span>${value}</span></li>
            `;
        }

        modalQuoteBtn.onclick = () => {
            closeModal();
            // Pre-fill quote form subject
            const subjectField = document.getElementById('contact-subject');
            subjectField.value = `Quote Request: ${product.name} (${product.category})`;
            window.location.href = '#contact';
            
            setTimeout(() => {
                subjectField.focus();
                subjectField.style.borderColor = 'var(--primary)';
                subjectField.style.boxShadow = '0 0 15px rgba(0, 210, 255, 0.4)';
            }, 800);
        };

        modalOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
});
