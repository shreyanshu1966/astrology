import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Framework from './pages/Framework'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/framework" element={<Framework />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
