import React, { useState, useEffect } from 'react'
import { Heart, DollarSign, Users, Briefcase, Target, Brain, Zap, Shield } from 'lucide-react'
import { useScrollAnimation, useTextRevealAnimation, useCounterAnimation, useStaggerRevealAnimation } from '../hooks/useAnimations'

const Framework = () => {
  const [activeSection, setActiveSection] = useState(null)
  
  const heroRef = useScrollAnimation('fadeIn', { start: "top 85%", end: "bottom 15%" })
  const titleRef = useTextRevealAnimation(0.3)
  const statsRef = useStaggerRevealAnimation('.stat-card', { start: "top 75%", end: "bottom 25%" })
  const pillarsRef = useStaggerRevealAnimation('.pillar-card', { start: "top 65%", end: "bottom 35%" })
  const philosophyRef = useScrollAnimation('slideInLeft', { start: "top 70%", end: "bottom 30%" })
  
  const counter1Ref = useCounterAnimation(1000, 2, 0.2)
  const counter2Ref = useCounterAnimation(95, 2, 0.4)
  const counter3Ref = useCounterAnimation(500, 2, 0.6)

  const pillars = [
    {
      icon: Heart,
      title: "Health & Wellness",
      color: "text-sage-green",
      bgColor: "bg-sage-green/10",
      description: "Physical vitality, mental clarity, and emotional balance form the foundation of a fulfilling life.",
      aspects: ["Physical Fitness", "Mental Health", "Emotional Balance", "Spiritual Connection"],
      swotFocus: "Strength-based wellness optimization"
    },
    {
      icon: DollarSign,
      title: "Wealth & Abundance",
      color: "text-golden-wisdom",
      bgColor: "bg-golden-wisdom/10",
      description: "Financial freedom and abundance mindset that supports your life goals and aspirations.",
      aspects: ["Financial Planning", "Investment Strategy", "Abundance Mindset", "Career Growth"],
      swotFocus: "Opportunity-driven wealth building"
    },
    {
      icon: Users,
      title: "Relationships",
      color: "text-sacred-rose",
      bgColor: "bg-sacred-rose/10",
      description: "Meaningful connections, love, and supportive relationships that enrich your life journey.",
      aspects: ["Family Bonds", "Romantic Partnership", "Friendships", "Professional Networks"],
      swotFocus: "Strength-based relationship building"
    },
    {
      icon: Briefcase,
      title: "Career & Purpose",
      color: "text-celestial-blue",
      bgColor: "bg-celestial-blue/10",
      description: "Purposeful work, professional growth, and alignment with your life's mission.",
      aspects: ["Career Development", "Skill Building", "Leadership", "Life Purpose"],
      swotFocus: "Threat mitigation and opportunity leverage"
    }
  ]

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative">
      {/* Hero Section */}
      <div ref={heroRef} className="section-container">
        <div className="text-center mb-16">
          <h1 ref={titleRef} className="heading-hero text-cosmic-contrast mb-6">
            The Roadmap to an Enriched Life
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive framework for achieving balance and fulfillment 
            in all areas of your life through self-awareness and conscious living.
          </p>
          
          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card-cosmic text-center stat-card">
              <div ref={counter1Ref} className="text-4xl font-heading font-bold text-cosmic">
                0
              </div>
              <p className="text-gray-600 mt-2">Lives Transformed</p>
            </div>
            <div className="card-cosmic text-center stat-card">
              <div className="text-4xl font-heading font-bold text-cosmic">
                <span ref={counter2Ref}>0</span>%
              </div>
              <p className="text-gray-600 mt-2">Success Rate</p>
            </div>
            <div className="card-cosmic text-center stat-card">
              <div ref={counter3Ref} className="text-4xl font-heading font-bold text-cosmic">
                0
              </div>
              <p className="text-gray-600 mt-2">Reports Generated</p>
            </div>
          </div>
        </div>

        {/* Four Pillars Section */}
        <div ref={pillarsRef} className="mb-20">
          <h2 className="heading-section text-center text-cosmic mb-12">
            The Four Pillars of Life
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const isActive = activeSection === pillar.title.split(' ')[0].toLowerCase()
              return (
                <div
                  key={index}
                  className={`card-cosmic group cursor-pointer transition-all duration-500 pillar-card transform ${
                    isActive ? 'scale-105 shadow-2xl ring-2 ring-offset-2' : 'hover:scale-102'
                  }`}
                  style={{
                    ringColor: isActive ? (
                      pillar.title.includes('Health') ? '#7CB342' :
                      pillar.title.includes('Wealth') ? '#FFD700' :
                      pillar.title.includes('Relationships') ? '#E91E63' :
                      '#4A90E2'
                    ) : 'transparent'
                  }}
                  onMouseEnter={() => setActiveSection(pillar.title.split(' ')[0].toLowerCase())}
                  onMouseLeave={() => setActiveSection(null)}
                  onClick={() => setActiveSection(
                    activeSection === pillar.title.split(' ')[0].toLowerCase() ? 
                    null : 
                    pillar.title.split(' ')[0].toLowerCase()
                  )}
                >
                <div className="flex items-start space-x-4">
                  <div className={`${pillar.bgColor} p-4 rounded-xl transition-all duration-300 ${
                    isActive ? 'scale-110 shadow-lg' : ''
                  }`}>
                    <pillar.icon className={`w-8 h-8 ${pillar.color} transition-all duration-300 ${
                      isActive ? 'scale-110' : ''
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`heading-subsection mb-3 transition-all duration-300 ${
                      isActive ? 'text-indigo-700' : 'text-cosmic'
                    }`}>
                      {pillar.title}
                      {isActive && <span className="ml-2 text-sm">✨</span>}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {pillar.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {pillar.aspects.map((aspect, aspectIndex) => (
                        <div
                          key={aspectIndex}
                          className={`text-sm text-gray-500 flex items-center transition-all duration-300 ${
                            isActive ? 'text-gray-700 font-medium' : ''
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                            pillar.color.replace('text-', 'bg-')
                          } ${isActive ? 'scale-125 shadow-md' : ''}`} />
                          {aspect}
                        </div>
                      ))}
                    </div>
                    <div className={`${pillar.bgColor} p-3 rounded-lg transition-all duration-300 ${
                      isActive ? 'shadow-md border-l-4' : ''
                    }`}
                      style={{
                        borderLeftColor: isActive ? (
                          pillar.title.includes('Health') ? '#7CB342' :
                          pillar.title.includes('Wealth') ? '#FFD700' :
                          pillar.title.includes('Relationships') ? '#E91E63' :
                          '#4A90E2'
                        ) : 'transparent'
                      }}
                    >
                      <p className="text-sm font-medium text-gray-700">
                        <strong>SWOT Focus:</strong> {pillar.swotFocus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              )
            })}
          </div>
        </div>

        {/* Philosophy Section */}
        <div ref={philosophyRef} className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-section text-cosmic mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cosmic-purple/10 p-3 rounded-xl">
                    <Target className="w-6 h-6 text-cosmic-purple" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Holistic Integration
                    </h3>
                    <p className="text-gray-600">
                      True fulfillment comes from balancing all four pillars simultaneously, 
                      not focusing on just one area.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-golden-wisdom/10 p-3 rounded-xl">
                    <Brain className="w-6 h-6 text-golden-wisdom" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Self-Awareness First
                    </h3>
                    <p className="text-gray-600">
                      Understanding your strengths, weaknesses, opportunities, and threats 
                      is the foundation of all growth.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-celestial-blue/10 p-3 rounded-xl">
                    <Zap className="w-6 h-6 text-celestial-blue" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Action-Oriented Growth
                    </h3>
                    <p className="text-gray-600">
                      Knowledge without action is powerless. Our framework provides 
                      clear, actionable steps for transformation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-sacred-rose/10 p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-sacred-rose" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Sustainable Development
                    </h3>
                    <p className="text-gray-600">
                      Lasting change requires sustainable practices that align with 
                      your authentic self and life circumstances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cosmic-purple/5 to-golden-wisdom/5 p-8 rounded-2xl">
              <h3 className="heading-subsection text-cosmic mb-6 text-center">
                Framework Benefits
              </h3>
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Personalized Insights</h4>
                  <p className="text-sm text-gray-600">
                    Every recommendation is tailored to your unique numerological profile
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Measurable Progress</h4>
                  <p className="text-sm text-gray-600">
                    Track your growth with clear metrics and milestones
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl">
                  <h4 className="font-semibold text-cosmic mb-2">Ongoing Support</h4>
                  <p className="text-sm text-gray-600">
                    Continuous guidance and updates as you evolve and grow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mb-20">
          <div className="card-cosmic max-w-2xl mx-auto">
            <h2 className="heading-subsection text-cosmic mb-4">
              Ready to Transform Your Life?
            </h2>
            <p className="text-gray-600 mb-6">
              Get your personalized numerology-based self-awareness report and start 
              your journey toward a more enriched and balanced life.
            </p>
            <button className="btn-primary">
              Get Your Personal Report - ₹499
            </button>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="heading-section text-cosmic">
              Your Journey to Self-Discovery
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cosmic-purple to-golden-wisdom mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our comprehensive framework guides you through four essential pillars of life, 
              all built upon the foundation of deep self-awareness.
            </p>
          </div>

          {/* Core Principle */}
          <div className="card-cosmic max-w-3xl mx-auto mb-16 text-center">
            <Brain className="w-16 h-16 text-cosmic-purple mx-auto mb-6" />
            <h3 className="text-2xl font-heading font-semibold text-cosmic mb-4">
              Core Principle: Know Yourself (SWOT)
            </h3>
            <p className="text-gray-700 leading-relaxed">
              At the center of an enriched life lies deep <strong>self-awareness</strong>. 
              Through personal SWOT analysis—understanding your Strengths, Weaknesses, 
              Opportunities, and Threats—you can make conscious choices that align with your true self.
            </p>
          </div>

          {/* Roadmap Philosophy */}
          <div className="bg-gradient-to-r from-cosmic-purple to-mystic-teal rounded-3xl p-8 md:p-12 text-white text-center max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-semibold mb-6">
              ✅ The Philosophy: No Need to Sacrifice Anything
            </h3>
            
            <p className="text-lg md:text-xl leading-relaxed mb-8 text-white/90">
              This model encourages <strong>holistic balance</strong>, where no part of life is neglected. 
              By knowing yourself first, you can integrate spirituality, health, relationships, 
              and career without compromising one for the other.
            </p>
            
            <div className="card-cosmic bg-white/10 backdrop-blur-sm border-white/20 inline-block">
              <p className="text-golden-wisdom font-accent text-lg mb-2">
                "This framework is a living model"
              </p>
              <p className="text-white/90">
                Shaped by real-life insights and open to refinement as we grow. 
                It's a tool to reflect, realign, and reimagine your life at every stage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Framework
