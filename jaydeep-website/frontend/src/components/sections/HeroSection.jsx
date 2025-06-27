import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Sparkles, ArrowRight } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-gradient">
        <div className="absolute inset-0 sacred-geometry opacity-20"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-golden-wisdom animate-float">
        <Star className="w-8 h-8" />
      </div>
      <div className="absolute top-40 right-20 text-golden-wisdom animate-float" style={{ animationDelay: '2s' }}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-40 left-20 text-golden-wisdom animate-float" style={{ animationDelay: '4s' }}>
        <Star className="w-6 h-6" />
      </div>
      <div className="absolute bottom-20 right-10 text-golden-wisdom animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-8 h-8" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="heading-hero mb-6 leading-tight">
            Discover the Most Accurate Map to{' '}
            <span className="text-golden font-accent">Your</span>{' '}
            Inner Self
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Empowering individuals to achieve self-awareness and personal growth through 
            numerology, astrology, and self-awareness tools
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              to="/services"
              className="btn-primary group"
            >
              Get Your Personal Report
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/framework"
              className="btn-secondary"
            >
              Explore Our Framework
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-golden-wisdom font-accent text-lg mb-2">
              ✨ Introductory Offer - Just ₹99! ✨
            </p>
            <p className="text-white/80 text-sm">
              Not a prediction — A self-revelation!
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
