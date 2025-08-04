import React, { useState, useEffect } from 'react'

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('electronics')

  const services = {
    electronics: [
      { image: "/static/images/services/electro1.png", title: "Монтаж розеток", description: "Профессиональная установка розеток с учетом всех норм безопасности и удобства." },
      { image: "/static/images/services/electro2.png", title: "Монтаж выключателей", description: "Качественная установка выключателей для комфортного управления освещением." },
      { image: "/static/images/services/electro3.png", title: "Монтаж светильников", description: "Грамотное подключение и установка светильников для создания уютного освещения." },
      { image: "/static/images/services/electro4.png", title: "Прокладка электропроводки", description: "Разводка и монтаж электропроводки с учетом требований надежности и безопасности." },
      { image: "/static/images/services/electro5.png", title: "Установка автоматов и УЗО", description: "Монтаж и настройка защитных устройств для предотвращения коротких замыканий и перегрузок." },
      { image: "/static/images/services/electro6.png", title: "Штробление стен под проводку", description: "Аккуратное и точное штробление стен для скрытого монтажа электропроводки." },
      { image: "/static/images/services/electro7.png", title: "Монтаж датчиков", description: "Установка датчиков движения, дыма, утечки газа и других систем безопасности." },
      { image: "/static/images/services/electro8.png", title: "Комплектация и доставка материалов", description: "Подбор и поставка качественных электротехнических материалов для вашего проекта." }
    ],
    ventilation: [
      { image: "/static/images/services/vent1.png", title: "Проектирование и монтаж вентиляции", description: "Разработка эффективных систем вентиляции для комфортного микроклимата." },
      { image: "/static/images/services/vent2.png", title: "Установка вытяжных систем", description: "Монтаж вытяжных систем для обеспечения свежего воздуха в помещениях." },
      { image: "/static/images/services/vent3.png", title: "Комплектация и поставка материалов", description: "Доставка и подбор необходимых компонентов для систем вентиляции." }
    ],
    conditioning: [
      { image: "/static/images/services/cond1.png", title: "Монтаж кондиционирования", description: "Проектирование и установка современных систем кондиционирования для любого типа помещений." },
      { image: "/static/images/services/cond2.png", title: "Системы холодоснабжения", description: "Проектирование и внедрение промышленных и бытовых систем охлаждения." },
      { image: "/static/images/services/cond3.png", title: "Комплектация и поставка оборудования", description: "Подбор, закупка и доставка всех необходимых комплектующих для кондиционирования." }
    ]
  }

  const setEqualHeight = () => {
    const cards = document.querySelectorAll(".service-card .card")
    let maxHeight = 0

    // Сбрасываем высоту перед измерением
    cards.forEach((card) => {
      card.style.height = "auto"
    })

    // Находим максимальную высоту
    cards.forEach((card) => {
      const height = card.offsetHeight
      if (height > maxHeight) {
        maxHeight = height
      }
    })

    // Устанавливаем максимальную высоту всем карточкам
    cards.forEach((card) => {
      card.style.height = maxHeight + "px"
    })
  }

  useEffect(() => {
    // Запускаем установку одинаковой высоты после загрузки карточек
    setTimeout(setEqualHeight, 100)
    
    // Устанавливаем одинаковую ширину для кнопок
    const buttons = document.querySelectorAll('.service-btn')
    if (buttons.length > 0) {
      let maxWidth = 0
      buttons.forEach(button => {
        button.style.width = 'auto'
        const width = button.offsetWidth
        if (width > maxWidth) {
          maxWidth = width
        }
      })
      buttons.forEach(button => {
        button.style.width = maxWidth + 'px'
      })
    }
  }, [activeCategory])

  useEffect(() => {
    // Пересчет высоты карточек при изменении размеров экрана
    window.addEventListener("resize", setEqualHeight)
    return () => window.removeEventListener("resize", setEqualHeight)
  }, [])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <section className="services container my-5" id="services">
      <div className="text-center mb-4">
        <h2 data-aos="fade-down">Наши услуги</h2>
        <p className="description" data-aos="fade-down" data-aos-delay="100">
          Выберите категорию услуг, чтобы узнать подробнее.
        </p>
      </div>

      {/* Кнопки переключения */}
      <div className="text-center mb-4" data-aos="fade-up" data-aos-delay="200">
        <button 
          className={`btn btn-primary service-btn ${activeCategory === 'electronics' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('electronics')}
        >
          Электрика
        </button>
        <button 
          className={`btn btn-primary service-btn ${activeCategory === 'ventilation' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('ventilation')}
        >
          Вентиляция
        </button>
        <button 
          className={`btn btn-primary service-btn ${activeCategory === 'conditioning' ? 'active' : ''}`}
          onClick={() => handleCategoryChange('conditioning')}
        >
          Кондиционирование
        </button>
      </div>

      {/* Контейнер для карточек */}
      <div className="row service-cards-container">
        {services[activeCategory].map((service, index) => (
          <div 
            key={index}
            className="col-md-4 service-card"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="card shadow-sm">
              <img src={service.image} className="card-img-top" alt={service.title} />
              <div className="card-body text-center">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services