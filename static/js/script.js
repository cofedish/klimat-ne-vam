/*window.addEventListener("load", function () {
  // Получаем все элементы с классом .nav-link
  const navLinks = document.querySelectorAll(".nav-link");

  // Находим максимальную ширину среди всех ссылок
  let maxWidth = 0;
  navLinks.forEach((link) => {
    const width = link.offsetWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });

  // Устанавливаем максимальную ширину для всех ссылок
  navLinks.forEach((link) => {
    link.style.width = maxWidth + "px";
  });
});*/

window.addEventListener("load", function () {
  // Получаем все кнопки с классом .service-btn
  const serviceButtons = document.querySelectorAll(".service-btn");

  // Находим максимальную ширину среди всех кнопок
  let maxWidth = 0;
  serviceButtons.forEach((button) => {
    const width = button.offsetWidth;
    if (width > maxWidth) {
      maxWidth = width;
    }
  });

  // Устанавливаем максимальную ширину для всех кнопок
  serviceButtons.forEach((button) => {
    button.style.width = maxWidth + "px";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    { threshold: 0.2 }
  ); // Срабатывает, когда 20% элемента видны

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const services = {
      electronics: [
          { image: "static/images/services/electro1.png", title: "Монтаж розеток", description: "Профессиональная установка розеток с учетом всех норм безопасности и удобства." },
          { image: "static/images/services/electro2.png", title: "Монтаж выключателей", description: "Качественная установка выключателей для комфортного управления освещением." },
          { image: "static/images/services/electro3.png", title: "Монтаж светильников", description: "Грамотное подключение и установка светильников для создания уютного освещения." },
          { image: "static/images/services/electro4.png", title: "Прокладка электропроводки", description: "Разводка и монтаж электропроводки с учетом требований надежности и безопасности." },
          { image: "static/images/services/electro5.png", title: "Установка автоматов и УЗО", description: "Монтаж и настройка защитных устройств для предотвращения коротких замыканий и перегрузок." },
          { image: "static/images/services/electro6.png", title: "Штробление стен под проводку", description: "Аккуратное и точное штробление стен для скрытого монтажа электропроводки." },
          { image: "static/images/services/electro7.png", title: "Монтаж датчиков", description: "Установка датчиков движения, дыма, утечки газа и других систем безопасности." },
          { image: "static/images/services/electro8.png", title: "Комплектация и доставка материалов", description: "Подбор и поставка качественных электротехнических материалов для вашего проекта." }
      ],
      ventilation: [
          { image: "static/images/services/vent1.png", title: "Проектирование и монтаж вентиляции", description: "Разработка эффективных систем вентиляции для комфортного микроклимата." },
          { image: "static/images/services/vent2.png", title: "Установка вытяжных систем", description: "Монтаж вытяжных систем для обеспечения свежего воздуха в помещениях." },
          { image: "static/images/services/vent3.png", title: "Комплектация и поставка материалов", description: "Доставка и подбор необходимых компонентов для систем вентиляции." }
      ],
      conditioning: [
          { image: "static/images/services/cond1.png", title: "Монтаж кондиционирования", description: "Проектирование и установка современных систем кондиционирования для любого типа помещений." },
          { image: "static/images/services/cond2.png", title: "Системы холодоснабжения", description: "Проектирование и внедрение промышленных и бытовых систем охлаждения." },
          { image: "static/images/services/cond3.png", title: "Комплектация и поставка оборудования", description: "Подбор, закупка и доставка всех необходимых комплектующих для кондиционирования." }
      ]
  };

  const buttons = document.querySelectorAll(".service-btn");
  const container = document.querySelector(".service-cards-container");

  function setEqualHeight() {
      const cards = document.querySelectorAll(".service-card .card");
      let maxHeight = 0;

      // Сбрасываем высоту перед измерением
      cards.forEach((card) => {
          card.style.height = "auto";
      });

      // Находим максимальную высоту
      cards.forEach((card) => {
          const height = card.offsetHeight;
          if (height > maxHeight) {
              maxHeight = height;
          }
      });

      // Устанавливаем максимальную высоту всем карточкам
      cards.forEach((card) => {
          card.style.height = maxHeight + "px";
      });
  }

  function loadCards(category) {
      container.innerHTML = "";

      services[category].forEach((service, index) => {
          const card = document.createElement("div");
          card.classList.add("col-md-4", "service-card");
          card.setAttribute("data-aos", "fade-up");
          card.setAttribute("data-aos-delay", index * 100);

          card.innerHTML = `
              <div class="card shadow-sm">
                  <img src="${service.image}" class="card-img-top" alt="${service.title}">
                  <div class="card-body text-center">
                      <h5 class="card-title">${service.title}</h5>
                      <p class="card-text">${service.description}</p>
                  </div>
              </div>
          `;
          container.appendChild(card);
      });

      // Инициализируем AOS заново после смены контента
      AOS.init();

      // Запускаем установку одинаковой высоты после загрузки карточек
      setTimeout(setEqualHeight, 100);
  }

  // Выбираем начальную категорию (по умолчанию "Электроника")
  let activeCategory = "electronics";
  loadCards(activeCategory);

  // Обработчик кликов по кнопкам
  buttons.forEach(button => {
      button.addEventListener("click", function () {
          buttons.forEach(btn => btn.classList.remove("active"));
          this.classList.add("active");
          activeCategory = this.getAttribute("data-category");
          loadCards(activeCategory);
      });
  });

  // Пересчет высоты карточек при изменении размеров экрана
  window.addEventListener("resize", setEqualHeight);
});




