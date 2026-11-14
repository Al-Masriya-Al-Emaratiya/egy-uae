

(function () {
  "use strict";

  const SLIDE_INTERVAL_MS = 5500;
  let currentHeroIndex = 0;
  let heroTimer = null;

  // 1. Auto-Rotating Hero Banners (Arabic)
  const heroPillars = [
    {
      eyebrow: "المصرية الإماراتية للوكالات التجارية والاستيراد والتصدير",
      badge: "مركز توريد متكامل",
      bgImg: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      title: "حيث تلتقي التوريدات العالمية بتميز التصنيع",
      subtitle:
        "نقدم أعلى مستويات الجودة في الأثاث المخصص، ومفروشات السرير والحمام، وتجهيزات فنادق 4 و 5 نجوم (OS&E و FF&E)، وتأثيث سكن العاملين، والمواد الغذائية، والكيماويات ومستحضرات التجميل في مصر ودول الخليج والعالم.",
      cardHeading: "توريد متكامل من المصنع إلى الموقع",
      cardDesc:
        "من الخامات الأساسية والأخشاب المصنعة في مدينة العاشر من رمضان إلى التسليم الفوري للمشاريع الفندقية والتجارية."
    },
    {
      eyebrow: "مصانع مدينة العاشر من رمضان",
      badge: "أخشاب ومفروشات مخصصة",
      bgImg: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      title: "دقة تصنيع الأثاث والمفروشات الفندقية الفاخرة",
      subtitle:
        "تصنيع داخلي بأخشاب الكونتر و MDF والقشرة والزان الطبيعي، إلى جانب إنتاج ملايات السرير والألحفة والمناشف والأرواب بمعايير فنادق 4 و 5 نجوم والمستشفيات.",
      cardHeading: "إنتاج العاشر من رمضان",
      cardDesc:
        "تخصيص كامل لغرف النوم والدواليب (1 إلى 4 أبواب) ومكاتب الاستقبال والقواطع الجبسية والخشبية والمفروشات."
    },
    {
      eyebrow: "الضيافة الفندقية وسكن العاملين",
      badge: "فنادق 4 و 5 نجوم",
      bgImg: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      title: "تجهيزات فنادق 4 و 5 نجوم وسكن العاملين",
      subtitle:
        "شريك توريد شامل يغطي إلكترونيات الغرف، معدات المطابخ، الزجاجيات، أثاث الولائم، الأسرة المعدنية بطابقين وعربات التدبير الفندقي.",
      cardHeading: "جاهزية كاملة للضيافة والإقامة",
      cardDesc:
        "تجهيز افتتاحات الفنادق الكبرى وتوسعات المستشفيات ومشاريع سكن العاملين بأفضل الأسعار."
    },
    {
      eyebrow: "الأغذية، الكيماويات ومستحضرات التجميل",
      badge: "الاستيراد والتصدير",
      bgImg: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=1800&q=80",
      cardImg: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=900&q=80",
      title: "تجارة الخامات الغذائية والكيماويات ومستحضرات التجميل",
      subtitle:
        "توريد خامات مصانع الألبان والشوكولاتة من الكاكاو والحليب المجفف والزيوت والزبدة والنشا والمكسرات، واستيراد الخضروات والفاكهة الطازجة والمجمدة وسلال الترحيب.",
      cardHeading: "وكالات تجارية عالمية",
      cardDesc:
        "ربط المصانع ومشغلي الضيافة في مصر والشارقة ودول الخليج العربي والأسواق العالمية."
    }
  ];

  // 2. Services Data (8 Divisions in Arabic)
  const servicesData = [
    {
      index: "01",
      cat: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      title: "تصنيع الأثاث المخصص",
      desc: "إنتاج حسب الطلب بأخشاب الكونتر و MDF والقشرة والزان الطبيعي لغرف النوم والاستقبال وأعمال النجارة."
    },
    {
      index: "02",
      cat: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      title: "تصنيع مفروشات السرير والحمام",
      desc: "ملايات فندقية، ألحفة، وسائد، مناشف، أرواب حمام ومفارش طاولات لفنادق 4 و 5 نجوم والمستشفيات."
    },
    {
      index: "03",
      cat: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      title: "متخصصون في تأثيث سكن العاملين",
      desc: "باقات تجهيز متكاملة: أسرة بطابقين حديدية وخشبية، خزائن، مراتب، أجهزة كهربائية وسلال ترحيب."
    },
    {
      index: "04",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      title: "تأثيث المكاتب والديكور الداخلي",
      desc: "توريد وتركيب مكاتب المديرين، الكراسي الطبية، محطات العمل، وخزائن الملفات والقواطع الداخلية."
    },
    {
      index: "05",
      cat: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      title: "توريد OS&E و FF&E لفنادق 4 و 5 نجوم",
      desc: "توريد شامل لمعدات المطاعم والمطابخ، الزجاجيات، الخزائن، الميني بار، وأجهزة السبا والنوادي الصحية."
    },
    {
      index: "06",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1696497327672-2bdce2e033dd?auto=format&fit=crop&w=800&q=80",
      title: "الكيماويات ومستحضرات التجميل والعطور",
      desc: "تجارة وتوزيع الكيماويات الصناعية، مستحضرات التجميل، العطور، ومجموعات النظافة ذات العلامات التجارية."
    },
    {
      index: "07",
      cat: "office-banquet",
      img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
      title: "الأثاث التعليمي والمدرسي",
      desc: "مقاعد وطاولات دراسية مريحة للفصول والجامعات (موديلات SC4101، SC4001، SC4001 X، SC4001D)."
    },
    {
      index: "08",
      cat: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=80",
      title: "قطاع المواد الغذائية وخامات التصنيع",
      desc: "خامات مصانع الألبان والشوكولاتة (الكاكاو، الحليب المجفف، الزبدة، الزيوت، المكسرات) والخضروات والفاكهة."
    }
  ];

  // 3. Complete Product Catalog (9 Categories in Arabic)
  const catalogData = [
    {
      id: "custom-furniture",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      tag: "الأثاث المخصص",
      title: "أعمال النجارة وغرف النوم الكاملة",
      description:
        "أثاث مصنع من الكونتر (PLY) و MDF والقشرة والزان الطبيعي، مصمم خصيصاً للفنادق وسكن العاملين والمشاريع التجارية.",
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
    },
    {
      id: "ffe-procurement",
      category: "furniture",
      img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
      tag: "تجهيزات FF&E",
      title: "الستائر والمفروشات والمراتب الطبية",
      description:
        "توريد وتركيب متكامل يشمل الستائر المعتمة والتنجيد التجاري والمراتب الطبية والعادية.",
      items: [
        "توريد وتركيب شامل لأثاث المكاتب",
        "ستائر بلاك أوت مبطنة وشيفون (Sheer)",
        "تنجيد احترافي (قماش، PVC وجلد)",
        "أسرة قابلة للطي (Roll-Away Bed)",
        "أسرة بطابقين (خشب، معدن وحديد)",
        "مراتب طبية وعادية (Medicated & Orthopedic)",
        "سجاد وموكيت فندقي"
      ]
    },
    {
      id: "linens-mfg",
      category: "linens",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80",
      tag: "تصنيع المفروشات",
      title: "مفروشات السرير والحمام للفنادق والمستشفيات",
      description:
        "مفروشات عالية المتانة والجودة موردة لفنادق 4 و 5 نجوم ومؤسسات الرعاية الصحية.",
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
    },
    {
      id: "housekeeping-ops",
      category: "linens",
      img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=900&q=80",
      tag: "التدبير الفندقي",
      title: "معدات التدبير الفندقي والتشغيل",
      description:
        "معدات تشغيلية لتسهيل خدمة الغرف والمغاسل وتوفير أقصى راحة للنزلاء.",
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
    },
    {
      id: "ose-procurement",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
      tag: "مشتريات OS&E",
      title: "تجهيزات تشغيلية من كبرى العلامات التجارية",
      description:
        "توريد شامل لكافة العلامات التجارية لقطاعات الأغذية والمشروبات والمطابخ والطب والسبا والإلكترونيات.",
      items: [
        "معدات المطاعم والمطابخ التجارية",
        "معدات التدبير الفندقي والمغاسل المركزية",
        "مستلزمات وأجهزة طبية (جميع الماركات)",
        "أجهزة الصوتيات والمرئيات والإلكترونيات (جميع الماركات)",
        "معدات ومستلزمات السبا (جميع الماركات)",
        "أنظمة الأرفف والتخزين",
        "معدات حمامات السباحة والنوادي الصحية",
        "الأدوات الهندسية ومعدات النظافة"
      ]
    },
    {
      id: "hotel-supplies",
      category: "hospitality",
      img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80",
      tag: "مستلزمات الفنادق",
      title: "أدوات المائدة وإلكترونيات وخزائن الغرف",
      description:
        "تشكيلات المطاعم والبوفيهات وأجهزة الأمان والمشروبات داخل غرف النزلاء.",
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
    },
    {
      id: "office-edu-banquet",
      category: "office-banquet",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
      tag: "المكاتب والولائم والتعليم",
      title: "تجهيز الشركات والجامعات وقاعات المؤتمرات",
      description:
        "كراسي مكتبية طبية، مكاتب مديرين، أثاث الحفلات والولائم، ومقاعد المدارس والجامعات (SC4101–SC4001D).",
      items: [
        "كراسي تنفيذية جلد وشبك مريحة",
        "محطات عمل مكتبية ومكاتب مديرين",
        "كراسي ولائم قابلة للتكديس وطاولات قابلة للطي",
        "طاولات كوكتيل، عربات طاولات ومنصات متحركة",
        "منصات خطابة وأرضيات احتفالات متنقلة",
        "مقاعد وطاولات دراسية (SC4101، SC4001، SC4001 X، SC4001D)",
        "خزائن مكتبية حديدية وملونة متعددة الأبواب"
      ]
    },
    {
      id: "staff-housing",
      category: "staff",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80",
      tag: "سكن العاملين",
      title: "غرف الإقامة، الأسرة المعدنية والأجهزة المنزلية",
      description:
        "تجهيز سكني متكامل يشمل الأسرة المعدنية والدواليب الحديدية والأنتريهات والأجهزة الكهربائية.",
      items: [
        "أسرة خشب مع حديد وأسرة بطابقين",
        "أسرة معدنية مفردة وبطابقين شديدة التحمل",
        "أسرة MDF بأدراج تخزين وأسرة ديفان",
        "دواليب MDF وخزائن فولاذية متعددة الأبواب",
        "أطقم كنب وأنتريهات ووحدات تليفزيون",
        "أجهزة منزلية كهربائية وأدوات مطبخ",
        "غرف مفردة مجهزة بمكاتب دراسة"
      ]
    },
    {
      id: "food-chemicals-baskets",
      category: "food-chemicals",
      img: "https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80",
      tag: "الأغذية والتجميل",
      title: "خامات التصنيع الغذائي، الكيماويات وسلال الترحيب",
      description:
        "مواد خام لمصانع الألبان والشوكولاتة، خضروات وفاكهة طازجة ومجمدة، كيماويات ومستحضرات تجميل.",
      items: [
        "مسحوق الكاكاو والحليب المجفف للمصانع",
        "زيوت، زبدة، نشا (شرش) وجميع أنواع المكسرات",
        "استيراد الخضروات والفاكهة الطازجة والمجمدة",
        "مستحضرات التجميل والعطور والكيماويات التجارية",
        "سلة ترحيب للرجال (15 منتجاً من الماركات العالمية)",
        "سلة ترحيب للسيدات (13 منتجاً من الماركات العالمية)"
      ]
    }
  ];

  const foodChipsData = [
    "مسحوق الكاكاو",
    "حليب مجفف",
    "الزيوت النباتية والصناعية",
    "الزبدة",
    "النشا",
    "جميع أنواع المكسرات",
    "خضروات وفاكهة طازجة",
    "خضروات وفاكهة مجمدة"
  ];

  const basketItemsData = {
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
  };

  const clientsData = [
    { name: "فندق المها الشارقة", sector: "hospitality" },
    { name: "فنادق راديسون بلو", sector: "hospitality" },
    { name: "فنادق جراند", sector: "hospitality" },
    { name: "فندق أوشيانيك", sector: "hospitality" },
    { name: "فندق روتانا", sector: "hospitality" },
    { name: "مجموعة فنادق الحياة الشارقة", sector: "hospitality" },
    { name: "فندق لوردز", sector: "hospitality" },
    { name: "فندق هوليداي إنترناشونال الشارقة", sector: "hospitality" },
    { name: "شركة أرزاق", sector: "trading" },
    { name: "أرزاق للتجارة العامة", sector: "trading" },
    { name: "إكسلنس لتوريدات الفنادق", sector: "trading" },
    { name: "الشرق الأوسط لتوريدات الفنادق", sector: "trading" },
    { name: "لكجريوس للتجارة العامة", sector: "trading" },
    { name: "بليسينج للتجارة العامة", sector: "trading" },
    { name: "شبكة شركاء المصرية الإماراتية", sector: "trading" },
    { name: "جامعة الشارقة", sector: "institutions" },
    { name: "سكاي دايف", sector: "institutions" },
    { name: "النادي الأهلي", sector: "institutions" }
  ];

  const sectorLabels = {
    hospitality: "الفنادق والضيافة",
    trading: "التجارة العامة والتوريدات",
    institutions: "الجامعات والأندية والترفيه"
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
            <span class="service-card__arrow">&nwarr;</span>
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
              <span class="catalog-card__count">${item.items.length} بنود ومواصفات</span>
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
            استعراض المواصفات الكاملة &larr;
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

  // Bottom Language Button Dropdown
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
        "<p style='color:#64748b;font-size:0.9rem;'>اكتب كلمة للبحث مثل: <strong>مراتب</strong>، <strong>خزائن</strong>، <strong>كاكاو</strong>، <strong>مناشف</strong>، أو <strong>الشارقة</strong>.</p>";
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
          <span class="tag">عميل</span>
          <strong style="display:block;margin-top:6px;">${c.name}</strong>
          <small style="color:#4a5568;">${sectorLabels[c.sector]}</small>
        </div>
      `;
    });

    if (!html) {
      html = "<p style='color:#64748b;'>لم يتم العثور على منتجات أو عملاء مطابقين.</p>";
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
        "يرجى استكمال جميع الحقول المطلوبة وإدخال بريد إلكتروني صحيح.";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "جاري إرسال الطلب...";
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
        formFeedback.textContent = `شكراً لك ${fullName}. تم إرسال استفسارك بنجاح إلى فريق المبيعات على info@egy-uae.com.`;
        inquiryForm.reset();
      } else {
        formFeedback.className = "form-feedback is-error";
        formFeedback.textContent =
          "تعذر الإرسال حالياً. يرجى مراسلتنا مباشرة على info@egy-uae.com.";
      }
    } catch (error) {
      formFeedback.className = "form-feedback is-error";
      formFeedback.textContent =
        "حدث خطأ في الاتصال. يرجى مراسلتنا على info@egy-uae.com أو الاتصال على +20 11 04526673.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "إرسال الاستفسار التجاري";
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
