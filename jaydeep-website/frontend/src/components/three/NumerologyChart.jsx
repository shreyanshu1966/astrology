import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Sphere, Ring, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { webglManager } from '../../utils/webglManager'

// Numerology Wheel Component
function NumerologyWheel({ activeNumber = null }) {
  const wheelRef = useRef()
  const numbersRef = useRef([])
  
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const colors = [
    '#2D1B69', '#FFD700', '#4A90E2', '#E91E63', '#7CB342',
    '#FF9800', '#9C27B0', '#607D8B', '#F44336'
  ]

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }

    numbersRef.current.forEach((numberMesh, index) => {
      if (numberMesh) {
        const isActive = activeNumber === numbers[index]
        const targetScale = isActive ? 1.3 : 1
        numberMesh.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
        
        if (isActive) {
          numberMesh.rotation.z = state.clock.getElapsedTime() * 2
        }
      }
    })
  })

  return (
    <group ref={wheelRef}>
      {/* Main wheel structure */}
      <Ring args={[3, 3.2, 64]} rotation={[Math.PI / 2, 0, 0]}>
        <meshBasicMaterial color="#2D1B69" transparent opacity={0.6} />
      </Ring>
      
      {numbers.map((number, index) => {
        const angle = (index / numbers.length) * Math.PI * 2
        const radius = 3.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        
        return (
          <group key={number} position={[x, 0, z]}>
            {/* Number sphere */}
            <Sphere
              ref={(ref) => (numbersRef.current[index] = ref)}
              args={[0.4, 16, 16]}
            >
              <meshStandardMaterial
                color={colors[index]}
                emissive={colors[index]}
                emissiveIntensity={activeNumber === number ? 0.4 : 0.1}
              />
            </Sphere>
            
            {/* Number text */}
            <Text
              position={[0, 0, 0.5]}
              fontSize={0.5}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
            >
              {number}
            </Text>
            
            {/* Energy rings for active number */}
            {activeNumber === number && (
              <Ring args={[0.6, 0.8, 32]} rotation={[Math.PI / 2, 0, 0]}>
                <meshBasicMaterial
                  color={colors[index]}
                  transparent
                  opacity={0.5}
                  side={THREE.DoubleSide}
                />
              </Ring>
            )}
          </group>
        )
      })}
      
      {/* Central core */}
      <Sphere args={[0.8, 32, 32]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="#2D1B69"
        anchorX="center"
        anchorY="middle"
      >
        LIFE PATH
      </Text>
    </group>
  )
}

// Interactive Numerology Chart Component  
const NumerologyChart = ({ lifePathNumber = 7 }) => {
  const [activeNumber, setActiveNumber] = useState(lifePathNumber)
  const [showDetails, setShowDetails] = useState(false)
  const canvasRef = useRef()

  const numberMeanings = {
    1: { title: "The Leader", description: "Independent, pioneering, ambitious" },
    2: { title: "The Collaborator", description: "Diplomatic, cooperative, sensitive" },
    3: { title: "The Communicator", description: "Creative, expressive, optimistic" },
    4: { title: "The Builder", description: "Practical, organized, hardworking" },
    5: { title: "The Explorer", description: "Adventurous, freedom-loving, versatile" },
    6: { title: "The Nurturer", description: "Caring, responsible, family-oriented" },
    7: { title: "The Seeker", description: "Analytical, spiritual, introspective" },
    8: { title: "The Achiever", description: "Ambitious, material success, leadership" },
    9: { title: "The Humanitarian", description: "Compassionate, generous, idealistic" }
  }

  // WebGL context management
  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (canvas) {
      const contextId = webglManager.registerCanvas(canvas)
      
      webglManager.onContextLost(contextId, (event) => {
        console.warn('NumerologyChart: WebGL context lost')
      })
      
      return () => {
        webglManager.unregisterCanvas(canvas)
      }
    }
  }, [])

  return (
    <div ref={canvasRef} className="relative w-full h-96 bg-gradient-to-br from-cosmic-purple/10 to-golden-wisdom/10 rounded-2xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 8, 8], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: false,
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
          powerPreference: "low-power"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <NumerologyWheel activeNumber={activeNumber} />
      </Canvas>
      
      {/* Number selector */}
      <div className="absolute top-4 left-4 space-y-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <h4 className="font-semibold text-sm text-cosmic mb-2">Select Life Path Number:</h4>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                className={`w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeNumber === num
                    ? 'bg-cosmic-purple text-white scale-110'
                    : 'bg-gray-200 text-gray-700 hover:scale-105'
                }`}
                onClick={() => setActiveNumber(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Number details */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-lg text-cosmic">
                {numberMeanings[activeNumber]?.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {numberMeanings[activeNumber]?.description}
              </p>
            </div>
            <button
              className="btn-secondary text-sm px-4 py-2"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>
          
          {showDetails && (
            <div className="mt-4 p-3 bg-cosmic-purple/5 rounded-lg animate-fade-in">
              <p className="text-sm text-gray-700">
                Life Path Number {activeNumber} individuals are naturally drawn to {numberMeanings[activeNumber]?.description.toLowerCase()}. 
                This number influences your core personality traits, life lessons, and spiritual journey.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default NumerologyChart
