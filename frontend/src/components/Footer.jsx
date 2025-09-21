import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Sparkles, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Framework', path: '/framework' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
  ]

  const legalLinks = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Refunds & Cancellations', path: '/refunds' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/16DEoW2e2J/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/jaydeep.shirote?igsh=Y3lwZ2ludHk5Mmli' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/jaydeepshirote' },
  ]

  return (
    <footer className="bg-gradient-to-br from-cosmic-purple to-mystic-teal text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative">
                <Star className="w-10 h-10 text-golden-wisdom group-hover:rotate-12 transition-transform duration-300" />
                <Sparkles className="w-5 h-5 text-white absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-heading font-bold text-golden-wisdom">
                  Jaydeep Shirote
                </span>
                <span className="text-sm font-body text-white/80">
                  Numerology & Self-Awareness Expert
                </span>
              </div>
            </Link>
            
            <p className="text-white/90 mb-6 max-w-md leading-relaxed">
              Empowering individuals to achieve self-awareness and personal growth through 
              numerology, astrology, and self-awareness tools. Your journey to inner wisdom 
              starts here.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:info@jaydeepshirote.com"
                className="flex items-center space-x-3 text-white/80 hover:text-golden-wisdom transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>info@jaydeepshirote.com</span>
              </a>
              
              <a 
                href="tel:+919921230963"
                className="flex items-center space-x-3 text-white/80 hover:text-golden-wisdom transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span>+91 99212 30963</span>
              </a>
              
              <div className="flex items-start space-x-3 text-white/80">
                <MapPin className="w-5 h-5 mt-0.5" />
                <span>
                  Ground Floor, Tejsiwni Apartment,<br />
                  Loni Kalbhor, Pune - 412201
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-golden-wisdom">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-golden-wisdom transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6 text-golden-wisdom">
              Support
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-golden-wisdom transition-colors duration-300 font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-heading font-semibold mb-4 text-golden-wisdom">
              Stay Connected
            </h3>
            <p className="text-white/80 mb-6">
              Get insights and updates on numerology and self-awareness
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-golden-wisdom"
              />
              <button className="px-6 py-3 bg-golden-wisdom text-cosmic-purple font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-white/70 text-sm font-body">
              © {currentYear} Jaydeep Shirote. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm hidden md:block">Follow us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-golden-wisdom hover:text-cosmic-purple transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
