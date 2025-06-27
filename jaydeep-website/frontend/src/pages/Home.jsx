import React from 'react'
import HeroSection from '../components/sections/HeroSection'
import VisionSection from '../components/sections/VisionSection'
import JourneySection from '../components/sections/JourneySection'
import AboutSection from '../components/sections/AboutSection'
import FrameworkPreview from '../components/sections/FrameworkPreview'
import CTASection from '../components/sections/CTASection'

const Home = () => {
  return (
    <div className="cosmic-bg">
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
