import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import VisionSection from '../components/sections/VisionSection'
import JourneySection from '../components/sections/JourneySection'
import AboutSection from '../components/sections/AboutSection'
import FrameworkPreview from '../components/sections/FrameworkPreview'
import CTASection from '../components/sections/CTASection'
import CosmicBackground from '../components/three/CosmicBackground'
import WebGLErrorBoundary from '../components/WebGLErrorBoundary'

const Home = () => {
  return (
    <div className="cosmic-bg relative">
      <WebGLErrorBoundary>
        <CosmicBackground intensity={0.8} />
      </WebGLErrorBoundary>
      <HeroSection />
      <VisionSection />
      <JourneySection />
      <AboutSection />
      <FrameworkPreview />
      <CTASection />
    </div>
  )
}

export default Home
