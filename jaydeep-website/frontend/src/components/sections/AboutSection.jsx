import React from 'react'
import { GraduationCap, Users, BookOpen, Heart, Award, Sparkles } from 'lucide-react'

const AboutSection = () => {
  const achievements = [
    {
      icon: GraduationCap,
      title: 'Engineering Background',
      description: 'Bachelor of Engineering in Mechanical Engineering from Walchand Institute of Technology (2012)'
    },
    {
      icon: Users,
      title: '10,000+ Students Taught',
      description: 'Over a decade of experience in teaching and training with a focus on employability'
    },
    {
      icon: Award,
      title: '5,000+ Lives Impacted',
      description: 'Directly impacted students through employability training and personal growth programs'
    },
    {
      icon: Heart,
      title: 'Spiritual Growth',
      description: '5+ years of deep connection with numerology and spirituality for personal development'
    }
  ]

  const skills = [
    'Aptitude Training',
    'Communication Skills',
    'Mindset Development',
    'Numerology',
    'Spiritual Guidance',
    'Personal Development'
  ]

  return (
    <section className="section-container">
      <div className="text-center mb-16">
        <h2 className="heading-section text-cosmic-contrast">
          About Jaydeep Shirote
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cosmic-purple to-golden-wisdom mx-auto mb-8"></div>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* Profile Card */}
        <div className="card-cosmic">
          <div className="text-center mb-8">
            {/* Placeholder for profile photo */}
            <div className="w-32 h-32 bg-gradient-to-br from-cosmic-purple to-golden-wisdom rounded-full mx-auto mb-6 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-cosmic mb-2">
              Jaydeep Shirote
            </h3>
            <p className="text-golden-wisdom font-accent text-lg">
              Numerology & Self-Awareness Expert
            </p>
          </div>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            Hello, I'm <strong>Jaydeep Sirote</strong>. Over the past decade, I've dedicated 
            my career to teaching and training, with a mission to help individuals unlock their 
            potential and achieve meaningful goals.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            My work has focused on building strong foundations in aptitude, communication, 
            and mindset—essentials for both career success and life satisfaction.
          </p>
          
          <p className="text-gray-700 leading-relaxed">
            Through this platform, I aim to blend my engineering and teaching experience with 
            my passion for numerology and spiritual growth—offering practical insights and tools 
            to support you on your journey to a balanced, fulfilling life.
          </p>
        </div>

        {/* Achievements & Skills */}
        <div>
          {/* Achievements */}
          <div className="mb-12">
            <h3 className="text-2xl font-heading font-semibold text-cosmic mb-8">
              Key Achievements
            </h3>
            
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-celestial-blue to-sacred-rose rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-cosmic mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-2xl font-heading font-semibold text-cosmic mb-6">
              Areas of Expertise
            </h3>
            
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cosmic-purple/10 to-celestial-blue/10 text-cosmic-purple border border-cosmic-purple/20 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="mt-20">
        <div className="card-cosmic max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 text-cosmic-purple mx-auto mb-6" />
          <h3 className="text-2xl font-heading font-semibold text-cosmic mb-6">
            My Philosophy
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            "True transformation begins with self-awareness. When we understand our patterns, 
            strengths, and purpose, we can make conscious choices that align with our authentic 
            selves. My role is not to predict your future, but to help you discover the wisdom 
            that already exists within you."
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
