// Dynamic JavaScript file for Al Massriya Al Emaratiya Wholesale Portal
// Managing search, filters, state, tier-based prices, custom admin panel, and Ajax Formspree posting.

const DEFAULT_PRODUCTS = [
  {
    "id": "ame-f01",
    "sku": "ARB-OUDL-SET2",
    "nameAr": "طقم عطر وبخاخ جسم عود الليل - قطعتين",
    "nameEn": "Oud Al Layl Perfume & Body Spray Set - 2 Pcs",
    "category": "Perfumes",
    "image": "images/ARB-OUDL-SET2.jpg", 
    "packAr": "دسته (علبة تحتوى قطعتين)",
    "retailPrice": 698,
    "wholesalePrice": 586,
    "bulkPrice": 550,
    "wholesaleMinQty": 10,
    "bulkMinQty": 40,
    "unitAr": "دسته",
    "descriptionAr": "العلامة التجارية: Arabiyat by My Perfumes (عربيات من ماي برفيومز).\n- الإصدار: Oud Al Layl (عود الليل).\n- محتويات الطقم:\n- عطر (Eau de Parfum) حجم 100 مل.\n- بخاخ معطر للجسم (Perfume Spray) حجم 200 مل.\n- الفئة المستهدفة: للجنسين.",
    "stockQty": 1250
  },
  {
    "id": "ame-f02",
    "sku": "SKU-ROY-DKH",
    "nameAr": "تمور خلاص إماراتية ملكية فاخرة",
    "nameEn": "Royal UAE Khalas Supreme Dates",
    "category": "food",
    "image": "🌴",
    "packAr": "كرتونة تحتوي على 8 علب × 1 كجم",
    "retailPrice": 1400,
    "wholesalePrice": 1180,
    "bulkPrice": 1050,
    "wholesaleMinQty": 12,
    "bulkMinQty": 48,
    "unitAr": "كرتونة",
    "descriptionAr": "تمور منتقاة من أجود مزارع النخيل في دولة الإمارات.\n- حلاوة طبيعية متوازنة وقوام ناعم ومثالي.\n- معبأة بإحكام لضمان الحفاظ على طراوتها الفائقة.\n- خيار ممتاز للضيافة والتقديم الفاخر.",
    "stockQty": 850
  },
  {
    "id": "ame-f03",
    "sku": "SKU-PUN-OIL",
    "nameAr": "زيت عباد الشمس نقي ممتاز (بالمين)",
    "nameEn": "Pure Sunflower Oil Premium",
    "category": "food",
    "image": "🌻",
    "packAr": "كرتونة تحتوي على 6 زجاجات × 1.5 لتر",
    "retailPrice": 980,
    "wholesalePrice": 890,
    "bulkPrice": 840,
    "wholesaleMinQty": 15,
    "bulkMinQty": 50,
    "unitAr": "كرتونة",
    "descriptionAr": "زيت طهي نقي وطبيعي مئة بالمئة.\n- خالي تماماً من الكوليسترول لتحضير وجبات صحية.\n- مكرر ومصفى مرتين لأعلى درجات النقاء واللمعان.\n- نقطة تدخين مرتفعة ممتازة للقلي والطهي السريع.",
    "stockQty": 1600
  },
  {
    "id": "ame-h01",
    "sku": "SKU-LCH-S10",
    "nameAr": "ملايات فنادق قطن قطيفة 100% كينج",
    "nameEn": "Luxury Hotel Bed Sheets 100% Cotton",
    "category": "hotel",
    "image": "🛏️",
    "packAr": "حزمة من 10 ملايات مقاس ملكي 240×260",
    "retailPrice": 4800,
    "wholesalePrice": 4100,
    "bulkPrice": 3600,
    "wholesaleMinQty": 5,
    "bulkMinQty": 15,
    "unitAr": "حزمة",
    "descriptionAr": "مفروشات فاخرة للفنادق والمنتجعات ذات الخمس نجوم.\n- قطن مصري طويل التيلة ١٠٠٪ بنعومة فائقة.\n- مقاومة عالية للكسر والبهتان وغسيل الصناعي والكلور.\n- حاشية معززة وخياطة مزدوجة لمتانة استثنائية.",
    "stockQty": 340
  },
  {
    "id": "ame-h02",
    "sku": "SKU-GEL-B10",
    "nameAr": "كراسي قاعات وحفلات مذهبة ثقيلة",
    "nameEn": "Heavy-Duty Gilded Banquet Chairs",
    "category": "hotel",
    "image": "🪑",
    "packAr": "طقم مكون من 10 كراسي فولاذية مذهبة",
    "retailPrice": 13500,
    "wholesalePrice": 11900,
    "bulkPrice": 10800,
    "wholesaleMinQty": 4,
    "bulkMinQty": 12,
    "unitAr": "طقم",
    "descriptionAr": "كراسي مؤتمرات وقاعات حفلات فاخرة ومريحة.\n- هيكل صلب وفولاذي ثقيل مطلي بطبقة تذهيب حراري مضادة للخدوش.\n- حشوة دبل إسفنجية عالية الكثافة ومقاومة للاهتراء والانضغاط.\n- تصميم قابل للتكديس والترتيب لتوفير المساحة بالمخازن.",
    "stockQty": 180
  },
  {
    "id": "ame-c01",
    "sku": "SKU-IND-C25",
    "nameAr": "منظف كيميائي سائل للمغاسل والمطابخ",
    "nameEn": "Industrial Multi-Surface Liquid Cleanser",
    "category": "chemicals",
    "image": "🧪",
    "packAr": "برميل صناعي أزرق سعة 25 لتر",
    "retailPrice": 920,
    "wholesalePrice": 790,
    "bulkPrice": 710,
    "wholesaleMinQty": 8,
    "bulkMinQty": 25,
    "unitAr": "برميل",
    "descriptionAr": "تركيبة نشطة تجارية عالية الكفاءة والقوة.\n- تزيل أصعب الدهون، البقع، والترسبات الكلسية بمثالية.\n- تركيبة هيدروكسيدية معززة ومطهرة للأسطح.\n- مركزة للغاية لتمنح قيمة توفير فائقة بعد تخفيفها بالماء.",
    "stockQty": 420
  },
  {
    "id": "ame-c02",
    "sku": "SKU-ALC-S70",
    "nameAr": "مستحضر معقم الكحول الفاخر (رغوي)",
    "nameEn": "Royal Foaming Hand Sanitizer Bulk",
    "category": "chemicals",
    "image": "🧴",
    "packAr": "كرتونة تحتوي على 4 جالونات × 5 لتر",
    "retailPrice": 1250,
    "wholesalePrice": 1050,
    "bulkPrice": 960,
    "wholesaleMinQty": 10,
    "bulkMinQty": 30,
    "unitAr": "كرتونة",
    "descriptionAr": "معقم ميكروبي كحولي رغوي آمن ولطيف على البشرة.\n- نسبة كحول إيثيلي نقي ٧٠٪ للحماية من الجراثيم والفيروسات.\n- معزز بخلاصة الجلسرين لمنع جفاف وتهيج الأيدي.\n- مثالي لمحطات التوزيع والموزعات الآلية بالفنادق والمطارات.",
    "stockQty": 550
  },
  {
    "id": "ame-u01",
    "sku": "SKU-MBN-B01",
    "nameAr": "سرير عمال حديدي دورين ثقيل",
    "nameEn": "Heavy-Duty Metal Double Bunk Bed",
    "category": "furniture",
    "image": "🛌",
    "packAr": "هيكل واحد حديد سميك مقاوم للاهتزاز",
    "retailPrice": 4600,
    "wholesalePrice": 3950,
    "bulkPrice": 3500,
    "wholesaleMinQty": 10,
    "bulkMinQty": 35,
    "unitAr": "هيكل",
    "descriptionAr": "سرير عمال حديدي دورين فائق القوة والصلابة.\n- مصنع بالكامل من حديد كربوني مقاوم للاهتراء والالتواء والصدأ.\n- دعامات تسليح إضافية لمنع الاهتزاز والأصوات المزعجة.\n- مطلي حرارياً بطبقة مقاومة للرطوبة والبكتيريا.",
    "stockQty": 290
  },
  {
    "id": "ame-u02",
    "sku": "SKU-MTL-L06",
    "nameAr": "خزائن عمال معدنية 6 فتحات مع قفل",
    "nameEn": "6-Compartment Reinforced Metal Locker",
    "category": "furniture",
    "image": "🗄️",
    "packAr": "وحدة تخزين واحدة منفصلة بقفل أمان",
    "retailPrice": 5800,
    "wholesalePrice": 5100,
    "bulkPrice": 4600,
    "wholesaleMinQty": 5,
    "bulkMinQty": 15,
    "unitAr": "وحدة",
    "descriptionAr": "خزائن تخزين صلبة آمنة متعددة الفتحات.\n- مقسمة إلى ٦ فتحات مستقلة متسعة مع فتحات تهوية صحية.\n- هيكل ملحوم شديد الصلابة ومقاوم للصدمات والخدش.\n- مزيج حماية حديدي ثلاثي النقاط مع حلقة قفل للامتعة الشخصية.",
    "stockQty": 140
  }
];

// Load Products from LocalStorage if available (to retain admin edits locally)
let PRODUCTS = JSON.parse(localStorage.getItem('AME_LOCAL_PRODUCTS')) || DEFAULT_PRODUCTS;

// Cart State Tracker
const cart = {};
let activeCategory = "all";
let activeSearchQuery = "";
let adminUnlocked = false;
let editingProductId = null; // Track if we are editing an existing item

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupEventListeners();
    updateCartUI();
    renderAdminProductsList();
});

// Setup Events
function setupEventListeners() {
    // Search input
    document.getElementById("product-search").addEventListener("input", (e) => {
        activeSearchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Category buttons
    const catButtons = document.querySelectorAll(".category-btn");
    catButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            catButtons.forEach(b => {
                b.classList.remove("active", "bg-brandBlue", "text-white", "border-brandBlue");
                b.classList.add("text-slate-600", "bg-white", "border-slate-200");
            });
            btn.classList.add("active", "bg-brandBlue", "text-white", "border-brandBlue");
            btn.classList.remove("text-slate-600", "bg-white", "border-slate-200");
            
            activeCategory = btn.getAttribute("data-category");
            renderProducts();
        });
    });

    // Form Submit to Formspree
    const orderForm = document.getElementById("formspree-order-form");
    orderForm.addEventListener("submit", handleOrderSubmit);
}

// Get tier information
function calculateTier(product, qty) {
    if (qty >= product.bulkMinQty) {
        return { price: product.bulkPrice, label: "جملة الجملة", tier: 3 };
    } else if (qty >= product.wholesaleMinQty) {
        return { price: product.wholesalePrice, label: "جملة", tier: 2 };
    } else {
        return { price: product.retailPrice, label: "قطاعي", tier: 1 };
    }
}

// Robust function to handle dynamic web link images, relative paths, or emojis
function getImageHTML(imageSrc, name) {
    if (!imageSrc || imageSrc.length <= 4) {
        // Fallback for short emoji codes
        return `<span class="text-5xl select-none">${imageSrc || '📦'}</span>`;
    } else {
        // Standard full width image with error handling fallback to emoji
        return `<img src="${imageSrc}" alt="${name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.onerror=null; this.parentNode.innerHTML='<span class=\'text-5xl\'>📦</span>';">`;
    }
}

// Render Products Grid
function renderProducts() {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    const filtered = PRODUCTS.filter(p => {
        const matchesCategory = activeCategory === "all" || p.category === activeCategory;
        const matchesSearch = p.nameAr.toLowerCase().includes(activeSearchQuery) || p.nameEn.toLowerCase().includes(activeSearchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full py-12 text-center text-slate-400 bg-white border border-slate-200">
            <i class="fa fa-cubes text-3xl mb-2 block text-slate-300"></i>لا توجد منتجات مطابقة في هذا التصنيف.
        </div>`;
        return;
    }

    filtered.forEach(p => {
        const cartQty = cart[p.id] || 0;
        const currentTier = calculateTier(p, cartQty > 0 ? cartQty : 1);
        const imageHTML = getImageHTML(p.image, p.nameAr);

        const card = document.createElement("div");
        card.className = "bg-white border border-slate-200 flex flex-col justify-between transition hover:shadow-md relative group product-card overflow-hidden";
        
        card.innerHTML = `
            <div>
                <!-- Large Image Container at the Top of Card -->
                <div class="product-img-frame bg-slate-50 relative overflow-hidden flex items-center justify-center">
                    ${imageHTML}
                    <span class="absolute top-3 left-3 text-[9px] uppercase font-black text-brandBlue bg-white/90 backdrop-blur px-2 py-0.5 border border-slate-200/50 shadow-sm">${p.category}</span>
                </div>
                
                <div class="p-4 sm:p-5">
                    <div class="flex gap-2 mb-1.5 text-[10px] items-center text-slate-400 font-mono">
                        <span>${p.sku}</span>
                        <span>•</span>
                        <span class="${p.stockQty > 50 ? 'text-emerald-600' : 'text-amber-600'} font-bold">متاح: ${p.stockQty || 0}</span>
                    </div>
                    
                    <h4 class="font-display font-bold text-slate-800 text-sm sm:text-base mb-1 leading-tight">${p.nameAr}</h4>
                    <p class="text-slate-400 text-[10px] sm:text-[11px] mb-2 font-mono">${p.nameEn}</p>
                    <p class="text-[11px] sm:text-xs text-slate-500 leading-relaxed mb-4 whitespace-pre-line">${p.descriptionAr}</p>
                    
                    <!-- Package details -->
                    <div class="bg-blue-50/50 p-2.5 border border-dashed border-blue-200 mb-4 text-[11px]">
                        <div class="flex justify-between text-slate-600 font-bold">
                            <span>نوع التعبئة المتاحة:</span>
                            <span class="text-slate-800">${p.packAr}</span>
                        </div>
                    </div>

                    <!-- Price Tiers Display -->
                    <div class="grid grid-cols-3 gap-1 p-1.5 bg-slate-50 mb-1.5 border border-slate-100 text-center font-bold">
                        <div class="text-[9px] sm:text-[10px] p-1 border-r border-slate-200/60 leading-tight">
                            <span class="text-slate-400 block font-normal">تجزئة</span>
                            <span class="text-slate-600 font-black">${p.retailPrice} ج.م</span>
                            <span class="text-[8px] sm:text-[9px] text-slate-400 block font-medium">(1 - ${p.wholesaleMinQty - 1})</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] p-1 border-r border-slate-200/60 leading-tight">
                            <span class="text-brandBlue block font-black">جملة</span>
                            <span class="text-brandBlue font-black">${p.wholesalePrice} ج.م</span>
                            <span class="text-[8px] sm:text-[9px] text-slate-400 block font-medium">(${p.wholesaleMinQty} - ${p.bulkMinQty - 1})</span>
                        </div>
                        <div class="text-[9px] sm:text-[10px] p-1 leading-tight">
                            <span class="text-brandRed block font-black">جملة الكبرى</span>
                            <span class="text-brandRed font-black">${p.bulkPrice} ج.م</span>
                            <span class="text-[8px] sm:text-[9px] text-slate-400 block font-medium">(≥ ${p.bulkMinQty})</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Add to Cart Interactive controls -->
            <div class="border-t border-slate-100 p-4 sm:p-5 bg-slate-50/30">
                ${cartQty === 0 ? `
                    <button onclick="changeQty('${p.id}', 1)" class="w-full bg-slate-900 text-white text-xs py-2.5 hover:bg-brandBlue transition font-bold flex items-center justify-center gap-1.5">
                        <i class="fa fa-cart-plus"></i> إضافة للسلة وتعيين الكمية
                    </button>
                ` : `
                    <div class="flex items-center justify-between gap-2 bg-slate-100 p-1">
                        <button onclick="changeQty('${p.id}', ${cartQty - 1})" class="bg-white hover:bg-slate-200 transition text-slate-800 px-3 py-1 font-bold">-</button>
                        <div class="text-center">
                            <span class="text-xs font-black text-slate-800">${cartQty} ${p.unitAr}</span>
                            <span class="text-[9px] text-yellow-600 font-extrabold block">${currentTier.label}</span>
                        </div>
                        <button onclick="changeQty('${p.id}', ${cartQty + 1})" class="bg-white hover:bg-slate-200 transition text-slate-800 px-3 py-1 font-bold">+</button>
                    </div>
                `}
            </div>
        `;
        grid.appendChild(card);
    });
}

// Change Quantity handler
window.changeQty = function(id, qty) {
    if (qty <= 0) {
        delete cart[id];
    } else {
        cart[id] = qty;
    }
    renderProducts();
    updateCartUI();
};

// Update Cart Sidebar
function updateCartUI() {
    const emptyView = document.getElementById("empty-cart-view");
    const container = document.getElementById("cart-items-container");
    const counts = document.getElementById("cart-item-count");
    const calculations = document.getElementById("cart-summary-calculations");

    container.innerHTML = "";
    const cartEntries = Object.entries(cart);
    counts.innerText = `${cartEntries.length} أصناف`;

    if (cartEntries.length === 0) {
        emptyView.classList.remove("hidden");
        container.classList.add("hidden");
        calculations.classList.add("hidden");
        return;
    }

    emptyView.classList.add("hidden");
    container.classList.remove("hidden");
    calculations.classList.remove("hidden");

    let subtotal = 0;
    let savings = 0;

    cartEntries.forEach(([id, qty]) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (product) {
            const currentTier = calculateTier(product, qty);
            const itemTotal = currentTier.price * qty;
            subtotal += itemTotal;
            savings += (product.retailPrice - currentTier.price) * qty;

            const cartItem = document.createElement("div");
            cartItem.className = "flex gap-3 justify-between items-center border-b border-slate-100 pb-3";
            cartItem.innerHTML = `
                <div>
                    <h5 class="font-display font-bold text-xs text-slate-800 leading-tight">${product.nameAr}</h5>
                    <div class="flex gap-2 items-center text-[10px] text-indigo-700 font-extrabold mt-1">
                        <span class="bg-indigo-50 border border-indigo-100 px-1 py-0.2">${qty} ${product.unitAr}</span>
                        <span class="bg-slate-100 px-1 text-slate-600">${currentTier.label}</span>
                    </div>
                </div>
                <div class="text-left">
                    <span class="text-xs font-bold text-slate-800 block">${itemTotal.toLocaleString()} ج.م</span>
                    <button onclick="changeQty('${product.id}', 0)" class="text-[10px] text-slate-400 hover:text-brandRed font-bold"><i class="fa fa-trash"></i></button>
                </div>
            `;
            container.appendChild(cartItem);
        }
    });

    const tax = subtotal * 0.14;
    const grandTotal = subtotal + tax;

    document.getElementById("subtotal-display").innerText = `${subtotal.toLocaleString()} ج.م`;
    document.getElementById("tax-display").innerText = `${tax.toLocaleString()} ج.م`;
    document.getElementById("savings-display").innerText = `${savings.toLocaleString()} ج.م`;
    document.getElementById("final-total-display").innerText = `${grandTotal.toLocaleString()} ج.م`;

    // Populate the hidden forms inputs to pass to Formspree safely
    document.getElementById("form-total-price").value = `${grandTotal.toLocaleString()} ج.م`;
}

// Submit checkout form via fetch AJAX
async function handleOrderSubmit(e) {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
        alert("سلتك فارغة تماماً! برجاء تعبئة بعض الكميات أولاً.");
        return;
    }

    const submitBtn = document.getElementById("submit-btn");
    const loader = document.getElementById("submit-loader");
    const successMsg = document.getElementById("success-message");

    submitBtn.classList.add("hidden");
    loader.classList.remove("hidden");

    // Construct raw order summary
    let summaryText = "=== طلب تجارة جملة عبر صفحة GitHub ===\n";
    summaryText += "الاسم المشتري: " + document.getElementById("form-name").value + "\n";
    summaryText += "الهاتف: " + document.getElementById("form-phone").value + "\n";
    summaryText += "البريد الإلكتروني: " + document.getElementById("form-email").value + "\n";
    summaryText += "مقر التسليم: " + document.getElementById("form-location").value + "\n";
    summaryText += "رقم السجل: " + document.getElementById("form-reg").value + "\n";
    summaryText += "الملاحظات: " + document.getElementById("form-notes").value + "\n\n";
    summaryText += "--- تفاصيل السلع ---\n";

    Object.entries(cart).forEach(([id, qty]) => {
        const p = PRODUCTS.find(item => item.id === id);
        if (p) {
            const info = calculateTier(p, qty);
            summaryText += `- ${p.nameAr} | الكمية: ${qty} ${p.unitAr} | السعر لليونت: ${info.price} ج.م (${info.label}) | الإجمالي: ${(info.price * qty).toLocaleString()} ج.م\n`;
        }
    });

    try {
        const payload = {
            merchantName: document.getElementById("form-name").value,
            phone: document.getElementById("form-phone").value,
            email: document.getElementById("form-email").value,
            location: document.getElementById("form-location").value,
            businessNo: document.getElementById("form-reg").value,
            notes: document.getElementById("form-notes").value,
            OrderSummary: summaryText
        };

        const response = await fetch("https://formspree.io/f/xlgyeagk", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            successMsg.classList.remove("hidden");
            // Clear cart
            for (let member in cart) delete cart[member];
            updateCartUI();
            renderProducts();
            document.getElementById("formspree-order-form").reset();
        } else {
            alert("حدث خطأ في الإرسال. يرجى مراجعة الاتصال ومعاودة المحاولة.");
            submitBtn.classList.remove("hidden");
        }
    } catch (err) {
        console.error(err);
        alert("تعذر الاتصال بخوادم الإرسال حالياً.");
        submitBtn.classList.remove("hidden");
    } finally {
        loader.classList.add("hidden");
    }
}

/* ==========================================
   ADMIN PORTAL LOCAL STORAGE ENGINE (تحديث: إضافة وضع التعديل)
   ========================================== */

// Toggle Admin Visibility with a Password Prompt
window.toggleAdminPanel = function() {
    const adminPanel = document.getElementById("admin-panel-content");
    const toggleBtn = document.getElementById("admin-toggle-btn");

    if (!adminUnlocked) {
        const password = prompt("برجاء إدخال رقم المرور السري للمشرف:");
        if (password === "1743") { // الباسورد الافتراضي
            adminUnlocked = true;
            adminPanel.classList.remove("hidden");
            toggleBtn.innerText = "إغلاق لوحة الإشراف";
            alert("مرحباً بك! تم إلغاء قفل لوحة التحكم بنجاح.");
        } else {
            alert("رمز المرور خاطئ! يرجى المحاولة مرة أخرى.");
        }
    } else {
        adminPanel.classList.add("hidden");
        toggleBtn.innerText = "فتح لوحة الإشراف";
        adminUnlocked = false;
        cancelProductEdit();
    }
};

// Handle both Add and Edit Form submissions
window.adminAddOrUpdateProduct = function(event) {
    event.preventDefault();
    
    const idValue = document.getElementById("admin-id").value.trim();

    const productData = {
        id: idValue,
        sku: document.getElementById("admin-sku").value.trim(),
        nameAr: document.getElementById("admin-nameAr").value.trim(),
        nameEn: document.getElementById("admin-nameEn").value.trim(),
        category: document.getElementById("admin-category").value,
        image: document.getElementById("admin-image").value.trim(),
        packAr: document.getElementById("admin-packAr").value.trim(),
        unitAr: document.getElementById("admin-unitAr").value.trim(),
        retailPrice: Number(document.getElementById("admin-retailPrice").value),
        wholesalePrice: Number(document.getElementById("admin-wholesalePrice").value),
        bulkPrice: Number(document.getElementById("admin-bulkPrice").value),
        wholesaleMinQty: Number(document.getElementById("admin-wholesaleMinQty").value),
        bulkMinQty: Number(document.getElementById("admin-bulkMinQty").value),
        descriptionAr: document.getElementById("admin-descriptionAr").value.trim(),
        stockQty: 100
    };

    if (editingProductId) {
        // Mode: EDIT
        const index = PRODUCTS.findIndex(p => p.id === editingProductId);
        if (index !== -1) {
            PRODUCTS[index] = productData;
            alert("تم تعديل بيانات المنتج بنجاح في المعاينة الفورية!");
        }
        cancelProductEdit();
    } else {
        // Mode: ADD
        if (PRODUCTS.some(p => p.id === productData.id)) {
            alert("خطأ: هذا المعرف (ID) مستخدم بالفعل لمنتج آخر!");
            return;
        }
        PRODUCTS.push(productData);
        alert("تمت إضافة المنتج بنجاح للمعاينة الفورية!");
    }

    saveProductsState();
    document.getElementById("admin-add-product-form").reset();
};

// Start Edit Mode
window.startProductEdit = function(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    editingProductId = id;

    // Fill the inputs
    document.getElementById("admin-id").value = product.id;
    document.getElementById("admin-id").readOnly = true; // Lock ID to prevent reference breaks
    document.getElementById("admin-id").classList.add("bg-slate-950", "text-slate-500");
    
    document.getElementById("admin-sku").value = product.sku;
    document.getElementById("admin-nameAr").value = product.nameAr;
    document.getElementById("admin-nameEn").value = product.nameEn;
    document.getElementById("admin-category").value = product.category;
    document.getElementById("admin-image").value = product.image;
    document.getElementById("admin-packAr").value = product.packAr;
    document.getElementById("admin-unitAr").value = product.unitAr;
    document.getElementById("admin-retailPrice").value = product.retailPrice;
    document.getElementById("admin-wholesalePrice").value = product.wholesalePrice;
    document.getElementById("admin-bulkPrice").value = product.bulkPrice;
    document.getElementById("admin-wholesaleMinQty").value = product.wholesaleMinQty;
    document.getElementById("admin-bulkMinQty").value = product.bulkMinQty;
    document.getElementById("admin-descriptionAr").value = product.descriptionAr;

    // Change Form Header and Button status
    document.getElementById("admin-form-title").innerText = `تعديل بيانات المنتج الحالي: (${product.id})`;
    document.getElementById("admin-submit-btn").className = "w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 font-bold rounded";
    document.getElementById("admin-submit-btn").innerHTML = `<i class="fa-solid fa-pen-to-square"></i> حفظ وتحديث بيانات المنتج`;
    document.getElementById("admin-cancel-edit-btn").classList.remove("hidden");

    // Scroll smoothly to form
    document.getElementById("admin-form-title").scrollIntoView({ behavior: 'smooth' });
};

// Cancel Edit Mode
window.cancelProductEdit = function() {
    editingProductId = null;
    document.getElementById("admin-id").readOnly = false;
    document.getElementById("admin-id").classList.remove("bg-slate-950", "text-slate-500");
    document.getElementById("admin-add-product-form").reset();

    document.getElementById("admin-form-title").innerText = "إضافة منتج جديد فوري";
    document.getElementById("admin-submit-btn").className = "w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 font-bold rounded";
    document.getElementById("admin-submit-btn").innerHTML = `<i class="fa fa-plus"></i> إضافة المنتج للمعاينة الفورية`;
    document.getElementById("admin-cancel-edit-btn").classList.add("hidden");
};

// Save Products state to local storage
function saveProductsState() {
    localStorage.setItem('AME_LOCAL_PRODUCTS', JSON.stringify(PRODUCTS));
    renderProducts();
    renderAdminProductsList();
}

// Delete product from active list
window.adminDeleteProduct = function(id) {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذا المنتج؟")) {
        PRODUCTS = PRODUCTS.filter(p => p.id !== id);
        if (editingProductId === id) {
            cancelProductEdit();
        }
        saveProductsState();
    }
};

// Render list in administration for deletion and modification
function renderAdminProductsList() {
    const listContainer = document.getElementById("admin-products-list");
    listContainer.innerHTML = "";

    PRODUCTS.forEach(p => {
        const item = document.createElement("div");
        item.className = "flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 border border-slate-800 p-3 text-xs rounded gap-3";
        
        // Show brief preview including the product's image
        const isUrl = p.image.length > 4;
        const previewImage = isUrl 
            ? `<img src="${p.image}" class="w-8 h-8 object-cover rounded border border-slate-700" onerror="this.outerHTML='📦'">` 
            : `<span class="w-8 h-8 flex items-center justify-center bg-slate-800 text-sm rounded">${p.image || '📦'}</span>`;

        item.innerHTML = `
            <div class="flex items-center gap-3">
                ${previewImage}
                <div>
                    <h5 class="font-bold text-white leading-tight">${p.nameAr}</h5>
                    <span class="text-[9px] text-slate-500 font-mono">${p.id} | ${p.sku} | ${p.retailPrice} ج.م</span>
                </div>
            </div>
            <div class="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button onclick="startProductEdit('${p.id}')" class="bg-amber-950/80 text-amber-400 hover:bg-amber-800 hover:text-white px-3 py-1.5 text-[10px] font-bold rounded flex items-center gap-1">
                    <i class="fa-solid fa-pen-to-square"></i> تعديل
                </button>
                <button onclick="adminDeleteProduct('${p.id}')" class="bg-red-950 text-red-400 hover:bg-red-800 hover:text-white px-3 py-1.5 text-[10px] font-bold rounded flex items-center gap-1">
                    <i class="fa-solid fa-trash-can"></i> حذف
                </button>
            </div>
        `;
        listContainer.appendChild(item);
    });
}

// Export the JSON code to copy-paste directly to JS file
window.exportProductsCode = function() {
    const codeSnippet = `const PRODUCTS = ${JSON.stringify(PRODUCTS, null, 2)};`;
    
    navigator.clipboard.writeText(codeSnippet).then(() => {
        alert("تم نسخ الكود المحدث بالكامل لمحافظتك بنجاح!\nقم بفتح ملف 'shop.js' في حسابك على GitHub، واستبدل مصفوفة PRODUCTS بالكامل بالكود المنسوخ لحفظ المنتجات بشكل دائم.");
    }).catch(err => {
        console.error("Could not copy code", err);
        alert("تعذر نسخ الكود تلقائياً. يرجى التحقق من صلاحيات متصفحك.");
    });
};

// Reset products state back to hardcoded default values
window.resetToDefaults = function() {
    if (confirm("هل أنت متأكد من حذف تعديلاتك والعودة للمنتجات الافتراضية؟")) {
        localStorage.removeItem('AME_LOCAL_PRODUCTS');
        PRODUCTS = [...DEFAULT_PRODUCTS];
        cancelProductEdit();
        renderProducts();
        renderAdminProductsList();
        alert("تمت استعادة المنتجات الأساسية بنجاح.");
    }
};
