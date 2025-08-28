import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { webglManager } from '../utils/webglManager'

/**
 * Hook to manage WebGL contexts across route changes
 * Ensures proper cleanup when navigating between pages
 */
export function useRouteBasedWebGLCleanup() {
  const location = useLocation()

  useEffect(() => {
    // Clean up all existing contexts when route changes
    // This prevents multiple contexts from being active simultaneously
    const handleRouteChange = () => {
      // Add a longer delay to allow new components to register first
      setTimeout(() => {
        const contextCount = webglManager.getContextCount()
        if (contextCount > 2) { // Allow up to 2 contexts for smoother transitions
          console.log(`Multiple WebGL contexts detected (${contextCount}), cleaning up...`)
          // Keep the 2 most recent contexts
          while (webglManager.getContextCount() > 2) {
            webglManager.cleanupOldestContext()
          }
        }
      }, 500) // Longer delay for more stable transitions
    }

    handleRouteChange()
  }, [location.pathname])

  // Cleanup all contexts on component unmount
  useEffect(() => {
    return () => {
      // Optional: Clean up all contexts when the app unmounts
      // webglManager.cleanupAll()
    }
  }, [])
}

export default useRouteBasedWebGLCleanup
