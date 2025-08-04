import React, { useEffect } from 'react'

const Clients = () => {
  const clients = [
    'client1.png', 'client2.png', 'client3.png',
    'client4.png', 'client5.png', 'client6.png',
    'client7.png', 'client8.png', 'client9.png'
  ]

  useEffect(() => {
    const track = document.getElementById('clientsTrack')
    if (!track) return

    // Дублируем массив для бесконечности
    const doubleClients = [...clients, ...clients]

    // Генерация HTML
    track.innerHTML = doubleClients.map(logo => `
      <img src="/static/images/clients/${logo}"
           class="client-logo"
           alt="Логотип клиента">
    `).join('')

    // Drag-прокрутка
    let isDown = false
    let startX
    let scrollLeft

    const handleMouseDown = (e) => {
      isDown = true
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
    }

    const handleMouseLeave = () => isDown = false
    const handleMouseUp = () => isDown = false

    const handleMouseMove = (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 2
      track.scrollLeft = scrollLeft - walk
    }

    track.addEventListener('mousedown', handleMouseDown)
    track.addEventListener('mouseleave', handleMouseLeave)
    track.addEventListener('mouseup', handleMouseUp)
    track.addEventListener('mousemove', handleMouseMove)

    return () => {
      track.removeEventListener('mousedown', handleMouseDown)
      track.removeEventListener('mouseleave', handleMouseLeave)
      track.removeEventListener('mouseup', handleMouseUp)
      track.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section className="clients container my-5" id="clients">
      <div className="text-center mb-4">
        <h2 className="clients-title" data-aos="fade-down">Наши клиенты</h2>
        <p className="clients-description" data-aos="fade-down" data-aos-delay="100">
          Компании, которые доверили нам свои проекты
        </p>
      </div>

      {/* Контейнер для ленты */}
      <div className="clients-track-wrapper">
        <div className="clients-track" id="clientsTrack">
          {/* Логотипы будут добавлены динамически */}
        </div>
      </div>
    </section>
  )
}

export default Clients