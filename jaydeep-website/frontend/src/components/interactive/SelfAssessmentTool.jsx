import React, { useState } from 'react'
import { ArrowRight, CheckCircle, Star, TrendingUp } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useAnimations'

const SelfAssessmentTool = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  
  const assessmentRef = useScrollAnimation('slideInLeft', { start: "top 80%" })

  const questions = [
    {
      id: 'motivation',
      question: 'What drives you most in life?',
      options: [
        { value: 'growth', label: 'Personal growth and learning', score: { wisdom: 3, relationships: 1 } },
        { value: 'connection', label: 'Deep connections with others', score: { relationships: 3, wisdom: 1 } },
        { value: 'achievement', label: 'Success and recognition', score: { career: 3, wealth: 2 } },
        { value: 'freedom', label: 'Independence and flexibility', score: { career: 2, health: 2 } }
      ]
    },
    {
      id: 'challenges',
      question: 'What is your biggest current challenge?',
      options: [
        { value: 'direction', label: 'Finding my life purpose', score: { wisdom: 3, career: 2 } },
        { value: 'balance', label: 'Work-life balance', score: { health: 3, relationships: 2 } },
        { value: 'finances', label: 'Financial stability', score: { wealth: 3, career: 1 } },
        { value: 'relationships', label: 'Building meaningful relationships', score: { relationships: 3, wisdom: 1 } }
      ]
    },
    {
      id: 'values',
      question: 'Which value resonates most with you?',
      options: [
        { value: 'authenticity', label: 'Being true to myself', score: { wisdom: 3, health: 1 } },
        { value: 'compassion', label: 'Helping others', score: { relationships: 3, wisdom: 1 } },
        { value: 'excellence', label: 'Achieving the best results', score: { career: 3, wealth: 1 } },
        { value: 'harmony', label: 'Living in balance', score: { health: 3, relationships: 1 } }
      ]
    }
  ]

  const handleAnswer = (questionId, option) => {
    setAnswers({
      ...answers,
      [questionId]: option
    })
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateResults()
    }
  }

  const calculateResults = () => {
    const scores = { wisdom: 0, relationships: 0, career: 0, wealth: 0, health: 0 }
    
    Object.values(answers).forEach(answer => {
      Object.entries(answer.score).forEach(([key, value]) => {
        scores[key] = (scores[key] || 0) + value
      })
    })
    
    const topArea = Object.entries(scores).reduce((a, b) => scores[a[1]] > scores[b[1]] ? a : b)[0]
    setShowResults(topArea)
  }

  const getResultContent = (area) => {
    const content = {
      wisdom: {
        title: 'Spiritual Seeker',
        description: 'You have a strong drive for personal growth and self-awareness. You value authenticity and inner peace.',
        suggestions: ['Practice daily meditation', 'Keep a reflection journal', 'Explore philosophy and spirituality'],
        color: 'text-cosmic-purple'
      },
      relationships: {
        title: 'Connection Builder',
        description: 'You thrive on meaningful relationships and value deep connections with others.',
        suggestions: ['Practice active listening', 'Schedule quality time with loved ones', 'Join community groups'],
        color: 'text-sacred-rose'
      },
      career: {
        title: 'Achievement Oriented',
        description: 'You are driven by success and recognition in your professional life.',
        suggestions: ['Set clear career goals', 'Find a mentor', 'Develop leadership skills'],
        color: 'text-celestial-blue'
      },
      wealth: {
        title: 'Financial Focused',
        description: 'You prioritize financial security and building wealth for the future.',
        suggestions: ['Create a budget plan', 'Learn about investments', 'Set financial milestones'],
        color: 'text-golden-wisdom'
      },
      health: {
        title: 'Wellness Warrior',
        description: 'You value balance and prioritize your physical and mental well-being.',
        suggestions: ['Establish a workout routine', 'Practice stress management', 'Focus on nutrition'],
        color: 'text-sage-green'
      }
    }
    
    return content[area] || content.wisdom
  }

  const resetAssessment = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
  }

  if (showResults) {
    const result = getResultContent(showResults)
    
    return (
      <div className="card-cosmic max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="bg-cosmic-purple/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className={`w-10 h-10 ${result.color}`} />
          </div>
          <h3 className="heading-subsection text-cosmic mb-2">
            Your Primary Focus: {result.title}
          </h3>
          <p className="text-gray-600 mb-6">
            {result.description}
          </p>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-lg text-cosmic mb-3">
            Personalized Recommendations:
          </h4>
          <ul className="space-y-2">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <CheckCircle className={`w-5 h-5 mr-3 ${result.color}`} />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-gradient-to-r from-cosmic-purple/5 to-golden-wisdom/5 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-700">
            <strong>Want deeper insights?</strong> Our comprehensive numerology report provides 
            detailed analysis of all life areas, not just your primary focus.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={resetAssessment}
            className="btn-secondary flex-1"
          >
            Take Again
          </button>
          <button className="btn-primary flex-1">
            Get Full Report - ₹99
            <TrendingUp className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <div ref={assessmentRef} className="card-cosmic max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="heading-subsection text-cosmic">
            Quick Self-Assessment
          </h3>
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            className="bg-gradient-to-r from-cosmic-purple to-golden-wisdom h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <h4 className="text-xl font-heading font-semibold text-gray-800 mb-6">
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(currentQuestion.id, option)}
              className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-cosmic-purple hover:bg-cosmic-purple/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-700 group-hover:text-cosmic-purple">
                  {option.label}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-cosmic-purple opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        This quick assessment gives you a glimpse of our comprehensive analysis process
      </div>
    </div>
  )
}

export default SelfAssessmentTool
