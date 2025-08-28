import React from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, CheckCircle, Gift, Shield } from 'lucide-react'

const CTASection = () => {
  const benefits = [
    'Your Core Strengths & Hidden Challenges',
    'Life Path and Purpose Insights',
    'Career Direction & Health Guidance',
    'Lucky Day, Date, Color & Year',
    'Mindset Development Strategies'
  ]

  const guarantees = [
    {
      icon: CheckCircle,
      text: 'Designed for clarity, not prediction'
    },
    {
      icon: Shield,
      text: '100% money-back guarantee'
    },
    {
      icon: Gift,
      text: 'No costly remedies required'
    }
  ]

  return (
    <section className="section-container">
      <div className="max-w-5xl mx-auto">
        {/* Main CTA */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-golden-wisdom animate-pulse" />
              <Star className="w-10 h-10 text-golden-wisdom animate-pulse" style={{ animationDelay: '0.5s' }} />
              <Star className="w-8 h-8 text-golden-wisdom animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <h2 className="heading-section text-cosmic-contrast mb-6">
            🌟 Discover the Most Accurate Map to <em className="font-accent text-golden-wisdom">Your</em> Inner Self 🌟
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Over the last <strong>10+ years</strong> of my journey in the training and education field, 
            I've seen one powerful truth:
          </p>
          
          
        </div>

        

        
      </div>
    </section>
  )
}

export default CTASection
