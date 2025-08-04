import React, { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Валидация
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Заполните все поля!')
      return
    }

    const payload = {
      name: formData.name.trim(),
      phone_number: formData.phone.trim(),
      type_of_service: 'all'
    }

    try {
      setIsSubmitting(true)

      // Отправка на API
      const response = await fetch('https://api.climatvam-nsk.ru/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!response.ok) throw new Error('Ошибка сервера')

      alert('Заявка отправлена, совсем скоро мы с вами свяжемся!')
      setFormData({ name: '', phone: '' })

    } catch (error) {
      alert('Ошибка: ' + error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="section-gap1"></div>

      <section className="contact container my-5" id="contact">
        <div className="text-center mb-4">
          <h2 className="section-title" data-aos="fade-down">Связаться с нами</h2>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="contact-wrapper text-center" data-aos="fade-down" data-aos-delay="100">
              <h2 className="contact-subtitle">Оставьте заявку, и мы скоро свяжемся с Вами!</h2>

              <form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="Ваше имя" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control" 
                      placeholder="Номер телефона" 
                      pattern="\+?[0-9\s\-\(\)]+" 
                      required 
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="btn-submit mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact