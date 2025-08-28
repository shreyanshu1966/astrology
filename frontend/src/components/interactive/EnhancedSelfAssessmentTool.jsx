import React, { useState, useRef, useEffect } from 'react'
import { ChevronRight, RotateCcw, Sparkles, Target, Heart, Briefcase, Users, Brain } from 'lucide-react'
import { gsap } from 'gsap'

const EnhancedSelfAssessmentTool = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const questionRef = useRef()
  const optionsRef = useRef()
  const progressRef = useRef()
  const resultRef = useRef()

  const questions = [
    {
      id: 1,
      question: "What energizes you most in life?",
      options: [
        { id: 'a', text: "Achieving personal fitness and mental clarity", area: 'health' },
        { id: 'b', text: "Building financial security and abundance", area: 'wealth' },
        { id: 'c', text: "Deepening relationships and connections", area: 'relationships' },
        { id: 'd', text: "Advancing in career and finding purpose", area: 'career' }
      ]
    },
    {
      id: 2,
      question: "When facing challenges, you typically:",
      options: [
        { id: 'a', text: "Focus on maintaining physical and emotional balance", area: 'health' },
        { id: 'b', text: "Look for opportunities to improve financial situation", area: 'wealth' },
        { id: 'c', text: "Seek support from family and friends", area: 'relationships' },
        { id: 'd', text: "Channel energy into professional growth", area: 'career' }
      ]
    },
    {
      id: 3,
      question: "Your ideal day would include:",
      options: [
        { id: 'a', text: "Exercise, meditation, and healthy meals", area: 'health' },
        { id: 'b', text: "Working on financial goals and investments", area: 'wealth' },
        { id: 'c', text: "Quality time with loved ones", area: 'relationships' },
        { id: 'd', text: "Making progress on meaningful work projects", area: 'career' }
      ]
    },
    {
      id: 4,
      question: "What worries you most about the future?",
      options: [
        { id: 'a', text: "Health issues or lack of vitality", area: 'health' },
        { id: 'b', text: "Financial insecurity or debt", area: 'wealth' },
        { id: 'c', text: "Loneliness or relationship problems", area: 'relationships' },
        { id: 'd', text: "Career stagnation or lack of purpose", area: 'career' }
      ]
    },
    {
      id: 5,
      question: "Your biggest accomplishment would be:",
      options: [
        { id: 'a', text: "Achieving optimal health and wellness", area: 'health' },
        { id: 'b', text: "Financial freedom and security", area: 'wealth' },
        { id: 'c', text: "A loving, supportive family", area: 'relationships' },
        { id: 'd', text: "Recognition for professional achievements", area: 'career' }
      ]
    }
  ]

  const areaInfo = {
    health: {
      title: "Health & Wellness",
      icon: Heart,
      color: "bg-sage-green",
      description: "Your primary focus is on physical vitality, mental clarity, and emotional balance. You understand that health is the foundation for everything else in life.",
      tips: [
        "Prioritize regular exercise and nutritious eating",
        "Practice mindfulness and stress management",
        "Create healthy daily routines and habits",
        "Invest in preventive healthcare"
      ]
    },
    wealth: {
      title: "Wealth & Abundance",
      icon: Target,
      color: "bg-golden-wisdom",
      description: "You're driven by financial security and abundance. You see money as a tool for freedom and the ability to help others.",
      tips: [
        "Create multiple income streams",
        "Develop a solid investment strategy",
        "Build an emergency fund",
        "Focus on both earning and saving"
      ]
    },
    relationships: {
      title: "Relationships & Love",
      icon: Users,
      color: "bg-sacred-rose",
      description: "Your heart centers on meaningful connections with others. You find fulfillment through love, family bonds, and community.",
      tips: [
        "Practice active listening and empathy",
        "Invest quality time in relationships",
        "Communicate openly and honestly",
        "Build a supportive social network"
      ]
    },
    career: {
      title: "Career & Purpose",
      icon: Briefcase,
      color: "bg-celestial-blue",
      description: "You're passionate about professional growth and finding your life's purpose. Success and recognition motivate you.",
      tips: [
        "Align work with your core values",
        "Continuously develop new skills",
        "Build professional networks",
        "Set clear career goals and milestones"
      ]
    }
  }

  // Animation functions
  const animateQuestionChange = () => {
    if (isAnimating) return
    setIsAnimating(true)

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    })

    tl.to(questionRef.current, {
      opacity: 0,
      y: -30,
      duration: 0.3,
      ease: "power2.in"
    })
    .to(optionsRef.current.children, {
      opacity: 0,
      x: -50,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in"
    }, "<")
    .call(() => {
      // Update content here if needed
    })
    .fromTo(questionRef.current, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    )
    .fromTo(optionsRef.current.children,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2"
    )
  }

  const calculateResult = () => {
    const scores = { health: 0, wealth: 0, relationships: 0, career: 0 }
    
    Object.values(answers).forEach(answer => {
      scores[answer.area]++
    })

    const primaryArea = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    )

    setResult({
      primaryArea,
      scores,
      info: areaInfo[primaryArea]
    })

    // Animate result appearance
    setTimeout(() => {
      gsap.fromTo(resultRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "back.out(1.7)" 
        }
      )
    }, 100)
  }

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option })
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.5,
      ease: "power2.out"
    })

    // Move to next question or show result
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        animateQuestionChange()
      }, 500)
    } else {
      setTimeout(calculateResult, 500)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setResult(null)
    
    gsap.set(progressRef.current, { width: '0%' })
    gsap.fromTo(questionRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
  }

  // Initial animation
  useEffect(() => {
    gsap.fromTo(questionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
    gsap.fromTo(optionsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    )
  }, [])

  if (result) {
    const IconComponent = result.info.icon
    
    return (
      <div ref={resultRef} className="card-cosmic max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className={`${result.info.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
            <IconComponent className="w-10 h-10 text-white" />
          </div>
          <h3 className="heading-subsection text-cosmic mb-4">
            Your Primary Life Focus: {result.info.title}
          </h3>
          <p className="text-lg text-gray-600 leading-relaxed">
            {result.info.description}
          </p>
        </div>

        {/* Score breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(result.scores).map(([area, score]) => (
            <div key={area} className="text-center">
              <div className="bg-gray-100 rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full ${areaInfo[area].color}`}
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 capitalize">{area}</p>
              <p className="text-xs text-gray-500">{score}/{questions.length}</p>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-cosmic-purple/5 to-golden-wisdom/5 rounded-xl p-6 mb-6">
          <h4 className="font-heading font-semibold text-lg mb-4 text-cosmic">
            Personalized Recommendations:
          </h4>
          <ul className="space-y-2">
            {result.info.tips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <Sparkles className="w-4 h-4 text-golden-wisdom mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="btn-secondary mr-4"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </button>
          <button className="btn-primary">
            Get Full Report
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card-cosmic max-w-3xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            ref={progressRef}
            className="bg-gradient-to-r from-cosmic-purple to-golden-wisdom h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div ref={questionRef} className="mb-8">
        <h3 className="text-xl md:text-2xl font-heading font-semibold text-cosmic mb-6 text-center">
          {questions[currentQuestion]?.question}
        </h3>
      </div>

      {/* Options */}
      <div ref={optionsRef} className="space-y-4">
        {questions[currentQuestion]?.options.map((option, index) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 text-left bg-white border-2 border-gray-100 rounded-xl hover:border-cosmic-purple hover:bg-cosmic-purple/5 transition-all duration-300 group"
            disabled={isAnimating}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border-2 border-gray-300 group-hover:border-cosmic-purple flex items-center justify-center mr-4 transition-colors">
                <span className="text-sm font-bold text-gray-500 group-hover:text-cosmic-purple">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
              <span className="text-gray-700 group-hover:text-cosmic-purple font-medium transition-colors">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EnhancedSelfAssessmentTool
