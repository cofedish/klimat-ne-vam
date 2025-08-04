import React, { useEffect } from 'react'
import AOS from 'aos'
import Navigation from './components/Navigation'
import AboutCompany from './components/AboutCompany'
import Services from './components/Services'
import Projects from './components/Projects'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    })
  }, [])

  return (
    <div className="App">
      <Navigation />
      
      <div className="section-gap1"></div>
      <AboutCompany />
      
      <div className="section-gap1"></div>
      <Services />
      
      <div className="section-gap1"></div>
      <Projects />
      <Clients />
      <Contact />
      <Footer />
    </div>
  )
}

export default App