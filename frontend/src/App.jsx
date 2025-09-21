import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Framework from './pages/Framework'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import Terms from './pages/Terms'
import Refunds from './pages/Refunds'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentTest from './pages/PaymentTest'
import useRouteBasedWebGLCleanup from './hooks/useRouteBasedWebGLCleanup'
import { fontManager } from './utils/fontManager'

// Inner App component that uses router hooks
function AppRoutes() {
  // Initialize WebGL cleanup system (inside Router context)
  useRouteBasedWebGLCleanup()
  
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/framework" element={<Framework />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/payment/success" element={
          <ErrorBoundary>
            <PaymentSuccess />
          </ErrorBoundary>
        } />
        <Route path="/payment/test" element={
          <ErrorBoundary>
            <PaymentTest />
          </ErrorBoundary>
        } />
      </Routes>
    </Layout>
  )
}

function App() {
  // Initialize font loading with error handling
  useEffect(() => {
    fontManager.initializeFonts().catch((error) => {
      console.warn('Font loading failed, using fallbacks:', error)
    })
  }, [])
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
