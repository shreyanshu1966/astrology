/**
 * WebGL Context Manager
 * Manages WebGL contexts to prevent context loss and memory leaks
 */

class WebGLManager {
  constructor() {
    this.activeContexts = new Set()
    this.maxContexts = 6 // Increased limit for smoother transitions
    this.contextLostCallbacks = new Map()
    this.contextRestoredCallbacks = new Map()
    this.cleanupTimeout = null
  }

  /**
   * Register a canvas with the manager
   * @param {HTMLCanvasElement} canvas 
   * @param {Object} options
   */
  registerCanvas(canvas, options = {}) {
    if (this.activeContexts.size >= this.maxContexts) {
      console.warn('WebGL: Maximum contexts reached, cleaning up oldest...')
      this.cleanupOldestContext()
    }

    const contextId = this.generateContextId()
    this.activeContexts.add(contextId)

    // Add context lost/restored event listeners
    const handleContextLost = (event) => {
      event.preventDefault()
      console.warn('WebGL context lost for canvas:', contextId)
      
      const callback = this.contextLostCallbacks.get(contextId)
      if (callback) callback(event)
    }

    const handleContextRestored = (event) => {
      console.log('WebGL context restored for canvas:', contextId)
      
      const callback = this.contextRestoredCallbacks.get(contextId)
      if (callback) callback(event)
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    // Store cleanup function
    canvas._webglCleanup = () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
      this.activeContexts.delete(contextId)
      this.contextLostCallbacks.delete(contextId)
      this.contextRestoredCallbacks.delete(contextId)
    }

    canvas._webglContextId = contextId
    return contextId
  }

  /**
   * Unregister a canvas
   * @param {HTMLCanvasElement} canvas 
   */
  unregisterCanvas(canvas) {
    if (canvas._webglCleanup) {
      canvas._webglCleanup()
    }
  }

  /**
   * Set callback for context lost event
   * @param {string} contextId 
   * @param {Function} callback 
   */
  onContextLost(contextId, callback) {
    this.contextLostCallbacks.set(contextId, callback)
  }

  /**
   * Set callback for context restored event
   * @param {string} contextId 
   * @param {Function} callback 
   */
  onContextRestored(contextId, callback) {
    this.contextRestoredCallbacks.set(contextId, callback)
  }

  /**
   * Force cleanup of oldest context
   */
  cleanupOldestContext() {
    // Debounce cleanup to prevent rapid successive cleanups
    if (this.cleanupTimeout) {
      clearTimeout(this.cleanupTimeout)
    }
    
    this.cleanupTimeout = setTimeout(() => {
      const oldestId = this.activeContexts.values().next().value
      if (oldestId) {
        this.activeContexts.delete(oldestId)
        this.contextLostCallbacks.delete(oldestId)
        this.contextRestoredCallbacks.delete(oldestId)
      }
    }, 100) // Small delay to debounce
  }

  /**
   * Generate unique context ID
   */
  generateContextId() {
    return `webgl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  /**
   * Get current context count
   */
  getContextCount() {
    return this.activeContexts.size
  }

  /**
   * Clean up all contexts
   */
  cleanupAll() {
    this.activeContexts.clear()
    this.contextLostCallbacks.clear()
    this.contextRestoredCallbacks.clear()
  }
}

// Create singleton instance
export const webglManager = new WebGLManager()

/**
 * React hook for managing WebGL contexts
 */
import { useEffect } from 'react'

export function useWebGLContext(canvasRef, options = {}) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const contextId = webglManager.registerCanvas(canvas, options)

    return () => {
      webglManager.unregisterCanvas(canvas)
    }
  }, [canvasRef, options])
}

export default webglManager
