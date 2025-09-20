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

            {/* Social Media Links */}
            <div className="card-cosmic">
              <h3 className="font-heading font-semibold text-lg text-cosmic mb-4">
                Connect With Us
              </h3>
              
              <p className="text-gray-600 mb-6">
                Follow Jaydeep Shirote on social media for daily insights, tips, and numerology wisdom.
              </p>
              
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/16DEoW2e2J/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                
                <a
                  href="https://www.instagram.com/jaydeep.shirote?igsh=Y3lwZ2ludHk5Mmli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988c6.62 0 11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM15.806 8.421c.108.105.159.252.159.399 0 .147-.051.294-.159.399-.105.108-.252.159-.399.159-.147 0-.294-.051-.399-.159l-2.394-2.394c-.108-.105-.159-.252-.159-.399 0-.147.051-.294.159-.399.105-.108.252-.159.399-.159.147 0 .294.051.399.159l2.394 2.394zm-.798-3.147H8.992c-1.536 0-2.778 1.242-2.778 2.778v6.016c0 1.536 1.242 2.778 2.778 2.778h6.016c1.536 0 2.778-1.242 2.778-2.778V8.052c0-1.536-1.242-2.778-2.778-2.778z"/>
                  </svg>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/jaydeepshirote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
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
