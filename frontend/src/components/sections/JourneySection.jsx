import React from 'react'
import { BookOpen, Users, Lightbulb, Star } from 'lucide-react'

const JourneySection = () => {
  const journeySteps = [
    {
      icon: BookOpen,
      title: 'Traditional Tools',
      description: 'Started with SWOT analysis and Johari Window for employability training',
      year: '2012-2018'
    },
    {
      icon: Lightbulb,
      title: 'Deeper Exploration',
      description: 'Discovered the missing piece - intuitive understanding through ancient sciences',
      year: '2018-2020'
    },
    {
      icon: Star,
      title: 'Numerology Integration',
      description: 'Explored numerology and astrology to enhance traditional self-assessment',
      year: '2020-2023'
    },
    {
      icon: Users,
      title: 'Holistic Approach',
      description: 'Developed comprehensive Self-Awareness Reports merging all insights',
      year: '2023-Present'
    }
  ]

  return (
    <section className="section-container bg-white/50">
      <div className="text-center mb-16">
        <h2 className="heading-section text-cosmic-contrast">
          How My Journey into Self-Awareness Began
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cosmic-purple to-golden-wisdom mx-auto mb-8"></div>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Working in the field of employability for the past decade, I regularly used tools 
          like SWOT analysis and the Johari Window. While valuable, I felt something deeper 
          was missing—something that could offer a more personal and intuitive understanding.
        </p>
      </div>

      {/* Journey Timeline */}
      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-1 bg-gradient-to-b from-cosmic-purple via-celestial-blue to-golden-wisdom"></div>

          {journeySteps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 0

            return (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-golden-wisdom rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content Card */}
                <div className={`flex-1 ml-20 md:ml-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="card-cosmic group">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cosmic-purple to-celestial-blue rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-cosmic">
                          {step.title}
                        </h3>
                        <span className="text-sm text-golden-wisdom font-semibold">
                          {step.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Journey Outcome */}
      <div className="mt-16 text-center">
        <div className="card-cosmic max-w-3xl mx-auto">
          <h3 className="text-2xl font-heading font-semibold text-cosmic mb-4">
            The Vision Realized
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            With this vision in mind, I developed a new concept: a structured, three-page 
            Self-Awareness Report that merges numerology, astrology, and psychological tools 
            to empower individuals with clarity, direction, and confidence in their personal 
            and professional lives.
          </p>
        </div>
      </div>
    </section>
  )
}

export default JourneySection
