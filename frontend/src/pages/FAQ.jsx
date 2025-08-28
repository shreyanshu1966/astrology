import React, { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  MessageCircle,
  Clock,
  Star,
  Shield,
  BookOpen,
  User,
  Calendar,
  CreditCard,
  Phone,
  Mail
} from 'lucide-react'
import { useScrollAnimation } from '../hooks/useAnimations'

const FAQ = () => {
  const [openItems, setOpenItems] = useState({})
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const heroRef = useScrollAnimation('fadeIn')
  const searchRef = useScrollAnimation('slideInUp', { start: "top 80%" })
  const faqRef = useScrollAnimation('slideInUp', { start: "top 80%" })

  const faqData = [
    {
      id: 1,
      category: 'general',
      question: "What is numerology and how does it work?",
      answer: "Numerology is the study of the mystical relationship between numbers and life events. It's based on the belief that numbers have vibrational properties that can provide insights into personality traits, life patterns, and future possibilities. We use your birth date and name to calculate various numbers that reveal different aspects of your life path, personality, and potential."
    },
    {
      id: 2,
      category: 'general',
      question: "How accurate are numerology readings?",
      answer: "Numerology provides insights and guidance based on mathematical calculations and ancient wisdom. While it's not a predictive science in the traditional sense, many clients find the insights remarkably accurate for understanding personality traits, life patterns, and potential opportunities. The accuracy often depends on how open you are to self-reflection and applying the insights to your life."
    },
    {
      id: 3,
      category: 'services',
      question: "What's included in the Comprehensive Self-Awareness Report?",
      answer: "Our comprehensive report includes your Life Path Number, Destiny Number, Soul Urge Number, Personality Number, and Birth Day Number analysis. You'll receive detailed insights about your strengths, challenges, career guidance, relationship compatibility factors, and a yearly forecast. The report is typically 15-20 pages and includes actionable recommendations for personal growth."
    },
    {
      id: 4,
      category: 'services',
      question: "How is the Quick Numerology Assessment different from the full report?",
      answer: "The Quick Assessment focuses on your core Life Path Number and provides essential insights about your personality and life direction. It's perfect for those new to numerology or seeking specific guidance on a particular area. The full Comprehensive Report includes multiple number calculations and provides deeper, more detailed analysis across all life areas."
    },
    {
      id: 5,
      category: 'process',
      question: "What information do you need for a reading?",
      answer: "For an accurate reading, we need your full birth name (as it appears on your birth certificate) and your complete birth date (day, month, and year). Some advanced readings may also benefit from your birth time and location, though these are optional for most of our services."
    },
    {
      id: 6,
      category: 'process',
      question: "How long does it take to receive my report?",
      answer: "Quick Numerology Assessments are typically delivered within 24-48 hours. Comprehensive Self-Awareness Reports take 3-5 business days as they involve detailed calculations and personalized analysis. Personal consultations can usually be scheduled within a week, depending on availability."
    },
    {
      id: 7,
      category: 'consultation',
      question: "What happens during a personal consultation?",
      answer: "Personal consultations are one-on-one sessions (in-person or video call) lasting 60-90 minutes. We'll discuss your numerology chart in detail, answer your specific questions, and provide guidance on current life situations. These sessions are interactive and allow for deep exploration of your numbers and their practical applications."
    },
    {
      id: 8,
      category: 'consultation',
      question: "Can consultations be done online?",
      answer: "Yes! We offer consultations via video call for clients who cannot meet in person. Online sessions are just as effective as in-person meetings. You'll receive the same detailed analysis and personalized guidance. We use secure video platforms and can share your numerology charts digitally during the session."
    },
    {
      id: 9,
      category: 'pricing',
      question: "What are your pricing options?",
      answer: "We offer various packages to suit different needs and budgets. Quick Assessments start at ₹999, Comprehensive Reports are ₹2,499, and Personal Consultations are ₹4,999. We also offer combo packages and annual forecast updates at discounted rates. All prices include detailed reports and follow-up support."
    },
    {
      id: 10,
      category: 'pricing',
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with your reading within 7 days of delivery, we'll provide a full refund or offer a complimentary revision. We're committed to ensuring you receive valuable insights that serve your highest good."
    },
    {
      id: 11,
      category: 'general',
      question: "Is numerology compatible with my religious beliefs?",
      answer: "Numerology is a tool for self-understanding and doesn't conflict with any religious beliefs. It's about mathematical patterns and personal insights rather than worship or doctrine. Many people from various religious backgrounds find numerology helpful for personal growth while maintaining their spiritual practices."
    },
    {
      id: 12,
      category: 'services',
      question: "Can numerology help with relationship compatibility?",
      answer: "Yes! Our Relationship Compatibility Analysis compares the numerology charts of two people to identify areas of harmony and potential challenges. We look at Life Path compatibility, communication styles, and shared goals. This insight helps couples understand each other better and navigate their relationship more consciously."
    },
    {
      id: 13,
      category: 'consultation',
      question: "How often should I get a numerology reading?",
      answer: "Most clients benefit from an annual reading to understand the energy of the coming year. However, you might want additional guidance during major life transitions like career changes, relationships, or important decisions. We also offer quarterly check-ins for ongoing support and guidance."
    },
    {
      id: 14,
      category: 'process',
      question: "What if my birth name has changed due to marriage or legal reasons?",
      answer: "We typically use your birth name for the core reading as it represents your soul's blueprint. However, if you've legally changed your name, we can also analyze your current name to understand how it influences your present life. Sometimes we'll do both analyses to provide comprehensive insights."
    },
    {
      id: 15,
      category: 'services',
      question: "Do you provide guidance for business and career decisions?",
      answer: "Absolutely! Numerology is excellent for career guidance. We can help you understand your natural talents, ideal career paths, favorable business names, and the best timing for important professional decisions. Many entrepreneurs use numerology to choose business names and launch dates."
    }
  ]

  const categories = [
    { id: 'all', label: 'All Questions', icon: BookOpen },
    { id: 'general', label: 'General', icon: Star },
    { id: 'services', label: 'Services', icon: Shield },
    { id: 'process', label: 'Process', icon: Clock },
    { id: 'consultation', label: 'Consultations', icon: User },
    { id: 'pricing', label: 'Pricing', icon: CreditCard }
  ]

  const quickLinks = [
    {
      title: "Book a Consultation",
      description: "Schedule your personal numerology session",
      icon: Calendar,
      link: "/contact",
      color: "bg-cosmic-purple text-white"
    },
    {
      title: "View Services", 
      description: "Explore all our numerology offerings",
      icon: Star,
      link: "/services",
      color: "bg-sage-green text-white"
    },
    {
      title: "Contact Support",
      description: "Get help with your questions",
      icon: MessageCircle,
      link: "/contact",
      color: "bg-celestial-blue text-white"
    }
  ]

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const filteredFAQs = faqData
    .filter(item => activeCategory === 'all' || item.category === activeCategory)
    .filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div className="min-h-screen pt-20 cosmic-bg">
      {/* Hero Section */}
      <section ref={heroRef} className="section-container text-center mb-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="heading-hero text-cosmic-contrast mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Find answers to common questions about numerology, our services, and the consultation process. 
            Can't find what you're looking for? We're here to help!
          </p>
        </div>
      </section>

      {/* Search and Quick Links */}
      <section ref={searchRef} className="section-container mb-16">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-cosmic-purple focus:outline-none focus:ring-2 focus:ring-cosmic-purple/20 transition-all duration-300"
            />
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon
              return (
                <a 
                  key={index}
                  href={link.link}
                  className={`${link.color} rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-cosmic group`}
                >
                  <IconComponent className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-2">{link.title}</h3>
                  <p className="opacity-90 text-sm">{link.description}</p>
                </a>
              )
            })}
          </div>
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

      {/* FAQ Items */}
      <section ref={faqRef} className="section-container mb-20">
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-cosmic transition-all duration-300"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/20 group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-cosmic-purple transition-colors pr-4">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openItems[item.id] ? (
                          <ChevronUp className="w-5 h-5 text-cosmic-purple" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-cosmic-purple transition-colors" />
                        )}
                      </div>
                    </div>
                  </button>
                  
                  {openItems[item.id] && (
                    <div className="px-6 pb-6 border-t border-gray-100">
                      <div className="pt-4 text-gray-700 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="section-container">
        <div className="card-cosmic text-center bg-gradient-to-br from-cosmic-purple/5 to-mystic-teal/5 border border-cosmic-purple/10">
          <MessageCircle className="w-16 h-16 text-cosmic-purple mx-auto mb-6" />
          <h2 className="heading-section text-cosmic mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our team is here to help! 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Send us a Message
            </a>
            <a href="tel:+919876543210" className="btn-secondary flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-6 justify-center text-gray-600">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>hello@jaydeepshirote.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Mon-Fri, 9AM-6PM</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQ
