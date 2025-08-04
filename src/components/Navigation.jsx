import React, { useEffect, useState } from 'react'

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const navbar = document.querySelector('.navbar')
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-link')

    // Фиксируем шапку всегда вверху
    if (navbar) {
      navbar.style.position = 'fixed'
      navbar.style.top = '0'
      navbar.style.left = '0'
      navbar.style.right = '0'
      document.body.style.paddingTop = navbar.offsetHeight + 'px'
    }

    // Подсветка активного раздела
    const handleScroll = () => {
      let current = ''
      const navbarHeight = navbar ? navbar.offsetHeight : 0

      sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight
        if (window.pageYOffset >= sectionTop - 50) {
          current = section.getAttribute('id')
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetSection = document.querySelector(targetId)
    const navbar = document.querySelector('.navbar')
    
    if (targetSection && navbar) {
      window.scrollTo({
        top: targetSection.offsetTop - navbar.offsetHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/static/images/logo.png" alt="Логотип" height="40" />
          </a>
          <button 
            className="navbar-toggler" 
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCustom"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCustom">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                >
                  О компании
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                >
                  Услуги
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                >
                  Наши проекты
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'clients' ? 'active' : ''}`}
                  href="#clients"
                  onClick={(e) => handleNavClick(e, '#clients')}
                >
                  Наши клиенты
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Связаться с нами
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Карусель */}
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="5000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/static/images/electro.jpg" className="d-block w-100" alt="Электрика" />
            <div className="carousel-caption">
              <h1>Электрика</h1>
              <p>Современные решения для вашего дома и бизнеса</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/static/images/conditioner.jpg" className="d-block w-100" alt="Вентиляция" />
            <div className="carousel-caption">
              <h1>Вентиляция</h1>
              <p>Чистый воздух и комфорт в любое время года</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/static/images/hero2.jpg" className="d-block w-100" alt="Кондиционирование" />
            <div className="carousel-caption">
              <h1>Кондиционеры</h1>
              <p>Охлаждение и тепло по вашим правилам</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Предыдущий</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Следующий</span>
        </button>
      </div>
    </>
  )
}

export default Navigation