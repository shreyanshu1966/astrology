import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { webglManager } from '../../utils/webglManager'

// Sacred Geometry Shapes Component
function SacredGeometry() {
  const meshRef = useRef()
  const mesh2Ref = useRef()
  const mesh3Ref = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2
      meshRef.current.rotation.y = time * 0.3
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = time * -0.15
      mesh2Ref.current.rotation.z = time * 0.4
      mesh2Ref.current.position.x = Math.cos(time * 0.3) * 0.5
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = time * 0.25
      mesh3Ref.current.rotation.z = time * -0.2
      mesh3Ref.current.position.z = Math.sin(time * 0.4) * 0.2
    }
  })

  return (
    <>
      {/* Tetrahedron */}
      <mesh ref={meshRef} position={[-2, 1, -1]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshBasicMaterial 
          color="#FFD700" 
          wireframe 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Icosahedron */}
      <mesh ref={mesh2Ref} position={[2, -1, -1]}>
        <icosahedronGeometry args={[0.25]} />
        <meshBasicMaterial 
          color="#4A90E2" 
          wireframe 
          transparent 
          opacity={0.5}
        />
      </mesh>
      
      {/* Octahedron */}
      <mesh ref={mesh3Ref} position={[0, 2, -2]}>
        <octahedronGeometry args={[0.2]} />
        <meshBasicMaterial 
          color="#E91E63" 
          wireframe 
          transparent 
          opacity={0.4}
        />
      </mesh>
    </>
  )
}

// Cosmic Particles Component - Enhanced
function CosmicParticles() {
  const ref = useRef()
  
  const particleCount = 800 // Reduced from 1500 to prevent memory issues
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15 // Reduced spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
      
      // Cosmic color palette
      const colorChoice = Math.random()
      if (colorChoice < 0.3) {
        colors[i * 3] = 0.18; colors[i * 3 + 1] = 0.11; colors[i * 3 + 2] = 0.41 // cosmic purple
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.84; colors[i * 3 + 2] = 0 // golden
      } else {
        colors[i * 3] = 0.29; colors[i * 3 + 1] = 0.56; colors[i * 3 + 2] = 0.89 // celestial blue
      }
    }
    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.01
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
      ref.current.scale.setScalar(scale)
    }
  })

  return (
    <Points ref={ref} positions={positions.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        count={particleCount}
        array={positions.colors}
        itemSize={3}
      />
    </Points>
  )
}

// Numerology Symbols Component
function NumerologySymbols() {
  const groupRef = useRef()
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  const createNumberMesh = (number, position, color) => (
    <mesh key={number} position={position}>
      <ringGeometry args={[0.15, 0.2, 8]} />
      <meshBasicMaterial 
        color={color} 
        transparent 
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  )

  const numbers = [
    { num: 1, pos: [1.5, 0, 0], color: "#FFD700" },
    { num: 2, pos: [-1.5, 0, 0], color: "#4A90E2" },
    { num: 3, pos: [0, 1.5, 0], color: "#E91E63" },
    { num: 4, pos: [0, -1.5, 0], color: "#7CB342" },
    { num: 5, pos: [1, 1, 0], color: "#FFD700" },
    { num: 6, pos: [-1, -1, 0], color: "#4A90E2" },
    { num: 7, pos: [-1, 1, 0], color: "#E91E63" },
    { num: 8, pos: [1, -1, 0], color: "#7CB342" },
    { num: 9, pos: [0, 0, 1.5], color: "#FFD700" },
  ]

  return (
    <group ref={groupRef}>
      {numbers.map(({ num, pos, color }) => 
        createNumberMesh(num, pos, color)
      )}
    </group>
  )
}

// Main Cosmic Background Component
const CosmicBackground = ({ intensity = 1 }) => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current?.querySelector('canvas')
    if (canvas) {
      const contextId = webglManager.registerCanvas(canvas)
      
      // Set up context loss handlers
      webglManager.onContextLost(contextId, (event) => {
        console.warn('CosmicBackground: WebGL context lost')
      })
      
      webglManager.onContextRestored(contextId, (event) => {
        console.log('CosmicBackground: WebGL context restored')
      })

      return () => {
        webglManager.unregisterCanvas(canvas)
      }
    }
  }, [])

  return (
    <div ref={canvasRef} className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: false, // Reduce memory usage
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false, // Better for memory
          powerPreference: "low-power" // Use integrated GPU when available
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // Limit pixel ratio for performance
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {intensity > 0.5 && <CosmicParticles />}
        {intensity > 0.3 && <SacredGeometry />}
        {intensity > 0.7 && <NumerologySymbols />}
      </Canvas>
    </div>
  )
}

export default CosmicBackground
