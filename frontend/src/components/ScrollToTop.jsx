import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ behavior = 'instant', excludePaths = [] }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Check if current path should be excluded from auto-scroll
    const shouldScroll = !excludePaths.some(path => pathname.startsWith(path))
    
    if (shouldScroll) {
      // Small delay to ensure DOM is ready and any animations have started
      const timeoutId = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: behavior
        })
      }, 0)

      return () => clearTimeout(timeoutId)
    }
  }, [pathname, behavior, excludePaths])

  return null
}

export default ScrollToTop
