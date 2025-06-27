import React, { useState, useRef } from 'react'
import { 
  FileText, 
  Download, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  Heart,
  TrendingUp,
  Users,
  Target,
  Sparkles
} from 'lucide-react'
import CosmicBackground from '../components/three/CosmicBackground'

import SelfAssessmentTool from '../components/interactive/SelfAssessmentTool'
import EnhancedSelfAssessmentTool from '../components/interactive/EnhancedSelfAssessmentTool'
import WebGLErrorBoundary from '../components/WebGLErrorBoundary'
import { useScrollAnimation, useHoverAnimation, useTextRevealAnimation } from '../hooks/useAnimations'

const Services = () => {
  const [selectedPackage, setSelectedPackage] = useState('comprehensive')
  const [showSampleReport, setShowSampleReport] = useState(false)
  
  const heroRef = useScrollAnimation('fadeIn')
  const titleRef = useTextRevealAnimation(0.2)
  const servicesRef = useScrollAnimation('staggerChildren')
  const processRef = useScrollAnimation('slideInLeft', { start: "top 75%" })
  const pricingRef = useScrollAnimation('scaleIn', { start: "top 80%" })
  const guaranteeRef = useScrollAnimation('fadeIn', { start: "top 85%" })
  
  const hoverRef1 = useHoverAnimation(1.03)
  const hoverRef2 = useHoverAnimation(1.03)
  const hoverRef3 = useHoverAnimation(1.03)

  const services = [
    {
      icon: FileText,
      title: "Comprehensive Self-Awareness Report",
      description: "Deep dive into your personality, strengths, challenges, and life path through detailed numerological analysis.",
      features: [
        "50+ page detailed report",
        "Life path number analysis",
        "Personality traits breakdown",
        "Career guidance",
        "Relationship compatibility",
        "Health & wellness insights"
      ],
      price: "₹1,999",
      originalPrice: "₹4,999",
      popular: true
    },
    {
      icon: Calculator,
      title: "Quick Numerology Assessment",
      description: "Essential numerological insights to understand your core personality and immediate guidance for key decisions.",
      features: [
        "15-page focused report",
        "Core numbers analysis",
        "Personality overview",
        "Immediate action steps",
        "Key strength identification"
      ],
      price: "₹99",
      originalPrice: "₹499",
      popular: false
    },
    {
      icon: TrendingUp,
      title: "Annual Life Forecast",
      description: "Year-ahead predictions and guidance based on your personal numerological cycles and planetary influences.",
      features: [
        "12-month detailed forecast",
        "Monthly guidance",
        "Key dates and opportunities",
        "Challenge periods navigation",
        "Goal achievement timeline"
      ],
      price: "₹2,999",
      originalPrice: "₹6,999",
      popular: false
    }
  ]

  const reportSections = [
    {
      icon: Target,
      title: "Life Path Analysis",
      description: "Discover your soul's purpose and the lessons you're here to learn"
    },
    {
      icon: Heart,
      title: "Personality Profile",
      description: "Deep insights into your character, motivations, and behavioral patterns"
    },
    {
      icon: Users,
      title: "Relationship Compatibility",
      description: "Understand your relationship patterns and find compatible partners"
    },
    {
      icon: TrendingUp,
      title: "Career & Success",
      description: "Identify your ideal career path and success strategies"
    }
  ]

  const processSteps = [
    {
      step: "1",
      title: "Provide Your Details",
      description: "Share your full name, date of birth, and specific questions you'd like addressed"
    },
    {
      step: "2",
      title: "Numerological Analysis",
      description: "Our expert analyzes your numbers using advanced numerological techniques"
    },
    {
      step: "3",
      title: "Report Generation",
      description: "Your personalized report is created with detailed insights and recommendations"
    },
    {
      step: "4",
      title: "Delivery & Support",
      description: "Receive your report via email with ongoing support for questions"
    }
  ]

  return (
    <div className="min-h-screen pt-20 cosmic-bg relative">
      <WebGLErrorBoundary>
        <CosmicBackground intensity={0.5} />
      </WebGLErrorBoundary>
      
      {/* Hero Section */}
      <div ref={heroRef} className="section-container">
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="heading-hero text-cosmic-contrast mb-6">
            Transform Your Life with Personalized Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover the most accurate map to your inner self through our 
            personalized numerology-based self-awareness reports.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Shield className="w-5 h-5 mr-2 text-sage-green" />
              Money-back Guarantee
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-celestial-blue" />
              24-48 Hour Delivery
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-golden-wisdom" />
              500+ Satisfied Clients
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              ref={index === 0 ? hoverRef1 : index === 1 ? hoverRef2 : hoverRef3}
              className={`card-cosmic relative ${service.popular ? 'ring-2 ring-golden-wisdom' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-golden-wisdom text-cosmic-purple px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <div className="bg-cosmic-purple/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-cosmic-purple" />
                </div>
                <h3 className="heading-subsection text-cosmic mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
              </div>
              
              <div className="text-center mb-6">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-3xl font-heading font-bold text-cosmic">
                    {service.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {service.originalPrice}
                  </span>
                </div>
                <p className="text-sm text-sage-green font-semibold">
                  Limited Time Offer
                </p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-3 text-sage-green flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full ${service.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedPackage(service.title)}
              >
                Choose This Package
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Numerology Visualization */}
      
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-section text-cosmic mb-4">
              Try Our Quick Self-Assessment
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a taste of our personalized insights with this interactive tool that 
              reveals your primary life focus area.
            </p>
          </div>
          
          <EnhancedSelfAssessmentTool />
        </div>

        {/* Sample Report Preview */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="heading-section text-cosmic mb-4">
              What's Inside Your Report?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Get a glimpse of the comprehensive insights waiting for you
            </p>
            <button
              className="btn-secondary"
              onClick={() => setShowSampleReport(!showSampleReport)}
            >
              {showSampleReport ? 'Hide' : 'View'} Sample Report
              <Download className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          {showSampleReport && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-cosmic animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportSections.map((section, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-cosmic-purple/10 p-3 rounded-xl">
                      <section.icon className="w-6 h-6 text-cosmic-purple" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-2 text-cosmic">
                        {section.title}
                      </h3>
                      <p className="text-gray-600">
                        {section.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-cosmic-purple/5 to-golden-wisdom/5 rounded-xl">
                <h4 className="font-heading font-semibold text-lg mb-3 text-cosmic">
                  Sample Insight Preview:
                </h4>
                <div className="italic text-gray-700 leading-relaxed">
                  "Your Life Path Number 7 reveals a natural inclination toward deep thinking and spiritual 
                  exploration. You possess an analytical mind that seeks truth beyond surface appearances. 
                  This year, focus on developing your intuitive abilities while maintaining practical 
                  grounding in your career..."
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Process Section */}
        <div ref={processRef} className="mb-20">
          <h2 className="heading-section text-center text-cosmic mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-cosmic-purple text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <h3 className="font-heading font-semibold text-lg mb-3 text-cosmic">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing CTA */}
        <div ref={pricingRef} className="mb-20">
          <div className="card-cosmic max-w-4xl mx-auto text-center">
            <h2 className="heading-section text-cosmic mb-6">
              Special Launch Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl font-heading font-bold text-cosmic mb-4">
                  ₹99
                </div>
                <div className="text-xl text-gray-400 line-through mb-2">₹499</div>
                <div className="text-sage-green font-semibold mb-4">80% OFF - Limited Time</div>
                <p className="text-gray-600 mb-6">
                  Get your complete numerology-based self-awareness report at an 
                  unbeatable introductory price.
                </p>
                <button className="btn-primary text-lg px-8 py-4">
                  Get Your Report Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
              <div className="text-left">
                <h3 className="font-heading font-semibold text-lg mb-4 text-cosmic">
                  What You Get:
                </h3>
                <ul className="space-y-3">
                  {[
                    "15+ page personalized report",
                    "Life path and personality analysis",
                    "Career and relationship guidance",
                    "Actionable improvement strategies",
                    "Email support for questions",
                    "Money-back guarantee"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 mr-3 text-sage-green" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Section */}
        <div ref={guaranteeRef} className="text-center">
          <div className="card-cosmic max-w-2xl mx-auto">
            <div className="bg-sage-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-sage-green" />
            </div>
            <h2 className="heading-subsection text-cosmic mb-4">
              100% Satisfaction Guarantee
            </h2>
            <p className="text-gray-600 mb-6">
              We're so confident in the value of your personalized report that we offer 
              a full money-back guarantee. If you're not completely satisfied within 30 days, 
              we'll refund your payment, no questions asked.
            </p>
            <div className="text-sm text-gray-500">
              *Terms and conditions apply. See our refund policy for details.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
