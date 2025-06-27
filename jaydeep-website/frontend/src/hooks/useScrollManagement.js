import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToTop, saveScrollPosition, restoreScrollPosition } from '../utils'

/**
 * Hook to manage scroll behavior on route changes
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - Scroll behavior ('instant' or 'smooth')
 * @param {Array} options.excludePaths - Paths to exclude from auto-scroll
 * @param {boolean} options.savePosition - Whether to save/restore scroll position
 */
export const useScrollToTop = (options = {}) => {
  const {
    behavior = 'instant',
    excludePaths = [],
    savePosition = false
  } = options
  
  const location = useLocation()

  useEffect(() => {
    const shouldScroll = !excludePaths.some(path => location.pathname.startsWith(path))
    
    if (shouldScroll) {
      if (savePosition) {
        // Save current position before scrolling
        saveScrollPosition(`scroll_${location.pathname}`)
      }
      
      // Scroll to top with a small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        scrollToTop(behavior)
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [location.pathname, behavior, excludePaths, savePosition])
}

/**
 * Hook to restore scroll position for specific routes
 * @param {string} routeKey - Key to identify the route
 */
export const useScrollRestore = (routeKey) => {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === routeKey) {
      restoreScrollPosition(`scroll_${routeKey}`)
    }
  }, [location.pathname, routeKey])
}

/**
 * Hook to smooth scroll to element on mount
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top
 * @param {Array} deps - Dependencies to trigger scroll
 */
export const useScrollToElement = (elementId, offset = 0, deps = []) => {
  useEffect(() => {
    if (elementId) {
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(elementId)
        if (element) {
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, deps)
}

export default useScrollToTop
