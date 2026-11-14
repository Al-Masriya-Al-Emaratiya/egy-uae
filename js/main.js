

(function () {
  "use strict";

  const SLIDE_INTERVAL_MS = 5500;
  let currentHeroIndex = 0;
  let heroTimer = null;

  // 1. Auto-Rotating Hero Banners
  const heroPillars = [
    {
      eyebrow: "AL MASSRIYA AL EMARATIYA FOR COMMERCIAL AGENCIES, IMPORT & EXPORT",
      badge: "ONE-STOP SOURCING HUB",
      bgImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      title: "Where Global Supply Meets Manufacturing Excellence",
      subtitle:
        "Delivering highest quality Customized Furniture, Bed & Bath Linens, 4–5 Star Hotel OS&E & FF&E Procurement, Staff Housing, Food Products, Chemicals & Cosmetics across Egypt, Gulf Countries, and Worldwide.",
      cardHeading: "End-to-End Turnkey Procurement",
      cardDesc:
        "From raw materials and bespoke woodwork manufactured in 10th of Ramadan City to international hospitality delivery."
    },
    {
      eyebrow: "10TH OF RAMADAN MANUFACTURING FACILITIES",
      badge: "BESPOKE WOOD & TEXTILES",
      bgImg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      title: "Precision Furniture & Luxury Linen Manufacturing",
      subtitle:
        "In-house fabrication in PLY, MDF, Veneer & Solid Wood paired with 4–5 Star hotel and hospital grade bed sheets, duvets, towels, and bathrobes.",
      cardHeading: "10th of Ramadan Production",
      cardDesc:
        "Full customization across bedroom suites, wardrobes (1–4 doors), reception desks, gypsum/wooden partitions, and textile linens."
    },
    {
      eyebrow: "HOSPITALITY & STAFF ACCOMMODATION",
      badge: "4–5 STAR HOSPITALITY",
      bgImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      title: "4–5 Star Hotel OS&E, FF&E & Staff Housing",
      subtitle:
        "A true one-stop sourcing partner covering guestroom electronics, kitchenware, glassware, banquet seating, bunk beds, and housekeeping trolleys.",
      cardHeading: "Hospitality & Accommodation Ready",
      cardDesc:
        "Supplying complete hotel openings, hospital expansions, and large-scale workforce staff housing projects."
    },
    {
      eyebrow: "FOOD DIVISION, CHEMICALS & COSMETICS",
      badge: "IMPORT & EXPORT TRADE",
      bgImg: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=900&q=80",
      title: "Food Raw Materials, Chemicals & Cosmetics Trade",
      subtitle:
        "Supplying dairy and chocolate factories with cocoa powder, milk powder, oils, butter, starch, and nuts alongside fresh/frozen produce and branded welcome kits.",
      cardHeading: "Global Commercial Agencies",
      cardDesc:
        "Connecting manufacturers and hospitality operators across Egypt, Sharjah, the GCC, and global markets."
    }
  ];

  // 2. Services Data (8 Divisions with Real Photos)
  const servicesData = [
    {
      index: "01",
      cat: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      title: "Customized Furniture Manufacturer",
      desc: "Bespoke production in PLY, MDF, Veneer, and Solid Wood for bedrooms, reception desks, partitions, and carpentry."
    },
    {
      index: "02",
      cat: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      title: "Bed & Bath Linens Manufacturer",
      desc: "Premium bed sheets, duvets, pillow covers, towels, bathrobes, and table linens for 4–5 star hotels & hospitals."
    },
    {
      index: "03",
      cat: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      title: "Staff Housing Furnishing",
      desc: "Turnkey accommodation packages: metal & wooden bunk beds, lockers, mattresses, appliances & welcome baskets."
    },
    {
      index: "04",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      title: "Office Furnishing & Decoration",
      desc: "Complete supply and installation of executive desks, ergonomic chairs, workstations, and interior partitions."
    },
    {
      index: "05",
      cat: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      title: "OS&E & FF&E for 4–5 Star Hotels",
      desc: "One-stop sourcing of F&B equipment, kitchenware, glassware, chinaware, minibars, safes, and spa supplies."
    },
    {
      index: "06",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=800&q=80",
      title: "Cosmetics, Perfumes & Chemicals",
      desc: "Commercial distribution and sourcing of industrial chemicals, cosmetics, fragrances, and branded hygiene kits."
    },
    {
      index: "07",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      title: "Educational Furniture",
      desc: "Ergonomic student desks and classroom seating systems (SC4101, SC4001, SC4001 X, SC4001D) for institutions."
    },
    {
      index: "08",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=80",
      title: "Food Division & Raw Materials",
      desc: "Raw materials for dairy and chocolate factories (cocoa, milk powder, butter, oils, nuts) plus fresh & frozen produce."
    }
  ];

  // 3. Complete Product Catalog (9 Categories with Real Photos)
  const catalogData = [
    {
      id: "custom-furniture",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      tag: "Customized Furniture",
      title: "Custom Woodwork & Room Suites",
      description:
        "Furniture manufactured in PLY, MDF, Veneer & Solid Wood, tailored for hotels, staff quarters, and commercial interiors.",
      items: [
        "Furniture made in PLY, MDF, Veneer & Solid Wood",
        "Beds (Single, Queen & King)",
        "Night Stands & Dressing Tables",
        "Writing Tables & Dining Tables",
        "Wardrobes (1, 2, 3 & 4 Doors)",
        "Headboards (Plain & Custom Design)",
        "TV Stands, Shelves, Tables & Desks",
        "Bookcases & Reception Desks",
        "Partitions (Gypsum & Wooden)",
        "Other Carpentry Jobs on Site"
      ]
    },
    {
      id: "ffe-procurement",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      tag: "FF&E Procurement",
      title: "Soft Furnishings, Mattresses & Drapery",
      description:
        "Complete FF&E installation packages including blackout curtains, commercial upholstery, and orthopedic bedding.",
      items: [
        "Complete Supply & Installation of Office Furniture",
        "Blackout – Lined Drapery & Sheer Curtains",
        "Upholstery (Fabric, PVC & Leather)",
        "Roll-Away Beds",
        "Bunk Beds (Wooden, Metal & Iron)",
        "Mattresses (Medicated & Orthopedic)",
        "Carpets and Area Rugs"
      ]
    },
    {
      id: "linens-mfg",
      category: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      tag: "Linen Manufacturer",
      title: "Hotel & Hospital Bed & Bath Linens",
      description:
        "Durable, high-thread-count bed and bath linens supplied to 4 and 5 star hotels and healthcare institutions.",
      items: [
        "Bed Sheets (Spread / Flat / Fitted)",
        "Duvets & Duvet Covers",
        "Pillows & Pillow Covers",
        "Table Covers & Placemats",
        "Mattress Protectors, Bed Skirts & Bed Runners",
        "Decorative Throws & Blankets",
        "Towels (Face, Hand & Bath)",
        "Bathrobes & Guest Slippers"
      ]
    },
    {
      id: "housekeeping-ops",
      category: "linens",
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
      tag: "Housekeeping",
      title: "Housekeeping & Operational Equipment",
      description:
        "Operational equipment engineered to streamline room turnover, laundry logistics, and guest convenience.",
      items: [
        "Hangers & Non-Woven Bags",
        "Laundry Bags & Shower Curtains",
        "Room Amenities & Amenity Trays",
        "Luggage Racks & Luggage Carts",
        "Maids Carts & Linen Carts / Trolleys",
        "Pedal Bins & Room Bins",
        "Weighing Scales & Mirrors",
        "Iron Boards, Hair Dryers & Bath Rugs"
      ]
    },
    {
      id: "ose-procurement",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      tag: "OS&E Procurement",
      title: "Multi-Brand Hotel & Institutional OS&E",
      description:
        "Comprehensive sourcing across all major brands for hospitality, medical, kitchen, spa, and AV departments.",
      items: [
        "F&B Equipment & Kitchen Equipment",
        "Housekeeping & Laundry Equipment",
        "Medical Items (All Brands)",
        "AV and Electronics Equipment (All Brands)",
        "Spa Equipment & Supplies (All Brands)",
        "Shelving & Storage Systems",
        "Pool Equipment & Health Club Equipment",
        "Engineering Tools & Cleaning Equipment"
      ]
    },
    {
      id: "hotel-supplies",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
      tag: "Hotel Supplies",
      title: "Tableware, Guest Electronics & Security",
      description:
        "Front-of-house dining collections and in-room guest security & refreshment hardware.",
      items: [
        "Glassware (Wine, Water, Cocktail & Tumblers)",
        "Flatware & Stainless Cutlery",
        "Hollowware & Buffet Serving Sets",
        "Chinaware (Plates, Bowls & Cups)",
        "In-Room Digital Electronic Safes",
        "Silent Minibars & Guest Refrigerators",
        "Employee & Guest Lockers",
        "Janitorial Housekeeping Carts"
      ]
    },
    {
      id: "office-edu-banquet",
      category: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      tag: "Office, Edu & Banquet",
      title: "Workstations, Classrooms & Events",
      description:
        "Ergonomic office seating, modular desks, banquet event furniture, and school desk systems (SC4101–SC4001D).",
      items: [
        "Executive Leather & Mesh Ergonomic Chairs",
        "Modular Workstations, Cubicles & Executive Desks",
        "Banquet Stackable Chairs & Folding Tables",
        "Round Cocktail Tables, Table Trolleys & Portable Stages",
        "Lecterns & Portable Dance Floors",
        "Educational Desk & Chair Sets (SC4101, SC4001, SC4001 X, SC4001D)",
        "Multi-Door Colored & Steel Office Lockers"
      ]
    },
    {
      id: "staff-housing",
      category: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
      tag: "Staff Housing",
      title: "Workforce Quarters, Metal Beds & Appliances",
      description:
        "Complete residential furnishing packages with metal bunk beds, steel cupboards, sofa sets, and white goods.",
      items: [
        "Wooden-Iron Beds & Wooden-Iron Bunk Beds",
        "Heavy-Duty Metal Single & Bunk Beds",
        "MDF Beds with Storage Drawers & Divan Beds",
        "MDF Wardrobes & Steel Cupboards / Multi-Door Lockers",
        "Sofa Sets, Reclining Chairs & Coffee/TV Units",
        "Home Appliances, White Goods & Kitchen Utensils",
        "Youth & Single Study Desk Room Sets"
      ]
    },
    {
      id: "food-chemicals-baskets",
      category: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80",
      tag: "Food & Cosmetics",
      title: "Food Raw Materials, Chemicals & Baskets",
      description:
        "Dairy & chocolate factory raw materials, imported fresh/frozen produce, industrial chemicals, and branded welcome kits.",
      items: [
        "Cocoa Powder & Milk Powder for Factories",
        "Industrial Oils, Butter, Starch (Cherch) & All Kinds of Nuts",
        "Fresh & Frozen Imported Vegetables and Fruits",
        "Cosmetics, Perfumes & Commercial Chemicals",
        "Male Branded Welcome Basket (15-item personal & snack kit)",
        "Female Branded Welcome Basket (13-item personal & snack kit)"
      ]
    }
  ];

  const foodChipsData = [
    "Cocoa Powder",
    "Milk Powder",
    "Industrial & Vegetable Oils",
    "Butter",
    "Starch (Cherch)",
    "All Kinds of Nuts",
    "Fresh Vegetables & Fruits",
    "Frozen Vegetables & Fruits"
  ];

  const basketItemsData = {
    male: [
      "Small Detergent & Small Soap",
      "Small Moisturizing Cream & Shampoo",
      "Body Spray & Cosmetics",
      "Toothpaste with Toothbrush",
      "Razor & Shaving Cream",
      "Mineral Water, Juice, Biscuits, Chocolate & Chips",
      "Small Toilet Roll"
    ],
    female: [
      "Small Detergent & Small Soap",
      "Small Moisturizing Cream & Shampoo",
      "Body Spray",
      "Toothpaste & Toothbrush",
      "Mineral Water & Juice",
      "Biscuits, Chocolate & Chips",
      "Small Toilet Roll"
    ]
  };

  const clientsData = [
    { name: "Al Maha Hotel Sharjah", sector: "hospitality" },
    { name: "Radisson Blu Hotels", sector: "hospitality" },
    { name: "Grand Hotels", sector: "hospitality" },
    { name: "Oceanic Hotel", sector: "hospitality" },
    { name: "Rotana Hotel", sector: "hospitality" },
    { name: "Alhaiat Hotel Group Sharjah", sector: "hospitality" },
    { name: "Lords Hotel", sector: "hospitality" },
    { name: "Hotel Holiday International Sharjah", sector: "hospitality" },
    { name: "Arzaq Company", sector: "trading" },
    { name: "Arzaq General Trading", sector: "trading" },
    { name: "Excellence Hotel Supply", sector: "trading" },
    { name: "Middle East Hotel Supplies", sector: "trading" },
    { name: "Luxurious General Trading", sector: "trading" },
    { name: "Blessing General Trading", sector: "trading" },
    { name: "El Massriya El Emaratiya Partner Network", sector: "trading" },
    { name: "Sharjah University", sector: "institutions" },
    { name: "Sky Dive", sector: "institutions" },
    { name: "Al Ahly Club", sector: "institutions" }
  ];

  const sectorLabels = {
    hospitality: "Hotels & Hospitality",
    trading: "General Trading & Supply",
    institutions: "University, Sports & Leisure"
  };

  // DOM Elements
  const heroSection = document.getElementById("heroSection");
  const heroBgImage = document.getElementById("heroBgImage");
  const heroSlideStage = document.getElementById("heroSlideStage");
  const heroTabs = document.querySelectorAll(".hero-tab");
  const servicesGrid = document.getElementById("servicesGrid");
  const catalogGrid = document.getElementById("catalogGrid");
  const clientsGrid = document.getElementById("clientsGrid");

  // Auto-Rotating Hero Logic
  function goToHeroSlide(idx) {
    currentHeroIndex = (idx + heroPillars.length) % heroPillars.length;
    const slide = heroPillars[currentHeroIndex];

    heroSlideStage.classList.add("is-transitioning");
    heroBgImage.classList.add("is-fading");

    heroTabs.forEach((t, i) => {
      const active = i === currentHeroIndex;
      t.classList.remove("is-active");
      // Force reflow so the progress bar restarts cleanly
      void t.offsetWidth;
      if (active) t.classList.add("is-active");
      t.setAttribute("aria-selected", String(active));
    });

    setTimeout(() => {
      heroBgImage.src = slide.bgImg;
      document.getElementById("heroCardImg").src = slide.cardImg;
      document.getElementById("heroEyebrow").textContent = slide.eyebrow;
      document.getElementById("heroCardBadge").textContent = slide.badge;
      document.getElementById("heroDynamicTitle").textContent = slide.title;
      document.getElementById("heroDynamicSubtitle").textContent = slide.subtitle;
      document.getElementById("heroCardHeading").textContent = slide.cardHeading;
      document.getElementById("heroCardDesc").textContent = slide.cardDesc;

      heroSlideStage.classList.remove("is-transitioning");
      heroBgImage.classList.remove("is-fading");
    }, 180);
  }

  function startHeroAutoPlay() {
    stopHeroAutoPlay();
    heroTimer = setInterval(() => {
      goToHeroSlide(currentHeroIndex + 1);
    }, SLIDE_INTERVAL_MS);
  }

  function stopHeroAutoPlay() {
    if (heroTimer) {
      clearInterval(heroTimer);
      heroTimer = null;
    }
  }

  heroTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      goToHeroSlide(Number(tab.dataset.heroIndex));
      startHeroAutoPlay();
    });
  });

  document.getElementById("heroPrevBtn").addEventListener("click", () => {
    goToHeroSlide(currentHeroIndex - 1);
    startHeroAutoPlay();
  });

  document.getElementById("heroNextBtn").addEventListener("click", () => {
    goToHeroSlide(currentHeroIndex + 1);
    startHeroAutoPlay();
  });

  heroSection.addEventListener("mouseenter", () => {
    heroSection.classList.add("is-paused");
    stopHeroAutoPlay();
  });

  heroSection.addEventListener("mouseleave", () => {
    heroSection.classList.remove("is-paused");
    startHeroAutoPlay();
  });

  // Render Services
  function renderServices() {
    servicesGrid.innerHTML = servicesData
      .map(
        (s) => `
      <article class="service-card" data-jump-cat="${s.cat}">
        <div class="service-card__media">
          <img src="${s.img}" alt="${s.title}" loading="lazy" />
          <span class="service-card__index">${s.index}</span>
        </div>
        <div class="service-card__body">
          <div class="service-card__head">
            <h3>${s.title}</h3>
            <span class="service-card__arrow">&nearr;</span>
          </div>
          <p>${s.desc}</p>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Render Catalog
  function renderCatalog(filter) {
    const list =
      filter === "all"
        ? catalogData
        : catalogData.filter((item) => item.category === filter);

    catalogGrid.innerHTML = list
      .map(
        (item) => `
      <article class="catalog-card">
        <div class="catalog-card__media">
          <img src="${item.img}" alt="${item.title}" loading="lazy" />
        </div>
        <div class="catalog-card__body">
          <div>
            <div class="catalog-card__meta">
              <span class="tag">${item.tag}</span>
              <span class="catalog-card__count">${item.items.length} Specifications</span>
            </div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="catalog-card__preview">
              ${item.items
                .slice(0, 3)
                .map((spec) => `<span class="mini-chip">${spec}</span>`)
                .join("")}
            </div>
          </div>
          <button class="catalog-card__btn" type="button" data-open-product="${item.id}">
            Inspect Full Specifications &rarr;
          </button>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Render Food & Basket Spotlight
  function renderSpotlight() {
    document.getElementById("foodChips").innerHTML = foodChipsData
      .map((chip) => `<span>${chip}</span>`)
      .join("");

    document.getElementById("maleBasketList").innerHTML = basketItemsData.male
      .map((li) => `<li>${li}</li>`)
      .join("");

    document.getElementById("femaleBasketList").innerHTML = basketItemsData.female
      .map((li) => `<li>${li}</li>`)
      .join("");
  }

  // Render Clients
  function renderClients(sector) {
    const filtered =
      sector === "all"
        ? clientsData
        : clientsData.filter((c) => c.sector === sector);

    clientsGrid.innerHTML = filtered
      .map(
        (c) => `
      <div class="client-tile">
        <span class="client-tile__sector">${sectorLabels[c.sector]}</span>
        <strong>${c.name}</strong>
      </div>
    `
      )
      .join("");
  }

  // Filter Pills
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderCatalog(btn.dataset.filter);
    });
  });

  document.querySelectorAll("[data-client-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-client-filter]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderClients(btn.dataset.clientFilter);
    });
  });

  // Jump-to-Category Links
  document.addEventListener("click", (e) => {
    const jumpEl = e.target.closest("[data-filter-jump], [data-jump-cat]");
    if (!jumpEl) return;

    const cat = jumpEl.dataset.filterJump || jumpEl.dataset.jumpCat;
    const targetBtn = document.querySelector(`[data-filter="${cat}"]`);
    if (targetBtn) targetBtn.click();

    closeAllMegaMenus();
    if (jumpEl.hasAttribute("data-jump-cat")) {
      document.getElementById("catalog").scrollIntoView({ behavior: "smooth" });
    }
  });

  // Mega Menu Logic
  const megaTriggers = document.querySelectorAll("[data-mega]");
  const megaPanels = document.querySelectorAll(".mega-menu");

  function closeAllMegaMenus() {
    megaPanels.forEach((panel) => {
      panel.hidden = true;
    });
    megaTriggers.forEach((trigger) => {
      trigger.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });
  }

  megaTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const targetPanel = document.getElementById(trigger.dataset.mega);
      const isAlreadyOpen = !targetPanel.hidden;
      closeAllMegaMenus();
      if (!isAlreadyOpen) {
        targetPanel.hidden = false;
        trigger.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Bottom Language Button Dropdown (Links to Static EN / AR Pages)
  const langDropdownBtn = document.getElementById("langDropdownBtn");
  const langMenu = document.getElementById("langMenu");

  langDropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = langMenu.hidden;
    langMenu.hidden = !isHidden;
    langDropdownBtn.setAttribute("aria-expanded", String(isHidden));
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      closeAllMegaMenus();
    }
    if (!e.target.closest("#langSwitcher")) {
      langMenu.hidden = true;
      langDropdownBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Mobile Menu Drawer
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");

  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileDrawer.hidden;
    mobileDrawer.hidden = !isHidden;
    mobileMenuBtn.setAttribute("aria-expanded", String(isHidden));
  });

  mobileDrawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileDrawer.hidden = true;
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Product Detail Modal
  const productModal = document.getElementById("productModal");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalItems = document.getElementById("modalItems");

  function openProductModal(id) {
    const product = catalogData.find((item) => item.id === id);
    if (!product) return;

    modalImage.src = product.img;
    modalImage.alt = product.title;
    modalCategory.textContent = product.tag;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalItems.innerHTML = product.items.map((i) => `<li>${i}</li>`).join("");
    productModal.hidden = false;
  }

  function closeProductModal() {
    productModal.hidden = true;
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-product]");
    if (trigger) openProductModal(trigger.dataset.openProduct);
    if (e.target.hasAttribute("data-close-modal")) closeProductModal();
  });

  document.getElementById("modalQuoteBtn").addEventListener("click", closeProductModal);

  // Global Search Modal
  const searchModal = document.getElementById("searchModal");
  const openSearchBtn = document.getElementById("openSearchBtn");
  const globalSearchInput = document.getElementById("globalSearchInput");
  const searchResults = document.getElementById("searchResults");

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML =
        "<p style='color:#64748b;font-size:0.9rem;'>Type a keyword such as <strong>Mattress</strong>, <strong>Lockers</strong>, <strong>Cocoa</strong>, <strong>Towels</strong>, or <strong>Sharjah</strong>.</p>";
      return;
    }

    const matchedProducts = catalogData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.items.some((s) => s.toLowerCase().includes(q))
    );

    const matchedClients = clientsData.filter((c) =>
      c.name.toLowerCase().includes(q)
    );

    let html = "";
    matchedProducts.forEach((p) => {
      html += `
        <div class="search-result-item" data-search-product="${p.id}">
          <span class="tag">${p.tag}</span>
          <strong style="display:block;margin-top:6px;">${p.title}</strong>
          <small style="color:#4a5568;">${p.description}</small>
        </div>
      `;
    });

    matchedClients.forEach((c) => {
      html += `
        <div class="search-result-item" data-search-client>
          <span class="tag">Client</span>
          <strong style="display:block;margin-top:6px;">${c.name}</strong>
          <small style="color:#4a5568;">${sectorLabels[c.sector]}</small>
        </div>
      `;
    });

    if (!html) {
      html = "<p style='color:#64748b;'>No matching products or clients found.</p>";
    }

    searchResults.innerHTML = html;
  }

  openSearchBtn.addEventListener("click", () => {
    searchModal.hidden = false;
    globalSearchInput.value = "";
    performSearch("");
    setTimeout(() => globalSearchInput.focus(), 50);
  });

  globalSearchInput.addEventListener("input", (e) => {
    performSearch(e.target.value);
  });

  document.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close-search")) {
      searchModal.hidden = true;
    }
    const prodMatch = e.target.closest("[data-search-product]");
    if (prodMatch) {
      searchModal.hidden = true;
      openProductModal(prodMatch.dataset.searchProduct);
    }
    const clientMatch = e.target.closest("[data-search-client]");
    if (clientMatch) {
      searchModal.hidden = true;
      document.getElementById("clients").scrollIntoView({ behavior: "smooth" });
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllMegaMenus();
      closeProductModal();
      searchModal.hidden = true;
      langMenu.hidden = true;
      langDropdownBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Formspree AJAX Submission (https://formspree.io/f/maqkrwoe)
  const inquiryForm = document.getElementById("inquiryForm");
  const formFeedback = document.getElementById("formFeedback");
  const submitBtn = document.getElementById("submitBtn");

  inquiryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fullName = document.getElementById("fullName").value.trim();
    const companyName = document.getElementById("companyName").value.trim();
    const email = document.getElementById("email").value.trim();
    const division = document.getElementById("division").value;
    const message = document.getElementById("message").value.trim();

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!fullName || !companyName || !emailValid || !division || !message) {
      formFeedback.className = "form-feedback is-error";
      formFeedback.textContent =
        "Please complete all required fields with a valid business email address.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Enquiry...";
    formFeedback.textContent = "";

    try {
      const response = await fetch(inquiryForm.action, {
        method: "POST",
        body: new FormData(inquiryForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formFeedback.className = "form-feedback is-success";
        formFeedback.textContent = `Thank you, ${fullName}. Your enquiry has been sent to our commercial team at info@egy-uae.com.`;
        inquiryForm.reset();
      } else {
        const data = await response.json().catch(() => ({}));
        formFeedback.className = "form-feedback is-error";
        formFeedback.textContent =
          data.errors && data.errors.length
            ? data.errors.map((err) => err.message).join(", ")
            : "Unable to send right now. Please email us directly at info@egy-uae.com.";
      }
    } catch (error) {
      formFeedback.className = "form-feedback is-error";
      formFeedback.textContent =
        "Network error. Please email us directly at info@egy-uae.com or call +20 11 04526673.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Commercial Enquiry";
    }
  });

  // Initialize Everything
  document.getElementById("currentYear").textContent = new Date().getFullYear();
  renderServices();
  renderCatalog("all");
  renderSpotlight();
  renderClients("all");
  startHeroAutoPlay();
})();
