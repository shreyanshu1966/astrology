import React, { useState } from 'react'
import { 
  Star, 
  Quote, 
  User, 
  Calendar,
  Heart,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const heroRef = useScrollAnimation('fadeIn')
  const statsRef = useScrollAnimation('slideInUp', { start: "top 80%" })
  const testimonialsRef = useScrollAnimation('slideInUp', { start: "top 80%" })

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      service: "Comprehensive Self-Awareness Report",
      category: "personal-growth",
      rating: 5,
      date: "March 2024",
      text: "Jaydeep's numerology reading was incredibly accurate and insightful. The comprehensive report helped me understand my life patterns and make better decisions in my career. I finally found clarity about my purpose and direction in life.",
      highlight: "Found clarity about life purpose",
      avatar: "P"
    },
    {
      id: 2,
      name: "Rahul Patel", 
      location: "Ahmedabad, Gujarat",
      service: "Career Guidance Session",
      category: "career",
      rating: 5,
      date: "February 2024",
      text: "I was at a crossroads in my career when I consulted Jaydeep. His guidance based on numerology principles helped me choose the right path. Within 6 months, I got promoted and found work-life balance.",
      highlight: "Career breakthrough within 6 months",
      avatar: "R"
    },
    {
      id: 3,
      name: "Anjali Gupta",
      location: "Delhi, NCR",
      service: "Relationship Compatibility Analysis",
      category: "relationships",
      rating: 5,
      date: "January 2024",
      text: "The relationship compatibility analysis was eye-opening. It helped my partner and I understand our differences and strengths. Our communication improved dramatically, and we're now planning our wedding.",
      highlight: "Improved relationship communication",
      avatar: "A"
    },
    {
      id: 4,
      name: "Vikash Kumar",
      location: "Bangalore, Karnataka", 
      service: "Annual Life Forecast",
      category: "forecast",
      rating: 5,
      date: "December 2023",
      text: "The annual forecast was remarkably accurate. It prepared me for challenges and opportunities throughout the year. I made strategic decisions that led to significant personal and financial growth.",
      highlight: "Strategic decisions led to growth",
      avatar: "V"
    },
    {
      id: 5,
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      service: "Personal Consultation",
      category: "personal-growth",
      rating: 5,
      date: "November 2023",
      text: "Jaydeep's approach is both scientific and spiritual. He helped me overcome self-doubt and recognize my inner strengths. The session was transformative and gave me confidence to pursue my dreams.",
      highlight: "Overcame self-doubt and gained confidence",
      avatar: "M"
    },
    {
      id: 6,
      name: "Arjun Singh",
      location: "Pune, Maharashtra",
      service: "Quick Numerology Assessment",
      category: "assessment",
      rating: 5,
      date: "October 2023",
      text: "Even the quick assessment provided valuable insights. It highlighted my natural talents and suggested career paths I hadn't considered. Simple yet powerful guidance that made a real difference.",
      highlight: "Discovered hidden talents",
      avatar: "A"
    }
  ]

  const categories = [
    { id: 'all', label: 'All Reviews', icon: Star },
    { id: 'personal-growth', label: 'Personal Growth', icon: TrendingUp },
    { id: 'career', label: 'Career', icon: Shield },
    { id: 'relationships', label: 'Relationships', icon: Heart },
    { id: 'forecast', label: 'Life Forecast', icon: Calendar },
    { id: 'assessment', label: 'Assessment', icon: Sparkles }
  ]

  const stats = [
    {
      number: "500+",
      label: "Happy Clients",
      description: "Transformed lives through numerology"
    },
    {
      number: "98%",
      label: "Satisfaction Rate", 
      description: "Clients report positive outcomes"
    },
    {
      number: "5+",
      label: "Years Experience",
      description: "Dedicated to self-awareness practice"
    },
    {
      number: "15+",
      label: "Services Offered",
      description: "Comprehensive numerology solutions"
    }
  ]

  const filteredTestimonials = activeCategory === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === activeCategory)

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-golden-wisdom fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen pt-20 cosmic-bg">
      {/* Hero Section */}
      <section ref={heroRef} className="section-container text-center mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-hero text-cosmic-contrast mb-6">
            Client Success Stories
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Discover how numerology and self-awareness have transformed the lives of our clients. 
            Real stories, real results, real transformation.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sage-green" />
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-golden-wisdom" />
              <span>5-Star Average</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-celestial-blue" />
              <span>Real Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="section-container mb-20">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-soft hover:shadow-cosmic transition-all duration-300">
                <div className="text-3xl font-bold text-cosmic mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-800 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-container mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-cosmic-purple text-white border-cosmic-purple shadow-cosmic'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-cosmic-purple hover:text-cosmic-purple'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Testimonials Grid */}
      <section ref={testimonialsRef} className="section-container mb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="card-cosmic relative overflow-hidden group hover:shadow-golden transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-12 h-12 text-cosmic-purple" />
              </div>

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cosmic-purple to-mystic-teal rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                    <p className="text-cosmic text-sm font-medium">{testimonial.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-gray-500 text-xs">{testimonial.date}</p>
                </div>
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Highlight */}
              <div className="bg-gradient-to-r from-golden-wisdom/10 to-sage-green/10 rounded-lg p-4 border-l-4 border-golden-wisdom">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-golden-wisdom" />
                  <span className="text-sm font-medium text-gray-800">Key Result:</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{testimonial.highlight}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container">
        <div className="card-cosmic text-center bg-gradient-to-br from-cosmic-purple/5 to-mystic-teal/5 border border-cosmic-purple/10">
          <h2 className="heading-section text-cosmic mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have discovered their true potential 
            through the power of numerology and self-awareness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Book Your Consultation
            </a>
            <a href="/services" className="btn-secondary">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
