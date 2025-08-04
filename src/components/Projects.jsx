import React, { useEffect } from 'react'

const Projects = () => {
  const projects = [
    {
      image: "/static/images/projects/project1_1.jpg",
      title: "Монтаж электропроводки в жилом помещении",
      description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
    },
    {
      image: "/static/images/projects/project1_2.jpg",
      title: "Монтаж электропроводки в жилом помещении",
      description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
    },
    {
      image: "/static/images/projects/project1_3.jpg",
      title: "Монтаж электропроводки в жилом помещении",
      description: "Комплексный монтаж электропроводки в трехкомнатной квартире с установкой распределительного щитка и защитных автоматов."
    },
    {
      image: "/static/images/projects/project2_1.jpg",
      title: "Проектирование и установка вентиляционной системы промышленного объекта",
      description: "Проектирование и монтаж системы вентиляции в промышленном здании, улучшение воздухообмена и качества воздуха."
    },
    {
      image: "/static/images/projects/project2_2.jpg",
      title: "Проектирование и установка вентиляционной системы промышленного объекта",
      description: "Проектирование и монтаж системы вентиляции в промышленном здании, улучшение воздухообмена и качества воздуха."
    },
    {
      image: "/static/images/projects/project3_1.jpg",
      title: "Котельная в частном доме с современной инженерной системой",
      description: "Полная установка газового котла, бойлера, системы водоочистки Geyser и автоматики. Продуманный монтаж и аккуратная разводка."
    }
  ]

  useEffect(() => {
    // Инициализация Bootstrap карусели
    const carouselElement = document.querySelector('#projectsCarousel')
    if (carouselElement && window.bootstrap) {
      new window.bootstrap.Carousel(carouselElement, {
        interval: 5000,
        wrap: true
      })
    }
  }, [])

  return (
    <section className="projects container my-5" id="projects">
      <div className="text-center mb-4">
        <h2 className="projects-title" data-aos="fade-down">Примеры наших работ</h2>
        <p className="description" data-aos="fade-down" data-aos-delay="200">
          Ознакомьтесь с нашими лучшими реализованными проектами.
        </p>
      </div>

      <div id="projectsCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          {projects.map((project, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="5000">
              <div className="row align-items-center project-item" data-aos="fade-up">
                <div className="col-md-6">
                  <img src={project.image} className="project-img img-fluid" alt={project.title} />
                </div>
                <div className="col-md-6 project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопки навигации */}
        <button className="carousel-control-prev" type="button" data-bs-target="#projectsCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#projectsCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  )
}

export default Projects