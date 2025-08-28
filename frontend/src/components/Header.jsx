import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '../utils'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Framework', path: '/framework' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      'bg-white/95 backdrop-blur-md shadow-cosmic'
    )}>
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <img 
                src="/logo.jpg" 
                alt="Jaydeep Shirote Logo" 
                className="w-14 h-14 rounded-full object-cover ring-2 ring-cosmic-purple/20 group-hover:ring-golden-wisdom/50 transition-all duration-300"
              />
              <Sparkles className="w-5 h-5 text-golden-wisdom absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-bold text-cosmic-purple group-hover:text-golden-wisdom transition-colors duration-300">
                Jaydeep Shirote
              </span>
              <span className="text-sm font-body text-gray-600 -mt-1">
                Numerology & Self-Awareness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'font-body font-medium transition-all duration-300 relative group',
                  location.pathname === item.path
                    ? 'text-cosmic-purple'
                    : 'text-gray-700 hover:text-cosmic-purple'
                )}
              >
                {item.name}
                <span className={cn(
                  'absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-cosmic-purple to-golden-wisdom transition-all duration-300',
                  location.pathname === item.path
                    ? 'w-full'
                    : 'w-0 group-hover:w-full'
                )} />
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              to="/services"
              className="btn-primary text-sm px-6 py-3"
            >
              Get Your Report
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-cosmic-purple" />
            ) : (
              <Menu className="w-6 h-6 text-cosmic-purple" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-cosmic transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  'block font-body font-medium py-2 transition-colors duration-300',
                  location.pathname === item.path
                    ? 'text-cosmic-purple'
                    : 'text-gray-700 hover:text-cosmic-purple'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/services"
                className="btn-primary w-full text-center text-sm py-3"
              >
                Get Your Report
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
