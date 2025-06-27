import React from 'react'
import { Eye, Heart, Users, Target } from 'lucide-react'

const VisionSection = () => {
  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h2 className="heading-section text-cosmic">
          Our Vision & Mission
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cosmic-purple to-golden-wisdom mx-auto mb-8"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Vision */}
        <div className="card-cosmic group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cosmic-purple to-mystic-teal rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="heading-subsection text-cosmic mb-0">
              Vision Statement
            </h3>
          </div>
          
          <p className="text-body text-gray-700 leading-relaxed">
            Empowering individuals to achieve self-awareness and personal growth through 
            a blend of numerology, astrology, and self-awareness tools, fostering a 
            compassionate community and inspiring a life of fulfillment and happiness.
          </p>
        </div>

        {/* Mission */}
        <div className="card-cosmic group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-celestial-blue to-sacred-rose rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="heading-subsection text-cosmic mb-0">
              Mission Statement
            </h3>
          </div>
          
          <p className="text-body text-gray-700 leading-relaxed">
            To provide insightful and accessible self-awareness content through numerology, 
            astrology, and other personal development tools, supporting our community in 
            their journeys towards a balanced, joyful life.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-20">
        <h3 className="text-2xl font-heading font-semibold text-center text-cosmic mb-12">
          Our Core Values
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-sage-green to-celestial-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-lg font-heading font-semibold text-cosmic mb-2">
              Compassion
            </h4>
            <p className="text-gray-600">
              Approaching every interaction with empathy and understanding
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-cosmic-purple to-sacred-rose rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-lg font-heading font-semibold text-cosmic mb-2">
              Insight
            </h4>
            <p className="text-gray-600">
              Providing deep, meaningful revelations for personal growth
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-golden-wisdom to-sage-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-lg font-heading font-semibold text-cosmic mb-2">
              Community
            </h4>
            <p className="text-gray-600">
              Building a supportive environment for collective growth
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisionSection
