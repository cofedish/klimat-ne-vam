import React from 'react'

const AboutCompany = () => {
  return (
    <section className="about-company container my-5" id="about">
      <div className="text-center mb-4">
        <h2 data-aos="fade-down">О компании</h2>
        <p className="description" data-aos="fade-down" data-aos-delay="100">
          <strong>«Климат Вам»</strong> — команда опытных специалистов,
          создающих комфортные условия для жизни и работы. Мы предлагаем
          <strong> качественные, современные и надёжные инженерные решения</strong>.
        </p>
      </div>

      <div className="row text-center">
        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="50">
          <div className="about-card">
            <i className="bi bi-calendar-check about-icon icon-pink"></i>
            <h5>25 лет опыта</h5>
            <p>Надёжность, проверенная временем. Работаем с 1999 года.</p>
          </div>
        </div>

        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="100">
          <div className="about-card">
            <i className="bi bi-building-check about-icon icon-blue"></i>
            <h5>80+ успешных проектов</h5>
            <p>От частных квартир до промышленных объектов.</p>
          </div>
        </div>

        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="200">
          <div className="about-card">
            <i className="bi bi-award about-icon icon-purple"></i>
            <h5>Гарантия качества</h5>
            <p>
              Мы используем только сертифицированное оборудование и технологии.
            </p>
          </div>
        </div>

        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="300">
          <div className="about-card">
            <i className="bi bi-tools about-icon icon-pink"></i>
            <h5>Полный цикл работ</h5>
            <p>Проектирование, монтаж и обслуживание инженерных систем.</p>
          </div>
        </div>

        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="400">
          <div className="about-card">
            <i className="bi bi-stopwatch about-icon icon-blue"></i>
            <h5>Быстрое исполнение</h5>
            <p>От заявки до предложения всего <strong>2 дня</strong>.</p>
          </div>
        </div>

        <div className="col-md-4 mt-4" data-aos="fade-up" data-aos-delay="500">
          <div className="about-card">
            <i className="bi bi-house about-icon icon-purple"></i>
            <h5>Любые объекты</h5>
            <p>Работаем с квартирами, офисами, промышленными зданиями.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCompany