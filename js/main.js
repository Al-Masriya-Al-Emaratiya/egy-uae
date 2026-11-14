/* ==========================================================================
   Almassriya Alemaratiya — Bilingual (EN / AR) Interactive Engine & Catalog
   ========================================================================== */

(function () {
  "use strict";

  let currentLang = "en";
  let currentHeroIndex = 0;
  let currentCatalogFilter = "all";
  let currentClientFilter = "all";

  // 1. Complete Bilingual Dictionary (English & Arabic)
  const i18n = {
    en: {
      nav_products: "Products & Divisions",
      nav_markets: "Markets & Solutions",
      nav_catalog: "Full Catalog",
      nav_clients: "Clients",
      nav_company: "Company",
      nav_services: "Our Services",
      nav_food: "Food & Welcome Baskets",
      nav_contact: "Contact Us",

      mega_mfg: "MANUFACTURING",
      mega_furn_t: "Customized Furniture & FF&E",
      mega_furn_d: "PLY, MDF, Veneer, Solid Wood, Beds, Wardrobes & Drapery",
      mega_linens_t: "Bed & Bath Linens",
      mega_linens_d: "Duvets, Sheets, Towels, Bathrobes & Slippers",
      mega_office_t: "Office, Educational & Banquet",
      mega_office_d: "Workstations, Seating, Folding Tables & School Desks",
      mega_proc: "PROCUREMENT & SUPPLIES",
      mega_hosp_t: "Hotel Supplies & OS&E",
      mega_hosp_d: "4–5 Star F&B, Kitchen, Glassware, Minibars & Safes",
      mega_staff_t: "Staff Housing & Metal Lockers",
      mega_staff_d: "Bunk Beds, Steel Lockers, Appliances & Welcome Baskets",
      mega_food_t: "Food Division, Chemicals & Cosmetics",
      mega_food_d: "Dairy/Chocolate Raw Materials, Produce, Cosmetics & Perfumes",
      mega_turnkey: "TURNKEY SOURCING",
      mega_turnkey_h: "One-Stop Partner for Hospitality & Commerce",
      mega_brochure: "Request Product Brochure →",

      mega_sectors: "CORE SECTORS",
      sec_hotels_t: "4–5 Star Hotels & Resorts",
      sec_hotels_d: "Complete OS&E, FF&E, Housekeeping & Guest Room Amenities",
      sec_hosp_t: "Hospitals & Healthcare",
      sec_hosp_d: "Bed Sheets, Bathrobes, Medical Supplies & Laundry Equipment",
      sec_corp_t: "Corporate & Educational Campuses",
      sec_corp_d: "Turnkey Office Interior Decoration & Classroom Furniture",
      mega_trade: "TRADE & INDUSTRY",
      sec_food_t: "Food Processing & Confectionery",
      sec_food_d: "Cocoa, Milk Powder, Butter, Oils, Nuts & Fresh/Frozen Produce",
      sec_staff_t: "Staff Accommodation Projects",
      sec_staff_d: "End-to-end furnishing, white goods & Male/Female Welcome Baskets",
      sec_agency_t: "Global Commercial Agencies",
      sec_agency_d: "Strategic import/export facilitation across Egypt & UAE",
      mega_region: "REGIONAL PRESENCE",
      mega_region_h: "Egypt, Gulf Countries & Worldwide",
      mega_clients_link: "View Our Client List →",

      hero_eyebrow: "AL MASSRIYA AL EMARATIYA FOR COMMERCIAL AGENCIES, IMPORT & EXPORT",
      hero_cta_1: "Explore Our Divisions",
      hero_cta_2: "Request Commercial Quote",
      hero_badge: "ONE-STOP SOURCING HUB",
      metric_div: "Core Divisions",
      metric_star: "Hotel Standards",
      metric_gcc: "& Global Export",
      tab1_k: "01 / COMMERCIAL AGENCIES",
      tab1_l: "Import, Export & Partnering",
      tab2_k: "02 / MANUFACTURING",
      tab2_l: "Customized Furniture & Linens",
      tab3_k: "03 / HOSPITALITY",
      tab3_l: "OS&E & FF&E for 4–5 Star Hotels",
      tab4_k: "04 / FOOD & COMMODITIES",
      tab4_l: "Raw Materials, Produce & Cosmetics",

      stat1: "Specialized Manufacturing & Trade Divisions",
      stat2: "Furniture, Linen, OS&E & Food Product Lines",
      stat3: "Major Hospitality, Club & Trading Clients",
      stat4_num: "Egypt & GCC",
      stat4: "HQ in 10th of Ramadan City, Sharqia",

      serv_eyebrow: "OUR SERVICES",
      serv_title: "Integrated Solutions Across Industries",
      serv_lead: "Al Massriya Al Emaratiya provides tailored manufacturing, procurement, and import/export facilitation engineered to exceed client expectations.",

      feat_eyebrow: "ONE-STOP SOURCING COMPANY",
      feat_title: "Built for 4 & 5 Star Hotels, Hospitals & Commercial Projects",
      feat_text: "We are specialized in supplying Housekeeping Operational Products, Hotel Beddings, Hotel Towels, Duvets, Pillows, Food & Beverages, Guest Electronics, Cleaning & Pool Equipment, Safes & Minibars, Health Club & Laundry Equipment, Drapery, Upholstery, and Engineering Tools.",
      feat_btn1: "Browse Full Catalog",
      feat_btn2: "Partner With Us",
      feat_caption: "4 & 5 Star Hospitality Standards • Competitive Pricing & Turnkey Delivery",

      cat_eyebrow: "PORTFOLIO & SPECIFICATIONS",
      cat_title: "Explore Our Complete Product Catalog",
      cat_lead: "Filter by business division and click any card to inspect the full technical item list from our corporate profile.",
      f_all: "All Divisions",
      f_furn: "Furniture & FF&E",
      f_lin: "Linens & Housekeeping",
      f_hosp: "Hotel OS&E & Supplies",
      f_off: "Office, Banquet & Edu",
      f_staff: "Staff Housing & Lockers",
      f_food: "Food, Basket & Chemicals",

      spot_eyebrow: "SPECIALIZED COMMERCIAL DIVISIONS",
      spot_title: "Food Division Raw Materials & Branded Welcome Baskets",
      spot_lead: "Dedicated industrial food supply lines for dairy & chocolate factories alongside ready-to-deploy Male & Female personal care welcome packs.",
      food_tag: "FOOD DIVISION • IMPORT & SUPPLY",
      food_h: "Dairy & Chocolate Factory Ingredients & Produce",
      food_p: "Bulk sourcing of certified factory raw materials and import of fresh & frozen vegetables and fruits.",
      bask_tag: "WE PROVIDE ALL BRANDED PRODUCTS",
      bask_h: "Customized Welcome Baskets (Male & Female)",
      bask_p: "Complete personal hygiene, cosmetics, and refreshment kits tailored for staff housing and hotel guests.",
      bask_male_h: "Male Welcome Basket",
      bask_female_h: "Female Welcome Basket",

      about_eyebrow: "ABOUT US & MISSION",
      about_title: "Facilitating Partnerships That Exceed Expectations",
      about_quote: "“Our mission is to provide the highest quality products, management and facilitate to the partnering of other companies, to ensure the needs of our clients are delivered in a manner that exceeds the expectations of our clients and their customers.”",
      about_p1: "Al Massriya Al Emaratiya is privileged to provide quality Customized Furniture, Linens, Staff Housing Furnishing, Office Furnishing, Interior Decoration, Hospitality, Commercial Industry, Chemicals, Cosmetics, Perfumes, and Food Division services.",
      about_p2: "Headquartered in 10th of Ramadan City, Sharqia, Egypt, our operations proudly serve clients across Egypt, Gulf Countries, and global international markets.",
      hq_tag: "MAIN OFFICE & PRODUCTION",
      hq_title: "10th of Ramadan City, Sharqia, Egypt",
      hq_desc: "Manufacturing, carpentry, linen production, and central logistics hub.",
      gcc_tag: "REGIONAL REACH",
      gcc_title: "Egypt, Gulf Countries (UAE & GCC) & Worldwide",
      gcc_desc: "Trusted partner for hotels, universities, clubs, and general trading companies.",

      cli_eyebrow: "OUR CLIENT LIST",
      cli_title: "Trusted by Leading Hospitality, Institutions & Trading Partners",
      cli_lead: "A growing ecosystem of hotels, universities, sports clubs, and general trading companies across Egypt and the UAE.",
      cf_all: "All Clients (18)",
      cf_hosp: "Hotels & Hospitality",
      cf_trade: "Trading & Supply",
      cf_inst: "Universities, Clubs & Leisure",

      con_eyebrow: "FURTHER INFORMATION & ENQUIRIES",
      con_title: "Connect With Almassriya Alemaratiya",
      con_lead: "Further information about our services and for enquiries, please contact our commercial team at our main office or submit your project requirements below.",
      con_lbl1: "COMPANY NAME",
      con_val1: "AL Massriya AL Emaratiya For Commercial Agencies, Import & Export",
      con_lbl2: "MAIN OFFICE",
      con_val2: "10th of Ramadan City, Sharqia, Egypt",
      con_lbl3: "SERVICE TERRITORY",
      con_val3: "Egypt, Gulf Countries (UAE / GCC) & Worldwide",

      form_h: "Request a Proposal or Product Catalog",
      form_name: "Full Name *",
      form_comp: "Company / Hotel / Organization *",
      form_email: "Business Email *",
      form_div: "Division of Interest *",
      form_msg: "Project Details / Quantities *",
      form_submit: "Submit Commercial Enquiry",
      opt_select: "Select a division...",
      opt_furn: "Customized Furniture & FF&E",
      opt_lin: "Bed & Bath Linens & Housekeeping",
      opt_hosp: "4–5 Star Hotel OS&E & Supplies",
      opt_staff: "Staff Housing & Metal Lockers",
      opt_off: "Office, Educational & Banquet Furniture",
      opt_food: "Food Division (Raw Materials & Produce)",
      opt_chem: "Cosmetics, Chemicals & Welcome Baskets",
      opt_ag: "Commercial Agency / Import & Export",

      foot_desc: "AL Massriya AL Emaratiya For Commercial Agencies, Import & Export. Competitive prices, quality manufacturing, and reliable service.",
      foot_c1: "Divisions",
      foot_l1: "Customized Furniture & FF&E",
      foot_l2: "Linens & Housekeeping",
      foot_l3: "Hotel OS&E & Supplies",
      foot_l4: "Staff Housing & Lockers",
      foot_c2: "Commercial Trade",
      foot_l5: "Food Division & Raw Materials",
      foot_l6: "Male & Female Welcome Baskets",
      foot_l7: "Chemicals, Cosmetics & Perfumes",
      foot_l8: "Office, Banquet & Educational",
      foot_c3: "Company",
      foot_l9: "About Us & Mission",
      foot_l10: "Our Services",
      foot_l11: "Client Ecosystem",
      foot_l12: "Contact HQ (10th of Ramadan)",
      foot_hq: "10th of Ramadan City, Sharqia, Egypt",

      modal_specs: "Included Specifications & Items",
      modal_cta: "Request Quote for This Division",
      search_title: "Search Almassriya Alemaratiya Catalog",
      btn_inspect: "Inspect Full Specifications →",
      spec_count: "Specifications"
    },
    ar: {
      nav_products: "المنتجات والأقسام",
      nav_markets: "الأسواق والحلول",
      nav_catalog: "الكتالوج الكامل",
      nav_clients: "العملاء",
      nav_company: "عن الشركة",
      nav_services: "خدماتنا",
      nav_food: "المواد الغذائية وسلال الترحيب",
      nav_contact: "اتصل بنا",

      mega_mfg: "التصنيع والإنتاج",
      mega_furn_t: "الأثاث المخصص وتجهيزات FF&E",
      mega_furn_d: "خشب كونتر، MDF، قشرة، زان طبيعي، غرف نوم، دواليب وستائر",
      mega_linens_t: "مفروشات السرير والحمام",
      mega_linens_d: "ألحفة، ملايات، مناشف، أرواب حمام، وشباشب فندقية",
      mega_office_t: "الأثاث المكتبي والتعليمي والولائم",
      mega_office_d: "محطات عمل، كراسي، طاولات قابلة للطي ومقاعد دراسية",
      mega_proc: "المشتريات والتوريدات",
      mega_hosp_t: "مستلزمات الفنادق و OS&E",
      mega_hosp_d: "معدات مطابخ، زجاجيات، أدوات مائدة، ميني بار وخزائن",
      mega_staff_t: "تأثيث سكن العاملين والخزائن المعدنية",
      mega_staff_d: "أسرة بطابقين، خزائن حديدية، أجهزة منزلية وسلال ترحيب",
      mega_food_t: "قطاع الأغذية والكيماويات ومستحضرات التجميل",
      mega_food_d: "خامات مصانع الألبان والشوكولاتة، خضروات وفاكهة، عطور وتجميل",
      mega_turnkey: "التوريد المتكامل",
      mega_turnkey_h: "شريك متكامل لقطاعات الضيافة والتجارة",
      mega_brochure: "اطلب الكتالوج الآن ←",

      mega_sectors: "القطاعات الرئيسية",
      sec_hotels_t: "فنادق ومنتجعات 4 و 5 نجوم",
      sec_hotels_d: "توريد كامل لـ OS&E و FF&E ومستلزمات الغرف والتدبير الفندقي",
      sec_hosp_t: "المستشفيات والرعاية الصحية",
      sec_hosp_d: "ملايات سرير، أرواب، مستلزمات طبية ومعدات مغاسل",
      sec_corp_t: "المقرات الإدارية والجامعات",
      sec_corp_d: "الديكور الداخلي وتأثيث المكاتب والقاعات الدراسية",
      mega_trade: "التجارة والصناعة",
      sec_food_t: "مصانع الأغذية والحلويات",
      sec_food_d: "كاكاو، حليب مجفف، زبدة، زيوت، مكسرات وخضروات طازجة ومجمدة",
      sec_staff_t: "مشاريع سكن العاملين",
      sec_staff_d: "تأثيث شامل وأجهزة كهربائية وسلال ترحيب للرجال والسيدات",
      sec_agency_t: "الوكالات التجارية العالمية",
      sec_agency_d: "تسهيل الاستيراد والتصدير بين مصر والإمارات والعالم",
      mega_region: "الانتشار الإقليمي",
      mega_region_h: "مصر ودول الخليج والعالم",
      mega_clients_link: "عرض قائمة عملائنا ←",

      hero_eyebrow: "المصرية الإماراتية للوكالات التجارية والاستيراد والتصدير",
      hero_cta_1: "استكشف أقسام الشركة",
      hero_cta_2: "اطلب عرض سعر تجاري",
      hero_badge: "مركز توريد متكامل",
      metric_div: "أقسام رئيسية",
      metric_star: "معايير فندقية",
      metric_gcc: "تصدير للخليج والعالم",
      tab1_k: "01 / الوكالات التجارية",
      tab1_l: "الاستيراد والتصدير والشراكات",
      tab2_k: "02 / التصنيع",
      tab2_l: "الأثاث المخصص والمفروشات",
      tab3_k: "03 / الضيافة الفندقية",
      tab3_l: "تجهيزات OS&E و FF&E للفنادق",
      tab4_k: "04 / الأغذية والتجارة",
      tab4_l: "خامات غذائية، تجميل وكيماويات",

      stat1: "أقسام متخصصة في التصنيع والتوريد والتجارة",
      stat2: "خط إنتاج وتوريد للأثاث والمفروشات والأغذية",
      stat3: "عملاء رئيسيون من الفنادق والأندية وشركات التجارة",
      stat4_num: "مصر والخليج",
      stat4: "المقر الرئيسي: العاشر من رمضان، الشرقية",

      serv_eyebrow: "خدماتنا",
      serv_title: "حلول متكاملة عبر مختلف القطاعات",
      serv_lead: "تقدم المصرية الإماراتية خدمات التصنيع المخصص، والمشتريات الفندقية، وتسهيل الاستيراد والتصدير بأعلى معايير الجودة.",

      feat_eyebrow: "شركة توريد شاملة",
      feat_title: "تجهيز متكامل لفنادق 4 و 5 نجوم والمستشفيات والمشاريع",
      feat_text: "متخصصون في توريد منتجات التدبير الفندقي، مفروشات ومناشف الفنادق، الألحفة والوسائد، الأغذية والمشروبات، إلكترونيات النزلاء، معدات النظافة وحمامات السباحة، الخزائن والميني بار، أجهزة النوادي الصحية والمغاسل، الستائر والمفروشات وأدوات الهندسة.",
      feat_btn1: "تصفح الكتالوج الكامل",
      feat_btn2: "تعاون معنا",
      feat_caption: "معايير ضيافة 4 و 5 نجوم • أسعار تنافسية وتسليم متكامل",

      cat_eyebrow: "المنتجات والمواصفات",
      cat_title: "استكشف كتالوج منتجاتنا الكامل",
      cat_lead: "قم بالتصفية حسب القسم واضغط على أي بطاقة لاستعراض القائمة التفصيلية للمواصفات والبنود.",
      f_all: "جميع الأقسام",
      f_furn: "الأثاث و FF&E",
      f_lin: "المفروشات والتدبير الفندقي",
      f_hosp: "تجهيزات الفنادق و OS&E",
      f_off: "المكاتب والولائم والتعليم",
      f_staff: "سكن العاملين والخزائن",
      f_food: "الأغذية، السلال والكيماويات",

      spot_eyebrow: "أقسام تجارية متخصصة",
      spot_title: "قطاع المواد الغذائية وسلال الترحيب ذات العلامات التجارية",
      spot_lead: "خطوط توريد متخصصة لخامات مصانع الألبان والشوكولاتة، إلى جانب حقائب الترحيب والعناية الشخصية للرجال والسيدات.",
      food_tag: "قطاع الأغذية • استيراد وتوريد",
      food_h: "خامات مصانع الألبان والشوكولاتة والخضروات والفاكهة",
      food_p: "توريد كميات الجملة من المواد الخام المعتمدة واستيراد الخضروات والفاكهة الطازجة والمجمدة.",
      bask_tag: "نوفر جميع المنتجات ذات العلامات التجارية",
      bask_h: "سلال الترحيب المخصصة (للرجال والسيدات)",
      bask_p: "عبوات متكاملة للعناية الشخصية والمنظفات والمشروبات والوجبات الخفيفة لسكن العاملين ونزلاء الفنادق.",
      bask_male_h: "سلة الترحيب (للرجال)",
      bask_female_h: "سلة الترحيب (للسيدات)",

      about_eyebrow: "من نحن ورسالتنا",
      about_title: "بناء شراكات استراتيجية تفوق التوقعات",
      about_quote: "«رسالتنا هي تقديم أعلى جودة من المنتجات والإدارة وتسهيل الشراكة مع الشركات الأخرى، لضمان تلبية احتياجات عملائنا بطريقة تفوق توقعاتهم وتوقعات عملائهم.»",
      about_p1: "تتشرف المصرية الإماراتية بتقديم الأثاث المخصص، والمفروشات، وتأثيث سكن العاملين، والأثاث المكتبي، والديكور الداخلي، وتجهيزات الضيافة، والكيماويات، ومستحضرات التجميل، والعطور، وقطاع المواد الغذائية.",
      about_p2: "يقع مقرنا الرئيسي في مدينة العاشر من رمضان، الشرقية، مصر، ونفخر بخدمة عملائنا في مصر ودول الخليج العربي وجميع أنحاء العالم.",
      hq_tag: "المقر الرئيسي ومراكز الإنتاج",
      hq_title: "مدينة العاشر من رمضان، الشرقية، مصر",
      hq_desc: "تصنيع الأثاث والنجارة وإنتاج المفروشات ومركز اللوجستيات الرئيسي.",
      gcc_tag: "النطاق الإقليمي والعالمي",
      gcc_title: "مصر ودول الخليج العربي (الإمارات) وجميع أنحاء العالم",
      gcc_desc: "شريك موثوق للفنادق الكبرى والجامعات والأندية الرياضية وشركات التجارة العامة.",

      cli_eyebrow: "قائمة عملائنا",
      cli_title: "ثقة كبرى الفنادق والمؤسسات وشركات التجارة",
      cli_lead: "شبكة متنامية من الفنادق والجامعات والأندية الرياضية وشركات التوريد والتجارة العامة في مصر والإمارات.",
      cf_all: "جميع العملاء (18)",
      cf_hosp: "الفنادق والضيافة",
      cf_trade: "التجارة والتوريدات",
      cf_inst: "الجامعات والأندية والترفيه",

      con_eyebrow: "للمزيد من المعلومات والاستفسارات",
      con_title: "تواصل مع المصرية الإماراتية",
      con_lead: "للمزيد من المعلومات حول خدماتنا وللاستفسارات التجارية، يرجى التواصل مع فريقنا أو إرسال متطلبات مشروعك أدناه.",
      con_lbl1: "اسم الشركة",
      con_val1: "المصرية الإماراتية للوكالات التجارية والاستيراد والتصدير",
      con_lbl2: "المقر الرئيسي",
      con_val2: "مدينة العاشر من رمضان، الشرقية، مصر",
      con_lbl3: "نطاق الخدمة",
      con_val3: "مصر ودول الخليج العربي والعالم",

      form_h: "اطلب عرض سعر أو كتالوج المنتجات",
      form_name: "الاسم الكامل *",
      form_comp: "اسم الشركة / الفندق / المؤسسة *",
      form_email: "البريد الإلكتروني الرسمي *",
      form_div: "القسم المطلوب *",
      form_msg: "تفاصيل المشروع / الكميات المطلوبة *",
      form_submit: "إرسال الاستفسار التجاري",
      opt_select: "اختر القسم...",
      opt_furn: "الأثاث المخصص وتجهيزات FF&E",
      opt_lin: "المفروشات والتدبير الفندقي",
      opt_hosp: "تجهيزات فنادق 4 و 5 نجوم OS&E",
      opt_staff: "سكن العاملين والخزائن المعدنية",
      opt_off: "الأثاث المكتبي والتعليمي والولائم",
      opt_food: "قطاع المواد الغذائية وخامات المصانع",
      opt_chem: "مستحضرات التجميل والكيماويات وسلال الترحيب",
      opt_ag: "الوكالات التجارية والاستيراد والتصدير",

      foot_desc: "المصرية الإماراتية للوكالات التجارية والاستيراد والتصدير. أسعار تنافسية وجودة تصنيع عالية وخدمة موثوقة.",
      foot_c1: "الأقسام",
      foot_l1: "الأثاث المخصص و FF&E",
      foot_l2: "المفروشات والتدبير الفندقي",
      foot_l3: "مستلزمات الفنادق و OS&E",
      foot_l4: "سكن العاملين والخزائن",
      foot_c2: "التجارة والتوريد",
      foot_l5: "المواد الغذائية وخامات التصنيع",
      foot_l6: "سلال الترحيب (رجال وسيدات)",
      foot_l7: "الكيماويات والتجميل والعطور",
      foot_l8: "الأثاث المكتبي والولائم والتعليم",
      foot_c3: "الشركة",
      foot_l9: "من نحن ورسالتنا",
      foot_l10: "خدماتنا",
      foot_l11: "قائمة العملاء",
      foot_l12: "التواصل مع المقر الرئيسي",
      foot_hq: "مدينة العاشر من رمضان، الشرقية، مصر",

      modal_specs: "المواصفات والبنود المشمولة",
      modal_cta: "اطلب عرض سعر لهذا القسم",
      search_title: "البحث في كتالوج المصرية الإماراتية",
      btn_inspect: "استعراض المواصفات الكاملة ←",
      spec_count: "بنود ومواصفات"
    }
  };

  // 2. Hero Pillars with Distinct High-Resolution Photos
  const heroPillars = [
    {
      bgImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      en: {
        title: "Where Global Supply Meets Manufacturing Excellence",
        subtitle: "Delivering highest quality Customized Furniture, Bed & Bath Linens, 4–5 Star Hotel OS&E & FF&E Procurement, Staff Housing, Food Products, Chemicals & Cosmetics across Egypt, Gulf Countries, and Worldwide.",
        cardHeading: "End-to-End Turnkey Procurement",
        cardDesc: "From raw materials and bespoke woodwork manufactured in 10th of Ramadan City to international hospitality delivery."
      },
      ar: {
        title: "حيث تلتقي التوريدات العالمية بتميز التصنيع",
        subtitle: "نقدم أعلى مستويات الجودة في الأثاث المخصص، ومفروشات السرير والحمام، وتجهيزات فنادق 4 و 5 نجوم، وسكن العاملين، والمواد الغذائية، والكيماويات ومستحضرات التجميل في مصر والخليج والعالم.",
        cardHeading: "توريد متكامل من المصنع إلى الموقع",
        cardDesc: "من الخامات الأساسية والأخشاب المصنعة في العاشر من رمضان إلى التسليم الفوري للمشاريع الفندقية والتجارية."
      }
    },
    {
      bgImg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      en: {
        title: "Precision Furniture & Luxury Linen Manufacturing",
        subtitle: "In-house fabrication in PLY, MDF, Veneer & Solid Wood paired with 4–5 Star hotel and hospital grade bed sheets, duvets, towels, and bathrobes.",
        cardHeading: "10th of Ramadan Production",
        cardDesc: "Full customization across bedroom suites, wardrobes (1–4 doors), reception desks, gypsum/wooden partitions, and textile linens."
      },
      ar: {
        title: "دقة تصنيع الأثاث والمفروشات الفندقية الفاخرة",
        subtitle: "تصنيع داخلي بأخشاب الكونتر و MDF والقشرة والزان الطبيعي، إلى جانب إنتاج ملايات السرير والألحفة والمناشف والأرواب للفنادق والمستشفيات.",
        cardHeading: "إنتاج مدينة العاشر من رمضان",
        cardDesc: "تخصيص كامل لغرف النوم والدواليب (1 إلى 4 أبواب) ومكاتب الاستقبال والقواطع الخشبية والجبسية."
      }
    },
    {
      bgImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      en: {
        title: "4–5 Star Hotel OS&E, FF&E & Staff Housing",
        subtitle: "A true one-stop sourcing partner covering guestroom electronics, kitchenware, glassware, banquet seating, bunk beds, and housekeeping trolleys.",
        cardHeading: "Hospitality & Accommodation Ready",
        cardDesc: "Supplying complete hotel openings, hospital expansions, and large-scale workforce staff housing projects."
      },
      ar: {
        title: "تجهيزات فنادق 4 و 5 نجوم وسكن العاملين",
        subtitle: "شريك توريد شامل يغطي إلكترونيات الغرف، معدات المطابخ، الزجاجيات، أثاث الولائم، الأسرة المعدنية وعربات التدبير الفندقي.",
        cardHeading: "جاهزية كاملة للضيافة والإقامة",
        cardDesc: "تجهيز افتتاحات الفنادق وتوسعات المستشفيات ومشاريع سكن العاملين الكبرى بأفضل الأسعار."
      }
    },
    {
      bgImg: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=900&q=80",
      en: {
        title: "Food Raw Materials, Chemicals & Cosmetics Trade",
        subtitle: "Supplying dairy and chocolate factories with cocoa powder, milk powder, oils, butter, starch, and nuts alongside fresh/frozen produce and branded welcome kits.",
        cardHeading: "Global Commercial Agencies",
        cardDesc: "Connecting manufacturers and hospitality operators across Egypt, Sharjah, the GCC, and global markets."
      },
      ar: {
        title: "تجارة الخامات الغذائية والكيماويات ومستحضرات التجميل",
        subtitle: "توريد خامات مصانع الألبان والشوكولاتة من الكاكاو والحليب المجفف والزيوت والزبدة والنشا والمكسرات، واستيراد الخضروات والفاكهة الطازجة والمجمدة.",
        cardHeading: "وكالات تجارية عالمية",
        cardDesc: "ربط المصانع ومشغلي الضيافة في مصر والشارقة ودول الخليج العربي والأسواق العالمية."
      }
    }
  ];

  // 3. Services Cards (8 Divisions with Real Photos)
  const servicesData = [
    {
      index: "01",
      cat: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Customized Furniture Manufacturer",
        desc: "Bespoke production in PLY, MDF, Veneer, and Solid Wood for bedrooms, reception desks, partitions, and carpentry."
      },
      ar: {
        title: "تصنيع الأثاث المخصص",
        desc: "إنتاج حسب الطلب بأخشاب الكونتر و MDF والقشرة والزان الطبيعي لغرف النوم والاستقبال وأعمال النجارة."
      }
    },
    {
      index: "02",
      cat: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Bed & Bath Linens Manufacturer",
        desc: "Premium bed sheets, duvets, pillow covers, towels, bathrobes, and table linens for 4–5 star hotels & hospitals."
      },
      ar: {
        title: "تصنيع مفروشات السرير والحمام",
        desc: "ملايات فندقية، ألحفة، وسائد، مناشف، أرواب حمام ومفارش طاولات لفنادق 4 و 5 نجوم والمستشفيات."
      }
    },
    {
      index: "03",
      cat: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Staff Housing Furnishing",
        desc: "Turnkey accommodation packages: metal & wooden bunk beds, lockers, mattresses, appliances & welcome baskets."
      },
      ar: {
        title: "متخصصون في تأثيث سكن العاملين",
        desc: "باقات تجهيز متكاملة: أسرة بطابقين حديدية وخشبية، خزائن، مراتب، أجهزة كهربائية وسلال ترحيب."
      }
    },
    {
      index: "04",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Office Furnishing & Decoration",
        desc: "Complete supply and installation of executive desks, ergonomic chairs, workstations, and interior partitions."
      },
      ar: {
        title: "تأثيث المكاتب والديكور الداخلي",
        desc: "توريد وتركيب مكاتب المديرين، الكراسي الطبية، محطات العمل، وخزائن الملفات والقواطع الداخلية."
      }
    },
    {
      index: "05",
      cat: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "OS&E & FF&E for 4–5 Star Hotels",
        desc: "One-stop sourcing of F&B equipment, kitchenware, glassware, chinaware, minibars, safes, and spa supplies."
      },
      ar: {
        title: "توريد OS&E و FF&E لفنادق 4 و 5 نجوم",
        desc: "توريد شامل لمعدات المطاعم والمطابخ، الزجاجيات، الخزائن، الميني بار، وأجهزة السبا والنوادي الصحية."
      }
    },
    {
      index: "06",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Cosmetics, Perfumes & Chemicals",
        desc: "Commercial distribution and sourcing of industrial chemicals, cosmetics, fragrances, and branded hygiene kits."
      },
      ar: {
        title: "الكيماويات ومستحضرات التجميل والعطور",
        desc: "تجارة وتوزيع الكيماويات الصناعية، مستحضرات التجميل، العطور، ومجموعات النظافة ذات العلامات التجارية."
      }
    },
    {
      index: "07",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Educational Furniture",
        desc: "Ergonomic student desks and classroom seating systems (SC4101, SC4001, SC4001 X, SC4001D) for institutions."
      },
      ar: {
        title: "الأثاث التعليمي والمدرسي",
        desc: "مقاعد وطاولات دراسية مريحة للفصول والجامعات (موديلات SC4101، SC4001، SC4001 X، SC4001D)."
      }
    },
    {
      index: "08",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=80",
      en: {
        title: "Food Division & Raw Materials",
        desc: "Raw materials for dairy and chocolate factories (cocoa, milk powder, butter, oils, nuts) plus fresh & frozen produce."
      },
      ar: {
        title: "قطاع المواد الغذائية وخامات التصنيع",
        desc: "خامات مصانع الألبان والشوكولاتة (الكاكاو، الحليب المجفف، الزبدة، الزيوت، المكسرات) والخضروات والفاكهة."
      }
    }
  ];

  // 4. Full Catalog Data (9 Divisions with Real Photos + EN/AR)
  const catalogData = [
    {
      id: "custom-furniture",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Customized Furniture",
        title: "Custom Woodwork & Room Suites",
        description: "Furniture manufactured in PLY, MDF, Veneer & Solid Wood, tailored for hotels, staff quarters, and commercial interiors.",
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
      ar: {
        tag: "الأثاث المخصص",
        title: "أعمال النجارة وغرف النوم الكاملة",
        description: "أثاث مصنع من الكونتر و MDF والقشرة والزان الطبيعي، مصمم للفنادق وسكن العاملين والمشاريع التجارية.",
        items: [
          "أثاث مصنع من PLY و MDF والقشرة والخشب الطبيعي",
          "أسرة (مفرد، كوين، كينج)",
          "كومودينو وتسريحات",
          "مكاتب كتابة وطاولات طعام",
          "دواليب ملابس (1، 2، 3، 4 أبواب)",
          "خلفيات سرير (سادة ومصممة)",
          "وحدات تليفزيون، أرفف، طاولات ومكاتب",
          "مكتبات ومكاتب استقبال",
          "قواطع وفواصل (جبس وخشب)",
          "كافة أعمال النجارة في الموقع"
        ]
      }
    },
    {
      id: "ffe-procurement",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "FF&E Procurement",
        title: "Soft Furnishings, Mattresses & Drapery",
        description: "Complete FF&E installation packages including blackout curtains, commercial upholstery, and orthopedic bedding.",
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
      ar: {
        tag: "تجهيزات FF&E",
        title: "الستائر والمفروشات والمراتب الطبية",
        description: "توريد وتركيب متكامل يشمل الستائر المعتمة والتنجيد التجاري والمراتب الطبية والعادية.",
        items: [
          "توريد وتركيب شامل لأثاث المكاتب",
          "ستائر بلاك أوت مبطنة وشيفون (Sheer)",
          "تنجيد احترافي (قماش، PVC وجلد)",
          "أسرة قابلة للطي (Roll-Away Bed)",
          "أسرة بطابقين (خشب، معدن وحديد)",
          "مراتب طبية وعادية (Medicated & Orthopedic)",
          "سجاد وموكيت فندقي"
        ]
      }
    },
    {
      id: "linens-mfg",
      category: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Linen Manufacturer",
        title: "Hotel & Hospital Bed & Bath Linens",
        description: "Durable, high-thread-count bed and bath linens supplied to 4 and 5 star hotels and healthcare institutions.",
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
      ar: {
        tag: "تصنيع المفروشات",
        title: "مفروشات السرير والحمام للفنادق والمستشفيات",
        description: "مفروشات عالية المتانة والجودة موردة لفنادق 4 و 5 نجوم والمستشفيات.",
        items: [
          "ملايات سرير (مسطحة وبأستك)",
          "ألحفة وأكياس ألحفة",
          "وسائد وأكياس وسائد",
          "مفارش طاولات ومفارش فردية",
          "واقي مراتب، تنانير سرير ورانر سرير",
          "بطاطين وأغطية ديكور",
          "مناشف (وجه، يد واستحمام)",
          "أرواب حمام وشباشب فندقية"
        ]
      }
    },
    {
      id: "housekeeping-ops",
      category: "linens",
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Housekeeping",
        title: "Housekeeping & Operational Equipment",
        description: "Operational equipment engineered to streamline room turnover, laundry logistics, and guest convenience.",
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
      ar: {
        tag: "التدبير الفندقي",
        title: "معدات التدبير الفندقي والتشغيل",
        description: "معدات تشغيلية لتسهيل خدمة الغرف والمغاسل وتوفير أقصى راحة للنزلاء.",
        items: [
          "شماعات ملابس وحقائب قماش غير منسوج",
          "أكياس غسيل وستائر حمام",
          "مستلزمات الغرف وصواني الضيافة",
          "حوامل حقائب وعربات نقل الأمتعة",
          "عربات خدمة الغرف وعربات الكتان والمغاسل",
          "سلال مهملات بدواسة وسلال غرف",
          "موازين ومرايا حمام",
          "طاولات مكواة، مجففات شعر ودواسات حمام"
        ]
      }
    },
    {
      id: "ose-procurement",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "OS&E Procurement",
        title: "Multi-Brand Hotel & Institutional OS&E",
        description: "Comprehensive sourcing across all major brands for hospitality, medical, kitchen, spa, and AV departments.",
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
      ar: {
        tag: "مشتريات OS&E",
        title: "تجهيزات تشغيلية من كبرى العلامات التجارية",
        description: "توريد شامل لكافة العلامات التجارية لقطاعات الأغذية والمشروبات والمطابخ والطب والسبا والإلكترونيات.",
        items: [
          "معدات المطاعم والمطابخ التجارية",
          "معدات التدبير الفندقي والمغاسل المركزية",
          "مستلزمات وأجهزة طبية (جميع الماركات)",
          "أجهزة الصوتيات والمرئيات والإلكترونيات",
          "معدات ومستلزمات السبا (جميع الماركات)",
          "أنظمة الأرفف والتخزين",
          "معدات حمامات السباحة والنوادي الصحية",
          "الأدوات الهندسية ومعدات النظافة"
        ]
      }
    },
    {
      id: "hotel-supplies",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Hotel Supplies",
        title: "Tableware, Guest Electronics & Security",
        description: "Front-of-house dining collections and in-room guest security & refreshment hardware.",
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
      ar: {
        tag: "مستلزمات الفنادق",
        title: "أدوات المائدة وإلكترونيات وخزائن الغرف",
        description: "تشكيلات المطاعم والبوفيهات وأجهزة الأمان والمشروبات داخل غرف النزلاء.",
        items: [
          "الزجاجيات والأكواب الفندقية",
          "أدوات المائدة الفضية والاستانلس ستيل",
          "أطقم التقديم والبوفيهات (Hollowware)",
          "أطقم البورسلين الصيني (Chinaware)",
          "خزائن إلكترونية رقمية للغرف",
          "ثلاجات ميني بار صامتة للنزلاء",
          "خزائن الموظفين والنزلاء",
          "عربات النظافة والصيانة"
        ]
      }
    },
    {
      id: "office-edu-banquet",
      category: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Office, Edu & Banquet",
        title: "Workstations, Classrooms & Events",
        description: "Ergonomic office seating, modular desks, banquet event furniture, and school desk systems (SC4101–SC4001D).",
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
      ar: {
        tag: "المكاتب والولائم والتعليم",
        title: "تجهيز الشركات والجامعات وقاعات المؤتمرات",
        description: "كراسي مكتبية طبية، مكاتب مديرين، أثاث الحفلات والولائم، ومقاعد المدارس والجامعات.",
        items: [
          "كراسي تنفيذية جلد وشبك مريحة",
          "محطات عمل مكتبية ومكاتب مديرين",
          "كراسي ولائم قابلة للتكديس وطاولات قابلة للطي",
          "طاولات كوكتيل، عربات طاولات ومنصات متحركة",
          "منصات خطابة وأرضيات احتفالات متنقلة",
          "مقاعد وطاولات دراسية (SC4101، SC4001، SC4001 X، SC4001D)",
          "خزائن مكتبية حديدية وملونة متعددة الأبواب"
        ]
      }
    },
    {
      id: "staff-housing",
      category: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Staff Housing",
        title: "Workforce Quarters, Metal Beds & Appliances",
        description: "Complete residential furnishing packages with metal bunk beds, steel cupboards, sofa sets, and white goods.",
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
      ar: {
        tag: "سكن العاملين",
        title: "غرف الإقامة، الأسرة المعدنية والأجهزة المنزلية",
        description: "تجهيز سكني متكامل يشمل الأسرة المعدنية والدواليب الحديدية والأنتريهات والأجهزة الكهربائية.",
        items: [
          "أسرة خشب مع حديد وأسرة بطابقين",
          "أسرة معدنية مفردة وبطابقين شديدة التحمل",
          "أسرة MDF بأدراج تخزين وأسرة ديفان",
          "دواليب MDF وخزائن فولاذية متعددة الأبواب",
          "أطقم كنب وأنتريهات ووحدات تليفزيون",
          "أجهزة منزلية كهربائية وأدوات مطبخ",
          "غرف مفردة مجهزة بمكاتب دراسة"
        ]
      }
    },
    {
      id: "food-chemicals-baskets",
      category: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80",
      en: {
        tag: "Food & Cosmetics",
        title: "Food Raw Materials, Chemicals & Baskets",
        description: "Dairy & chocolate factory raw materials, imported fresh/frozen produce, industrial chemicals, and branded welcome kits.",
        items: [
          "Cocoa Powder & Milk Powder for Factories",
          "Industrial Oils, Butter, Starch (Cherch) & All Kinds of Nuts",
          "Fresh & Frozen Imported Vegetables and Fruits",
          "Cosmetics, Perfumes & Commercial Chemicals",
          "Male Branded Welcome Basket (15-item personal & snack kit)",
          "Female Branded Welcome Basket (13-item personal & snack kit)"
        ]
      },
      ar: {
        tag: "الأغذية والتجميل",
        title: "خامات التصنيع الغذائي، الكيماويات وسلال الترحيب",
        description: "مواد خام لمصانع الألبان والشوكولاتة، خضروات وفاكهة طازجة ومجمدة، كيماويات ومستحضرات تجميل.",
        items: [
          "مسحوق الكاكاو والحليب المجفف للمصانع",
          "زيوت، زبدة، نشا وجميع أنواع المكسرات",
          "استيراد الخضروات والفاكهة الطازجة والمجمدة",
          "مستحضرات التجميل والعطور والكيماويات التجارية",
          "سلة ترحيب للرجال (15 منتجاً من الماركات العالمية)",
          "سلة ترحيب للسيدات (13 منتجاً من الماركات العالمية)"
        ]
      }
    }
  ];

  // 5. Food Chips & Welcome Basket Items (NO Taza Brand)
  const foodChipsData = {
    en: [
      "Cocoa Powder",
      "Milk Powder",
      "Industrial & Vegetable Oils",
      "Butter",
      "Starch (Cherch)",
      "All Kinds of Nuts",
      "Fresh Vegetables & Fruits",
      "Frozen Vegetables & Fruits"
    ],
    ar: [
      "مسحوق الكاكاو",
      "حليب مجفف",
      "الزيوت النباتية والصناعية",
      "الزبدة",
      "النشا",
      "جميع أنواع المكسرات",
      "خضروات وفاكهة طازجة",
      "خضروات وفاكهة مجمدة"
    ]
  };

  const basketItemsData = {
    en: {
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
    },
    ar: {
      male: [
        "مسحوق غسيل صغير وصابون صغير",
        "كريم مرطب صغير وشامبو",
        "سبراي للجسم ومستحضرات عناية",
        "معجون أسنان مع فرشاة",
        "شفرة حلاقة وكريم حلاقة",
        "مياه معدنية، عصير، بسكويت، شوكولاتة وشيبسي",
        "رول مناديل صغير"
      ],
      female: [
        "مسحوق غسيل صغير وصابون صغير",
        "كريم مرطب صغير وشامبو",
        "سبراي للجسم",
        "معجون أسنان وفرشاة أسنان",
        "مياه معدنية وعصير",
        "بسكويت، شوكولاتة وشيبسي",
        "رول مناديل صغير"
      ]
    }
  };

  // 6. Client Ecosystem (18 Clients)
  const clientsData = [
    { name: "Al Maha Hotel Sharjah", arName: "فندق المها الشارقة", sector: "hospitality" },
    { name: "Radisson Blu Hotels", arName: "فنادق راديسون بلو", sector: "hospitality" },
    { name: "Grand Hotels", arName: "فنادق جراند", sector: "hospitality" },
    { name: "Oceanic Hotel", arName: "فندق أوشيانيك", sector: "hospitality" },
    { name: "Rotana Hotel", arName: "فندق روتانا", sector: "hospitality" },
    { name: "Alhaiat Hotel Group Sharjah", arName: "مجموعة فنادق الحياة الشارقة", sector: "hospitality" },
    { name: "Lords Hotel", arName: "فندق لوردز", sector: "hospitality" },
    { name: "Hotel Holiday International Sharjah", arName: "فندق هوليداي إنترناشونال الشارقة", sector: "hospitality" },
    { name: "Arzaq Company", arName: "شركة أرزاق", sector: "trading" },
    { name: "Arzaq General Trading", arName: "أرزاق للتجارة العامة", sector: "trading" },
    { name: "Excellence Hotel Supply", arName: "إكسلنس لتوريدات الفنادق", sector: "trading" },
    { name: "Middle East Hotel Supplies", arName: "الشرق الأوسط لتوريدات الفنادق", sector: "trading" },
    { name: "Luxurious General Trading", arName: "لكجريوس للتجارة العامة", sector: "trading" },
    { name: "Blessing General Trading", arName: "بليسينج للتجارة العامة", sector: "trading" },
    { name: "El Massriya El Emaratiya Partner Network", arName: "شبكة شركاء المصرية الإماراتية", sector: "trading" },
    { name: "Sharjah University", arName: "جامعة الشارقة", sector: "institutions" },
    { name: "Sky Dive", arName: "سكاي دايف", sector: "institutions" },
    { name: "Al Ahly Club", arName: "النادي الأهلي", sector: "institutions" }
  ];

  const sectorLabels = {
    en: {
      hospitality: "Hotels & Hospitality",
      trading: "General Trading & Supply",
      institutions: "University, Sports & Leisure"
    },
    ar: {
      hospitality: "الفنادق والضيافة",
      trading: "التجارة العامة والتوريدات",
      institutions: "الجامعات والأندية والترفيه"
    }
  };

  // DOM References
  const servicesGrid = document.getElementById("servicesGrid");
  const catalogGrid = document.getElementById("catalogGrid");
  const clientsGrid = document.getElementById("clientsGrid");
  const foodChips = document.getElementById("foodChips");
  const maleBasketList = document.getElementById("maleBasketList");
  const femaleBasketList = document.getElementById("femaleBasketList");

  // Render Functions
  function renderHero(idx) {
    currentHeroIndex = idx;
    const pillar = heroPillars[idx];
    const copy = pillar[currentLang];

    document.getElementById("heroBgImage").src = pillar.bgImg;
    document.getElementById("heroCardImg").src = pillar.cardImg;
    document.getElementById("heroDynamicTitle").textContent = copy.title;
    document.getElementById("heroDynamicSubtitle").textContent = copy.subtitle;
    document.getElementById("heroCardHeading").textContent = copy.cardHeading;
    document.getElementById("heroCardDesc").textContent = copy.cardDesc;
  }

  function renderServices() {
    servicesGrid.innerHTML = servicesData
      .map((s) => {
        const t = s[currentLang];
        return `
        <article class="service-card" data-jump-cat="${s.cat}">
          <div class="service-card__media">
            <img src="${s.img}" alt="${t.title}" loading="lazy" />
            <span class="service-card__index">${s.index}</span>
          </div>
          <div class="service-card__body">
            <div class="service-card__head">
              <h3>${t.title}</h3>
              <span class="service-card__arrow">&nearr;</span>
            </div>
            <p>${t.desc}</p>
          </div>
        </article>
      `;
      })
      .join("");
  }

  function renderCatalog(filter) {
    currentCatalogFilter = filter;
    const list =
      filter === "all"
        ? catalogData
        : catalogData.filter((item) => item.category === filter);

    catalogGrid.innerHTML = list
      .map((item) => {
        const t = item[currentLang];
        return `
        <article class="catalog-card">
          <div class="catalog-card__media">
            <img src="${item.img}" alt="${t.title}" loading="lazy" />
          </div>
          <div class="catalog-card__body">
            <div>
              <div class="catalog-card__meta">
                <span class="tag">${t.tag}</span>
                <span class="catalog-card__count">${t.items.length} ${i18n[currentLang].spec_count}</span>
              </div>
              <h3>${t.title}</h3>
              <p>${t.description}</p>
              <div class="catalog-card__preview">
                ${t.items
                  .slice(0, 3)
                  .map((spec) => `<span class="mini-chip">${spec}</span>`)
                  .join("")}
              </div>
            </div>
            <button class="catalog-card__btn" type="button" data-open-product="${item.id}">
              ${i18n[currentLang].btn_inspect}
            </button>
          </div>
        </article>
      `;
      })
      .join("");
  }

  function renderSpotlight() {
    foodChips.innerHTML = foodChipsData[currentLang]
      .map((chip) => `<span>${chip}</span>`)
      .join("");

    maleBasketList.innerHTML = basketItemsData[currentLang].male
      .map((li) => `<li>${li}</li>`)
      .join("");

    femaleBasketList.innerHTML = basketItemsData[currentLang].female
      .map((li) => `<li>${li}</li>`)
      .join("");
  }

  function renderClients(sector) {
    currentClientFilter = sector;
    const filtered =
      sector === "all"
        ? clientsData
        : clientsData.filter((c) => c.sector === sector);

    clientsGrid.innerHTML = filtered
      .map((c) => {
        const displayName = currentLang === "ar" ? c.arName : c.name;
        return `
        <div class="client-tile">
          <span class="client-tile__sector">${sectorLabels[currentLang][c.sector]}</span>
          <strong>${displayName}</strong>
        </div>
      `;
      })
      .join("");
  }

  // Apply Language Translation Across Entire Site (Arm Footer Language Toggle)
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (i18n[lang][key]) {
        if (key === "foot_copy") {
          const year = new Date().getFullYear();
          el.innerHTML =
            lang === "ar"
              ? `جميع الحقوق محفوظة &copy; ${year} المصرية الإماراتية للوكالات التجارية والاستيراد والتصدير.`
              : `Copyright &copy; ${year} Almassriya Alemaratiya For Commercial Agencies, Import &amp; Export. All rights reserved.`;
        } else {
          el.textContent = i18n[lang][key];
        }
      }
    });

    // Update Input Placeholders in Arabic/English
    const searchInput = document.getElementById("globalSearchInput");
    searchInput.placeholder =
      lang === "ar"
        ? "ابحث عن الأثاث، المفروشات، معدات الفنادق، المواد الغذائية، الشارقة..."
        : "Search furniture, linens, OS&E, food, lockers, Sharjah...";

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    renderHero(currentHeroIndex);
    renderServices();
    renderCatalog(currentCatalogFilter);
    renderSpotlight();
    renderClients(currentClientFilter);
  }

  // Language Switcher Buttons (Footer)
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });

  // Catalog & Client Filter Events
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

  // Delegated Jump-to-Category Clicks (Services, Mega Menu, Footer)
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

  // Hero Switcher Tabs
  document.querySelectorAll(".hero-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const idx = Number(tab.dataset.heroIndex);
      document.querySelectorAll(".hero-tab").forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderHero(idx);
    });
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

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".site-header")) {
      closeAllMegaMenus();
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

  // Product Detail Modal (with Image)
  const productModal = document.getElementById("productModal");
  const modalImage = document.getElementById("modalImage");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalItems = document.getElementById("modalItems");
  const modalQuoteBtn = document.getElementById("modalQuoteBtn");

  function openProductModal(id) {
    const product = catalogData.find((item) => item.id === id);
    if (!product) return;
    const t = product[currentLang];

    modalImage.src = product.img;
    modalImage.alt = t.title;
    modalCategory.textContent = t.tag;
    modalTitle.textContent = t.title;
    modalDescription.textContent = t.description;
    modalItems.innerHTML = t.items.map((i) => `<li>${i}</li>`).join("");
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

  modalQuoteBtn.addEventListener("click", closeProductModal);

  // Global Search Modal
  const searchModal = document.getElementById("searchModal");
  const openSearchBtn = document.getElementById("openSearchBtn");
  const globalSearchInput = document.getElementById("globalSearchInput");
  const searchResults = document.getElementById("searchResults");

  function performSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML =
        currentLang === "ar"
          ? "<p style='color:#64748b;font-size:0.9rem;'>اكتب كلمة للبحث مثل: <strong>أثاث</strong>، <strong>مناشف</strong>، <strong>كاكاو</strong>، أو <strong>الشارقة</strong>.</p>"
          : "<p style='color:#64748b;font-size:0.9rem;'>Type a keyword such as <strong>Mattress</strong>, <strong>Lockers</strong>, <strong>Cocoa</strong>, <strong>Towels</strong>, or <strong>Sharjah</strong>.</p>";
      return;
    }

    const matchedProducts = catalogData.filter((item) => {
      const en = item.en;
      const ar = item.ar;
      return (
        en.title.toLowerCase().includes(q) ||
        en.tag.toLowerCase().includes(q) ||
        en.items.some((s) => s.toLowerCase().includes(q)) ||
        ar.title.includes(q) ||
        ar.tag.includes(q) ||
        ar.items.some((s) => s.includes(q))
      );
    });

    const matchedClients = clientsData.filter(
      (c) => c.name.toLowerCase().includes(q) || c.arName.includes(q)
    );

    let html = "";
    matchedProducts.forEach((p) => {
      const t = p[currentLang];
      html += `
        <div class="search-result-item" data-search-product="${p.id}">
          <span class="tag">${t.tag}</span>
          <strong style="display:block;margin-top:6px;">${t.title}</strong>
          <small style="color:#4a5568;">${t.description}</small>
        </div>
      `;
    });

    matchedClients.forEach((c) => {
      const name = currentLang === "ar" ? c.arName : c.name;
      html += `
        <div class="search-result-item" data-search-client>
          <span class="tag">${currentLang === "ar" ? "عميل" : "Client"}</span>
          <strong style="display:block;margin-top:6px;">${name}</strong>
          <small style="color:#4a5568;">${sectorLabels[currentLang][c.sector]}</small>
        </div>
      `;
    });

    if (!html) {
      html =
        currentLang === "ar"
          ? "<p style='color:#64748b;'>لم يتم العثور على نتائج مطابقة.</p>"
          : "<p style='color:#64748b;'>No matching products or clients found.</p>";
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
    }
  });

  // Commercial Enquiry Form Validation
  const inquiryForm = document.getElementById("inquiryForm");
  const formFeedback = document.getElementById("formFeedback");

  inquiryForm.addEventListener("submit", (e) => {
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
        currentLang === "ar"
          ? "يرجى استكمال جميع الحقول المطلوبة وإدخال بريد إلكتروني صحيح."
          : "Please complete all required fields with a valid business email address.";
      return;
    }

    formFeedback.className = "form-feedback is-success";
    formFeedback.textContent =
      currentLang === "ar"
        ? `شكراً لك ${fullName}. تم تسجيل طلبك بخصوص "${division}" لفريق المبيعات بالعاشر من رمضان.`
        : `Thank you, ${fullName}. Your enquiry for "${division}" has been recorded for our 10th of Ramadan commercial team.`;
    inquiryForm.reset();
  });

  // Initialize Page
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  setLanguage("en");
})();
