import React, { useState, useEffect } from 'react'
import { Heart, DollarSign, Users, Briefcase, Target, TrendingUp, Zap, Star } from 'lucide-react'

const InteractiveFrameworkModel = ({ activeSection, onSectionChange }) => {
  const [hoveredPillar, setHoveredPillar] = useState(null)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [energyFlow, setEnergyFlow] = useState(0)
  const [pulseIntensity, setPulseIntensity] = useState(1)

  // Cycle through animation phases for the central core
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Energy flow animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyFlow(prev => (prev + 1) % 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Dynamic pulse based on active sections
  useEffect(() => {
    setPulseIntensity(activeSection ? 1.5 : 1)
  }, [activeSection])

  const pillars = [
    {
      id: 'health',
      title: 'Health & Wellness',
      shortTitle: 'Health',
      icon: Heart,
      color: '#7CB342',
      gradient: 'from-green-400 to-emerald-500',
      position: { top: '10%', left: '50%', transform: 'translateX(-50%)' },
      description: 'Physical vitality, mental clarity, and emotional balance',
      metrics: ['Physical Fitness', 'Mental Health', 'Emotional Balance'],
      angle: 0
    },
    {
      id: 'wealth',
      title: 'Wealth & Abundance',
      shortTitle: 'Wealth',
      icon: DollarSign,
      color: '#FFD700',
      gradient: 'from-yellow-400 to-orange-400',
      position: { top: '50%', right: '10%', transform: 'translateY(-50%)' },
      description: 'Financial freedom and abundance mindset',
      metrics: ['Financial Planning', 'Investment Strategy', 'Career Growth'],
      angle: 90
    },
    {
      id: 'relationships',
      title: 'Relationships',
      shortTitle: 'Relationships',
      icon: Users,
      color: '#E91E63',
      gradient: 'from-pink-400 to-rose-500',
      position: { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
      description: 'Meaningful connections and supportive relationships',
      metrics: ['Family Bonds', 'Partnerships', 'Social Networks'],
      angle: 180
    },
    {
      id: 'career',
      title: 'Career & Purpose',
      shortTitle: 'Career',
      icon: Briefcase,
      color: '#4A90E2',
      gradient: 'from-blue-400 to-indigo-500',
      position: { top: '50%', left: '10%', transform: 'translateY(-50%)' },
      description: 'Purposeful work and professional growth',
      metrics: ['Skill Building', 'Leadership', 'Life Purpose'],
      angle: 270
    }
  ]

  const handlePillarClick = (pillar) => {
    onSectionChange?.(pillar.id === activeSection ? null : pillar.id)
  }

  const handlePillarHover = (pillar) => {
    setHoveredPillar(pillar)
  }

  const isActive = (pillarId) => activeSection === pillarId

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl overflow-hidden border border-white/20 shadow-xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 800 800">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.1)" strokeWidth="1"/>
            </pattern>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.4)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.2)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
            </radialGradient>
            <linearGradient id="cosmicGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="400" cy="400" r="150" fill="url(#centerGlow)" />
          <circle cx="400" cy="400" r="250" fill="url(#cosmicGlow)" opacity="0.5" />
        </svg>
      </div>

      {/* Energy Lines - SVG Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.6)" />
            <stop offset="50%" stopColor="rgba(236, 72, 153, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.6)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection Lines with Energy Flow */}
        {pillars.map((pillar, index) => {
          const centerX = 400
          const centerY = 400
          const pillarX = pillar.position.left === '50%' ? centerX : 
                         pillar.position.right === '10%' ? 640 : 160
          const pillarY = pillar.position.top === '50%' ? centerY :
                         pillar.position.top === '10%' ? 160 : 640

          return (
            <g key={pillar.id}>
              <line
                x1={centerX}
                y1={centerY}
                x2={pillarX}
                y2={pillarY}
                stroke="url(#energyGradient)"
                strokeWidth={isActive(pillar.id) ? "4" : "2"}
                opacity={isActive(pillar.id) ? 0.9 : 0.5}
                filter={isActive(pillar.id) ? "url(#glow)" : "none"}
                className="transition-all duration-500"
              />
              {/* Energy Flow Particles */}
              {isActive(pillar.id) && (
                <circle
                  r="3"
                  fill={pillar.color}
                  opacity="0.8"
                  className="animate-pulse"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${centerX} ${centerY} L ${pillarX} ${pillarY}`}
                  />
                </circle>
              )}
            </g>
          )
        })}

        {/* Orbital Rings */}
        <circle
          cx="400"
          cy="400"
          r="120"
          fill="none"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="1"
          strokeDasharray="5,5"
          className="animate-spin"
          style={{ animationDuration: '20s' }}
        />
        <circle
          cx="400"
          cy="400"
          r="200"
          fill="none"
          stroke="rgba(236, 72, 153, 0.15)"
          strokeWidth="1"
          strokeDasharray="10,10"
          className="animate-spin"
          style={{ animationDuration: '30s', animationDirection: 'reverse' }}
        />
      </svg>

      {/* Central Core */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center transition-all duration-700 ${
          animationPhase === 0 ? 'scale-110 shadow-indigo-400/50' :
          animationPhase === 1 ? 'scale-105 shadow-purple-400/50' :
          animationPhase === 2 ? 'scale-110 shadow-pink-400/50' :
          'scale-105 shadow-blue-400/50'
        }`}>
          {/* Rotating Border */}
          <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-spin" style={{ animationDuration: '8s' }}>
            <div className="w-2 h-2 bg-white rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
          
          {/* Center Icon */}
          <Target className="w-10 h-10 text-white drop-shadow-lg" />
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
        </div>
        
        {/* Core Label */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3">
          <span className="text-base font-semibold text-indigo-700 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
            SELF
          </span>
        </div>
      </div>

      {/* Framework Pillars */}
      {pillars.map((pillar) => {
        const Icon = pillar.icon
        const isActivePillar = isActive(pillar.id)
        const isHovered = hoveredPillar?.id === pillar.id

        return (
          <div
            key={pillar.id}
            className="absolute z-20 group cursor-pointer"
            style={pillar.position}
            onClick={() => handlePillarClick(pillar)}
            onMouseEnter={() => handlePillarHover(pillar)}
            onMouseLeave={() => setHoveredPillar(null)}
          >
            {/* Pillar Container */}
            <div className={`relative w-24 h-24 rounded-2xl shadow-lg transition-all duration-300 transform ${
              isActivePillar ? 'scale-125 shadow-2xl' : 
              isHovered ? 'scale-110 shadow-xl' : 
              'hover:scale-105'
            }`}
              style={{ 
                background: `linear-gradient(135deg, ${pillar.color}, ${pillar.color}DD)`,
                boxShadow: isActivePillar ? `0 20px 40px ${pillar.color}40` : 
                          isHovered ? `0 15px 30px ${pillar.color}30` : 
                          `0 10px 20px ${pillar.color}20`
              }}
            >
              {/* Glow Effect */}
              {(isActivePillar || isHovered) && (
                <div 
                  className="absolute inset-0 rounded-2xl animate-pulse"
                  style={{ 
                    backgroundColor: pillar.color,
                    opacity: 0.3,
                    filter: 'blur(8px)',
                    transform: 'scale(1.2)'
                  }}
                />
              )}
              
              {/* Icon */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Icon className="w-12 h-12 text-white drop-shadow-lg" />
              </div>

              {/* Active Indicator */}
              {isActivePillar && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
              )}
            </div>

            {/* Pillar Label */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                {pillar.shortTitle}
              </span>
            </div>

            {/* Hover/Active Details */}
            {(isHovered || isActivePillar) && (
              <div className={`absolute left-1/2 transform -translate-x-1/2 w-80 pointer-events-none z-30 ${
                pillar.position.top === '10%' ? 'top-full mt-8' : 'bottom-full mb-8'
              }`}>
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 animate-fade-in">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800 text-lg">{pillar.title}</h3>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pillar.color }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pillar.description}</p>

                  {/* Metrics */}
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">Key Areas</div>
                    {pillar.metrics.map((metric, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-600">
                        <div 
                          className="w-2 h-2 rounded-full mr-3 animate-pulse"
                          style={{ backgroundColor: pillar.color }}
                        />
                        {metric}
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button 
                      className="w-full text-xs py-2 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                      style={{ 
                        backgroundColor: `${pillar.color}20`,
                        color: pillar.color,
                        border: `1px solid ${pillar.color}40`
                      }}
                    >
                      Explore {pillar.shortTitle} Insights
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Enhanced Energy Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${10 + (i * 3.5)}%`,
              top: `${20 + (i * 2.2)}%`,
              animation: `float ${3 + i * 0.2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
        
        {/* Additional floating elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-2 h-2 text-purple-300 opacity-40"
            style={{
              left: `${15 + (i * 12)}%`,
              top: `${30 + (i * 6)}%`,
              animation: `twinkle ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.7}s`
            }}
          >
            <Star className="w-full h-full" />
          </div>
        ))}
      </div>

      {/* Enhanced Control Panel */}
      <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-sm text-gray-600 mb-3 font-medium">Quick Access</div>
        <div className="grid grid-cols-2 gap-3">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => handlePillarClick(pillar)}
              className={`w-10 h-10 rounded-md transition-all duration-200 flex items-center justify-center ${
                isActive(pillar.id) ? 'scale-110 shadow-md' : 'hover:scale-105'
              }`}
              style={{ 
                backgroundColor: pillar.color,
                opacity: isActive(pillar.id) ? 1 : 0.6
              }}
              title={pillar.title}
            >
              <pillar.icon className="w-5 h-5 text-white" />
            </button>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="text-sm text-gray-600 space-y-2">
          <div>👆 Click pillars to explore</div>
          <div>🎯 Hover for details</div>
          <div>⚡ Live energy connections</div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-15px) translateX(8px); opacity: 1; }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default InteractiveFrameworkModel
