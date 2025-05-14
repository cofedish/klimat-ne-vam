document.addEventListener("DOMContentLoaded", function () {
    const projects = [
        {
            image: "static/images/projects/project1_1.jpg",
            title: "Монтаж электропроводки в жилом помещении",
            description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
        },
        {
            image: "static/images/projects/project1_2.jpg",
            title: "Монтаж электропроводки в жилом помещении",
            description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
        },
        {
            image: "static/images/projects/project1_3.jpg",
            title: "Монтаж электропроводки в жилом помещении",
            description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
        },
        {
            image: "static/images/projects/project2_1.jpg",
            title: "Проектирование и установка вентиляционной системы промышленного объекта",
            description: "Проектирование и монтаж системы вентиляции в промышленном здании, улучшение воздухообмена и качества воздуха."
        },
        {
            image: "static/images/projects/project2_2.jpg",
            title: "Проектирование и установка вентиляционной системы промышленного объекта",
            description: "Проектирование и монтаж системы вентиляции в промышленном здании, улучшение воздухообмена и качества воздуха."
        },
        {
            image: "static/images/projects/project3_1.jpg",
            title: "Котельная в частном доме с современной инженерной системой",
            description: "Полная установка газового котла, бойлера, системы водоочистки Geyser и автоматики. Продуманный монтаж и аккуратная разводка."
        }
    ];

    const carouselInner = document.querySelector("#projectsCarousel .carousel-inner");
    const prevButton = document.querySelector("#projectsCarousel .carousel-control-prev");
    const nextButton = document.querySelector("#projectsCarousel .carousel-control-next");

    // Очистка карусели
    carouselInner.innerHTML = "";

    // Создание слайдов
    projects.forEach((project, index) => {
        const activeClass = index === 0 ? "active" : "";
        const projectSlide = `
            <div class="carousel-item ${activeClass}" data-bs-interval="5000">
                <div class="row align-items-center project-item" data-aos="fade-up">
                    <div class="col-md-6">
                        <img src="${project.image}" class="project-img img-fluid" alt="${project.title}">
                    </div>
                    <div class="col-md-6 project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                    </div>
                </div>
            </div>
        `;
        carouselInner.insertAdjacentHTML('beforeend', projectSlide);
    });

    // Инициализация карусели
    const projectsCarousel = new bootstrap.Carousel('#projectsCarousel', {
        interval: 5000,
        wrap: true
    });

    // Обработчики кнопок
    prevButton.addEventListener('click', () => projectsCarousel.prev());
    nextButton.addEventListener('click', () => projectsCarousel.next());

    // Обновление анимаций и запуск карусели
    setTimeout(() => {
        AOS.refreshHard();
        projectsCarousel.cycle();
    }, 300);
});
