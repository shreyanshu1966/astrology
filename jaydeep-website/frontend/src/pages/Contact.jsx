import React, { useState } from 'react'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  Clock,
  MessageCircle,
  Star
} from 'lucide-react'
import CosmicBackground from '../components/three/CosmicBackground'
import { useScrollAnimation, useHoverAnimation } from '../hooks/useAnimations'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const heroRef = useScrollAnimation('fadeIn')
  const formRef = useScrollAnimation('slideInLeft', { start: "top 75%" })
  const contactRef = useScrollAnimation('slideInRight', { start: "top 75%" })
  const submitRef = useHoverAnimation(1.05)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "hello@jaydeepshirote.com",
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+91 98765 43210",
      description: "Available Mon-Fri, 9AM-6PM"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: "Pune, Maharashtra, India",
      description: "Schedule an in-person consultation"
    }
  ]

  const services = [
    "Comprehensive Self-Awareness Report",
    "Quick Numerology Assessment", 
    "Annual Life Forecast",
    "Personal Consultation",
    "Relationship Compatibility Analysis",
    "Career Guidance Session"
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 cosmic-bg relative flex items-center justify-center">
        <CosmicBackground intensity={0.4} />
        <div className="card-cosmic max-w-lg mx-auto text-center">
          <div className="bg-sage-green/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-sage-green" />
          </div>
          <h1 className="heading-section text-cosmic mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button 
            className="btn-secondary"
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
              })
            }}
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 cosmic-bg relative">
      <CosmicBackground intensity={0.5} />
      
      {/* Hero Section */}
      <div ref={heroRef} className="section-container">
        <div className="text-center mb-16">
          <h1 className="heading-hero text-cosmic-contrast mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to begin your journey of self-discovery? Have questions about our services? 
            We're here to help you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div ref={formRef}>
            <div className="card-cosmic">
              <h2 className="heading-subsection text-cosmic mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-golden-wisdom focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-golden-wisdom focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-golden-wisdom focus:border-transparent transition-all duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service of Interest
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-golden-wisdom focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-golden-wisdom focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your goals, questions, or how we can help you..."
                  />
                </div>
                
                <button
                  ref={submitRef}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div ref={contactRef} className="space-y-8">
            {/* Contact Details */}
            <div className="card-cosmic">
              <h2 className="heading-subsection text-cosmic mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-cosmic-purple/10 p-3 rounded-xl">
                      <info.icon className="w-6 h-6 text-cosmic-purple" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-cosmic mb-1">
                        {info.title}
                      </h3>
                      <p className="text-gray-800 font-medium mb-1">
                        {info.value}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <div className="card-cosmic">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-4">
                What to Expect
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-celestial-blue" />
                  <span className="text-gray-700">Response within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-sage-green" />
                  <span className="text-gray-700">Personalized consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-golden-wisdom" />
                  <span className="text-gray-700">Expert guidance and support</span>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-br from-cosmic-purple/5 to-golden-wisdom/5 p-6 rounded-2xl">
              <div className="flex items-center space-x-3 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-golden-wisdom fill-current" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">
                "Jaydeep's guidance has been transformational. His insights helped me understand 
                myself better and make positive changes in all areas of my life."
              </p>
              <div className="text-sm text-gray-600">
                - Priya S., Mumbai
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="heading-section text-cosmic mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-2">
                How accurate are the reports?
              </h3>
              <p className="text-gray-600">
                Our reports are based on proven numerological principles with over 95% client satisfaction rate.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-2">
                How long does it take?
              </h3>
              <p className="text-gray-600">
                Most reports are delivered within 24-48 hours of payment confirmation.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-2">
                Can I get a refund?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee if you're not satisfied.
              </p>
            </div>
            
            <div className="text-left">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-2">
                Do you offer consultations?
              </h3>
              <p className="text-gray-600">
                Yes, we offer personal consultations via phone or video call for detailed guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
