import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Heart, Users, Briefcase, ArrowRight, CheckCircle } from 'lucide-react'
import { useScrollAnimation, useTextRevealAnimation } from '../../hooks/useAnimations'

const FrameworkPreview = () => {
  const titleRef = useTextRevealAnimation(0.1)
  const coreRef = useScrollAnimation('scaleIn', { start: "top 85%" })
  const pillarsRef = useScrollAnimation('staggerChildren', { start: "top 80%" })
  const philosophyRef = useScrollAnimation('fadeIn', { start: "top 85%" })

  const pillars = [
    {
      icon: Brain,
      title: 'Spirituality',
      subtitle: 'Foundation of Inner Peace',
      description: 'Connecting with nature, practicing mindfulness, and embracing personal growth',
      color: 'from-cosmic-purple to-mystic-teal'
    },
    {
      icon: Heart,
      title: 'Physical & Mental Health',
      subtitle: 'Fuel for a Strong Life',
      description: 'Maintaining balanced diet, exercise, and building genuine social connections',
      color: 'from-celestial-blue to-sacred-rose'
    },
    {
      icon: Users,
      title: 'Family & Social Life',
      subtitle: 'Heart of Happiness',
      description: 'Quality time, honest communication, and celebrating relationships',
      color: 'from-sage-green to-celestial-blue'
    },
    {
      icon: Briefcase,
      title: 'Career & Wealth',
      subtitle: 'Channeling Your Potential',
      description: 'Finding mentors, mastering skills, and aligning with meaningful work',
      color: 'from-golden-wisdom to-cosmic-purple'
    }
  ]

  return (
    <section className="section-container bg-white/30">
      <div className="text-center mb-16">
        <h2 ref={titleRef} className="heading-section text-cosmic-contrast">
          The Roadmap to an Enriched Life
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cosmic-purple to-golden-wisdom mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Our comprehensive framework guides you through four essential pillars of life, 
          all built upon the foundation of deep self-awareness.
        </p>
      </div>

      {/* Core Principle */}
      <div ref={coreRef} className="card-cosmic max-w-3xl mx-auto mb-16 text-center hover-lift">
        <Brain className="w-16 h-16 text-cosmic-purple mx-auto mb-6 animate-float" />
        <h3 className="text-2xl font-heading font-semibold text-cosmic mb-4">
          Core Principle: Know Yourself (SWOT)
        </h3>
        <p className="text-gray-700 leading-relaxed">
          At the center of an enriched life lies deep <strong>self-awareness</strong>. 
          Through personal SWOT analysis—understanding your Strengths, Weaknesses, 
          Opportunities, and Threats—you can make conscious choices that align with your true self.
        </p>
      </div>

      {/* Four Pillars */}
      <div ref={pillarsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
        {pillars.map((pillar, index) => {
          const IconComponent = pillar.icon
          return (
            <div key={index} className="card-cosmic group h-full hover-lift">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 animate-glow`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-semibold text-cosmic">
                    {pillar.title}
                  </h3>
                  <p className="text-golden-wisdom font-accent text-sm">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {pillar.description}
              </p>
              
              <div className="flex items-center text-cosmic-purple text-sm font-medium">
                <CheckCircle className="w-4 h-4 mr-2" />
                Essential for holistic well-being
              </div>
            </div>
          )
        })}
      </div>

      {/* Philosophy */}
      <div ref={philosophyRef} className="bg-gradient-to-r from-cosmic-purple to-mystic-teal rounded-3xl p-8 md:p-12 text-white text-center max-w-5xl mx-auto hover-lift">
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
        
        <div className="mt-8">
          <Link
            to="/framework"
            className="inline-flex items-center bg-golden-wisdom text-cosmic-purple px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-all duration-300 hover:scale-105 group"
          >
            Explore Full Framework
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FrameworkPreview
