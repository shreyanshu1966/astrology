import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, Sparkles, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'

const HeroSection = () => {
  const heroRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()
  const offerRef = useRef()

  useEffect(() => {
    // Set initial state for smooth animation
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, offerRef.current], {
      opacity: 0,
      y: 60,
      scale: 0.95
    })
    
    const tl = gsap.timeline({ 
      defaults: { 
        ease: "power3.out",
        duration: 1.2 
      }
    })
    
    // Smooth sequential animation with better timing
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: "power3.out"
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.out"
    }, "-=0.8")
    .to(ctaRef.current.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)"
    }, "-=0.6")
    .to(offerRef.current, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")

    // Smooth floating elements animation
    gsap.to(".floating-element", {
      y: "random(-15, 15)",
      x: "random(-8, 8)",
      rotation: "random(-10, 10)",
      duration: "random(4, 7)",
      ease: "sine.inOut",
      stagger: {
        amount: 1,
        from: "random"
      },
      repeat: -1,
      yoyo: true
    })

    // Add a subtle breathing effect to the hero content
    gsap.to(heroRef.current, {
      scale: 1.005,
      duration: 4,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: 2
    })
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-hero-gradient">
        <div className="absolute inset-0 sacred-geometry opacity-20"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-golden-wisdom/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-celestial-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-sacred-rose/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Enhanced Floating Elements */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 text-golden-wisdom floating-element">
        <Star className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      <div className="absolute top-32 sm:top-40 right-10 sm:right-20 text-golden-wisdom floating-element">
        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>
      <div className="absolute bottom-32 sm:bottom-40 left-10 sm:left-20 text-golden-wisdom floating-element">
        <Star className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>
      <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 text-golden-wisdom floating-element">
        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      
      {/* Additional floating elements for larger screens */}
      <div className="hidden lg:block absolute top-1/3 left-1/2 text-golden-wisdom/50 floating-element">
        <Star className="w-4 h-4" />
      </div>
      <div className="hidden lg:block absolute bottom-1/2 left-1/4 text-golden-wisdom/30 floating-element">
        <Sparkles className="w-3 h-3" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-6xl mx-auto">
        <div>
          <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6 text-white drop-shadow-lg">
            Discover the Most Accurate Map to{' '}
            <span className="text-golden-wisdom font-accent drop-shadow-lg">Your</span>{' '}
            Inner Self
          </h1>
          
          <p ref={subtitleRef} className="text-lg sm:text-xl lg:text-2xl mb-8 text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium">
            Empowering individuals to achieve self-awareness and personal growth through 
            numerology, astrology, and self-awareness tools
          </p>

            <div ref={offerRef} className="text-center mt-8">
            <p className="text-golden-wisdom font-accent text-lg sm:text-xl mb-3 font-bold drop-shadow-lg">
              ✨ Introductory Offer - Just ₹499! ✨
            </p>
            <p className="text-white/90 text-sm sm:text-base font-medium drop-shadow-md">
              Not a prediction — A self-revelation!
            </p>
          </div>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
            <Link
              to="/services"
              className="btn-primary group w-full sm:w-auto text-center font-semibold"
            >
              Get Your Personal Report
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/framework"
              className="btn-secondary w-full sm:w-auto text-center font-semibold"
            >
              Explore Our Framework
            </Link>
          </div>
          
        
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
        <p className="text-white/50 text-xs mt-2 hidden sm:block">Scroll to explore</p>
      </div>

      {/* Gradient Overlay for Better Text Readability on Mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 sm:hidden"></div>
    </section>
  )
}

export default HeroSection
