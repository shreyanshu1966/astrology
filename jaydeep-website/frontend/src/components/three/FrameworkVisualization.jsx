import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text, OrbitControls, Sphere, Ring, Float, Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { webglManager } from '../../utils/webglManager'

// 3D Framework Pillar Component
function FrameworkPillar({ position, label, color, isActive, onHover, description }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered || isActive ? 1.2 : 1
      meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
      
      if (hovered || isActive) {
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.8
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.5
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Main Pillar */}
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true)
          onHover?.(label)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          onHover?.(null)
          document.body.style.cursor = 'default'
        }}
      >
        <cylinderGeometry args={[0.6, 0.8, 2.5]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={hovered || isActive ? 0.9 : 0.7}
          emissive={color}
          emissiveIntensity={hovered || isActive ? 0.3 : 0.1}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      
      {/* Energy Rings */}
      <Ring
        ref={ringRef}
        args={[1.2, 1.4, 32]}
        position={[0, 1, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={hovered || isActive ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </Ring>

      {/* Floating Ornament */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <mesh position={[0, 1.8, 0]}>
          <octahedronGeometry args={[0.4]} />
          <meshStandardMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.9}
            emissive="#FFD700"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
      
      {/* Label */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.35}
        color="#2D1B69"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>

      {/* Interactive Info Panel */}
      {(hovered || isActive) && (
        <Html position={[0, 3, 0]} center>
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/20 max-w-48">
            <h4 className="font-semibold text-cosmic text-sm mb-1">{label}</h4>
            <p className="text-xs text-gray-600">{description}</p>
          </div>
        </Html>
      )}
    </group>
  )
}

// Central Core Component - Enhanced
function CentralCore() {
  const coreRef = useRef()
  const innerCoreRef = useRef()
  const energyFieldRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.2
      coreRef.current.rotation.y = time * 0.3
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x = -time * 0.4
      innerCoreRef.current.rotation.z = time * 0.5
    }

    if (energyFieldRef.current) {
      energyFieldRef.current.rotation.y = time * 0.1
      const scale = 1 + Math.sin(time * 2) * 0.1
      energyFieldRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Energy Field */}
      <Sphere ref={energyFieldRef} args={[1.8, 32, 32]}>
        <meshBasicMaterial 
          color="#2D1B69"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Outer Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1]} />
        <meshStandardMaterial 
          color="#2D1B69"
          transparent
          opacity={0.7}
          wireframe
          emissive="#2D1B69"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh ref={innerCoreRef}>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial 
          color="#FFD700"
          transparent
          opacity={0.8}
          emissive="#FFD700"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Core Energy */}
      <Sphere args={[0.3, 16, 16]}>
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Core label */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.25}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        SELF
      </Text>
    </group>
  )
}

// Enhanced Connecting Lines with Energy Flow
function ConnectingLines() {
  const linesRef = useRef()
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        const material = line.material
        if (material) {
          material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2 + index) * 0.2
        }
      })
    }
  })

  const pillars = [
    [4, 0, 0],   // Health
    [-4, 0, 0],  // Wealth  
    [0, 0, 4],   // Relationships
    [0, 0, -4]   // Career
  ]

  return (
    <group ref={linesRef}>
      {pillars.map((pillarPos, index) => {
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...pillarPos)
        ]
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial 
              color="#4A90E2" 
              transparent 
              opacity={0.5}
              linewidth={3}
            />
          </line>
        )
      })}
      
      {/* Connecting rings between pillars */}
      {pillars.map((pillarPos, index) => {
        const nextIndex = (index + 1) % pillars.length
        const midPoint = [
          (pillarPos[0] + pillars[nextIndex][0]) / 2,
          1,
          (pillarPos[2] + pillars[nextIndex][2]) / 2
        ]
        
        return (
          <Ring
            key={`ring-${index}`}
            args={[0.2, 0.3, 16]}
            position={midPoint}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial 
              color="#E91E63" 
              transparent 
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </Ring>
        )
      })}
    </group>
  )
}

// Particle System for Energy Visualization
function EnergyParticles() {
  const particlesRef = useRef()
  
  const particleCount = 100 // Reduced from 200 to improve performance
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  
  for (let i = 0; i < particleCount; i++) {
    // Create particles in a sphere around the center
    const radius = 6 + Math.random() * 2
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
    positions[i * 3 + 2] = radius * Math.cos(phi)
    
    // Random colors from our palette
    const colorChoice = Math.random()
    if (colorChoice < 0.25) {
      colors[i * 3] = 0.18; colors[i * 3 + 1] = 0.11; colors[i * 3 + 2] = 0.41 // cosmic purple
    } else if (colorChoice < 0.5) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.84; colors[i * 3 + 2] = 0 // golden
    } else if (colorChoice < 0.75) {
      colors[i * 3] = 0.29; colors[i * 3 + 1] = 0.56; colors[i * 3 + 2] = 0.89 // celestial blue
    } else {
      colors[i * 3] = 0.91; colors[i * 3 + 1] = 0.12; colors[i * 3 + 2] = 0.39 // sacred rose
    }
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(state.clock.getElapsedTime() + i * 0.1) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

// Main Framework Visualization Component
const FrameworkVisualization = ({ activeSection }) => {
  const canvasRef = useRef()
  const [webglError, setWebglError] = useState(false)
  const [hoveredPillar, setHoveredPillar] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (canvas) {
      const contextId = webglManager.registerCanvas(canvas, {
        preserveDrawingBuffer: false,
        antialias: false // Disable for better performance
      })
      
      // Set up context loss handlers
      webglManager.onContextLost(contextId, (event) => {
        console.warn('FrameworkVisualization: WebGL context lost')
        setWebglError(true)
      })
      
      webglManager.onContextRestored(contextId, (event) => {
        console.log('FrameworkVisualization: WebGL context restored')
        setWebglError(false)
      })

      return () => {
        webglManager.unregisterCanvas(canvas)
      }
    }
  }, [])

  // Error fallback for WebGL context loss
  if (webglError) {
    return (
      <div className="w-full h-96 bg-gradient-to-br from-cosmic-purple/10 to-golden-wisdom/10 rounded-xl flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-xl font-heading font-semibold text-cosmic mb-2">
            Interactive Framework Model
          </h3>
          <p className="text-gray-600">
            Our comprehensive framework guides you through four essential pillars of life
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-secondary text-sm px-4 py-2"
          >
            Reload Visualization
          </button>
        </div>
      </div>
    )
  }

  const pillars = [
    { 
      position: [4, 0, 0], 
      label: "Health", 
      color: "#7CB342",
      description: "Physical & Mental Wellness - Your body and mind working in harmony"
    },
    { 
      position: [-4, 0, 0], 
      label: "Wealth", 
      color: "#FFD700",
      description: "Financial Security & Abundance - Creating prosperity and stability"
    },
    { 
      position: [0, 0, 4], 
      label: "Relationships", 
      color: "#E91E63",
      description: "Love, Family & Social Connections - Building meaningful bonds"
    },
    { 
      position: [0, 0, -4], 
      label: "Career", 
      color: "#4A90E2",
      description: "Purpose, Success & Recognition - Aligning work with passion"
    }
  ]

  // Dynamic camera positioning based on active section
  useEffect(() => {
    if (activeSection) {
      const pillar = pillars.find(p => p.label.toLowerCase() === activeSection.toLowerCase())
      if (pillar) {
        gsap.to({}, {
          duration: 1.5,
          ease: "power2.inOut"
        })
      }
    }
  }, [activeSection])

  return (
    <div ref={canvasRef} className="w-full h-96 rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: false, // Reduce memory usage
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "low-power"
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit DPR for better performance
        onCreated={({ gl }) => {
          // Additional error handling
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            console.warn('FrameworkVisualization: Context lost')
          })
        }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#FFD700" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4A90E2" />
        <pointLight position={[0, 15, 0]} intensity={0.6} color="#E91E63" />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <OrbitControls 
          enableZoom={true}
          minDistance={8}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />
        
        <EnergyParticles />
        <CentralCore />
        <ConnectingLines />
        
        {pillars.map((pillar, index) => (
          <FrameworkPillar
            key={index}
            position={pillar.position}
            label={pillar.label}
            color={pillar.color}
            description={pillar.description}
            isActive={activeSection === pillar.label}
            onHover={setHoveredPillar}
          />
        ))}
      </Canvas>
      
      {/* Interactive Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        {pillars.map((pillar, index) => (
          <button
            key={index}
            className={`block w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
              activeSection === pillar.label ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{ backgroundColor: pillar.color }}
            title={pillar.label}
          />
        ))}
      </div>

      {/* Information Panel */}
      {hoveredPillar && (
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-cosmic max-w-xs animate-fade-in">
          <h3 className="font-heading font-semibold text-cosmic text-lg mb-1">
            {hoveredPillar}
          </h3>
          <p className="text-gray-600 text-sm">
            {pillars.find(p => p.label === hoveredPillar)?.description}
          </p>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded px-3 py-2">
        <div>🖱️ Drag to rotate</div>
        <div>🔍 Scroll to zoom</div>
        <div>👆 Hover pillars for info</div>
      </div>
    </div>
  )
}

export default FrameworkVisualization
