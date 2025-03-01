window.addEventListener("load", function () {
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
      ventilation: [
          { image: "static/images/ventilation1.jpg", title: "Монтаж систем вентиляции" },
          { image: "static/images/ventilation2.jpg", title: "Очистка и обслуживание" },
          { image: "static/images/ventilation3.jpg", title: "Проектирование вентиляции" }
      ],
      conditioning: [
          { image: "static/images/conditioning1.jpg", title: "Установка кондиционеров" },
          { image: "static/images/conditioning2.jpg", title: "Обслуживание и ремонт" },
          { image: "static/images/conditioning3.jpg", title: "Заправка фреоном" }
      ],
      electronics: [
          { image: "static/images/electronics1.jpg", title: "Штробирование" },
          { image: "static/images/electronics2.jpg", title: "Установка ламп" },
          { image: "static/images/electronics3.jpg", title: "Установка датчиков" }
      ]
  };

  const buttons = document.querySelectorAll(".service-btn");
  const container = document.querySelector(".service-cards-container");

  buttons.forEach(button => {
      button.addEventListener("click", function () {
          const category = this.getAttribute("data-category");

          // Очищаем контейнер перед добавлением новых карточек
          container.innerHTML = "";

          // Добавляем новые карточки
          services[category].forEach((service, index) => {
              const card = document.createElement("div");
              card.classList.add("col-md-4", "service-card");
              card.setAttribute("data-aos", "fade-up");
              card.setAttribute("data-aos-delay", index * 100); // Анимация с задержкой
              
              card.innerHTML = `
                  <div class="card shadow-sm">
                      <img src="${service.image}" class="card-img-top" alt="${service.title}">
                      <div class="card-body text-center">
                          <h5 class="card-title">${service.title}</h5>
                      </div>
                  </div>
              `;
              container.appendChild(card);
          });

          // Инициализируем AOS заново для новой анимации
          AOS.init();
      });
  });
});


