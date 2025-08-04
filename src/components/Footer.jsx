import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row footer-content">
          {/* Колонка 1: Логотип и описание */}
          <div className="col-md-4 mb-4">
            <img src="/static/images/logo.png" alt="Логотип" className="footer-logo" height="40" />
            <p className="footer-text mt-3">
              Комплексные решения для вашего комфорта. Профессиональный монтаж инженерных систем.
            </p>
          </div>

          {/* Колонка 2: Контакты */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Контакты</h5>
            <ul className="footer-list">
              <li><i className="bi bi-geo-alt"></i> г. Новосибирск, Ул. Фадеева, 1/3</li>
              <li><i className="bi bi-telephone"></i> +7 (383) 375-06-45</li>
              <li><i className="bi bi-envelope"></i> klimatvam@mail.ru</li>
            </ul>
          </div>

          {/* Виджет Я.Карт*/}
          <div className="col-md-4 mb-4">
            <h5 className="footer-title">Мы на карте</h5>
            <iframe 
              src="https://yandex.ru/map-widget/v1/?lang=ru_RU&scroll=true&source=constructor-api&um=constructor%3Acc893030c14bf1bb3e4718df989023c4176c5dc7d0eed976ec73f81254813533"
              frameBorder="0"
              allowFullScreen={true}
              width="100%"
              height="250"
              style={{ display: 'block' }}
            />
          </div>
        </div>

        {/* Копирайт */}
        <div className="copyright text-center">
          <p>© 2025 «Климат Вам». Все права защищены</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer