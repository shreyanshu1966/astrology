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
          
          <div className="card-cosmic bg-gradient-to-r from-celestial-blue/10 to-sacred-rose/10 border-celestial-blue/20 mb-8">
            <p className="text-2xl font-heading font-semibold text-cosmic">
              👉 <em>Knowing yourself is the first step toward transforming your life.</em>
            </p>
          </div>
        </div>

        {/* Report Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* What's Included */}
          <div className="card-cosmic">
            <h3 className="text-2xl font-heading font-semibold text-cosmic mb-6">
              🎯 Your 3-Page Personalized Report Includes:
            </h3>
            
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-sage-green flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 leading-relaxed">
                    🔹 <strong>{benefit}</strong>
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-cosmic-purple/5 rounded-xl border border-cosmic-purple/20">
              <p className="text-cosmic-purple font-semibold text-center">
                This isn't about telling you <em>what will happen</em>.<br />
                This is about helping you <strong>understand who you are</strong>.
              </p>
            </div>
          </div>

          {/* Pricing & Guarantees */}
          <div className="card-cosmic bg-gradient-to-br from-golden-wisdom/10 to-cosmic-purple/10 border-golden-wisdom/30">
            <div className="text-center mb-8">
              <div className="inline-block bg-gradient-to-r from-cosmic-purple to-golden-wisdom text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
                💫 INTRODUCTORY OFFER
              </div>
              
              <div className="mb-6">
                <span className="text-5xl font-heading font-bold text-cosmic">₹99</span>
                <span className="text-lg text-gray-500 line-through ml-2">₹299</span>
              </div>
              
              <p className="text-gray-600 mb-6">
                All I need is:<br />
                📝 Your <strong>Name</strong><br />
                📅 Your <strong>Date of Birth</strong>
              </p>
            </div>

            {/* Guarantees */}
            <div className="space-y-3 mb-8">
              {guarantees.map((guarantee, index) => {
                const IconComponent = guarantee.icon
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-5 h-5 text-sage-green" />
                    <span className="text-gray-700 text-sm">✅ {guarantee.text}</span>
                  </div>
                )
              })}
            </div>

            <Link
              to="/services"
              className="btn-primary w-full text-center group mb-4"
            >
              Get Your Personalized Report Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <p className="text-center text-sm text-gray-500">
              No questions asked money-back guarantee
            </p>
          </div>
        </div>

        {/* Why Choose This Report */}
        <div className="card-cosmic bg-white text-center">
          <h3 className="text-2xl font-heading font-semibold text-cosmic mb-8">
            Why Choose This Report?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-sage-green" />
                <span className="font-semibold text-gray-700">Built on modern self-analysis tools</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-sage-green" />
                <span className="font-semibold text-gray-700">Enhanced with ancient wisdom</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-sage-green" />
                <span className="font-semibold text-gray-700">Perfect for personal growth seekers</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-sage-green" />
                <span className="font-semibold text-gray-700">Provides career & life clarity</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-cosmic-purple/5 to-golden-wisdom/5 rounded-xl">
            <p className="text-xl font-accent text-cosmic italic">
              "Know yourself. Grow yourself."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
