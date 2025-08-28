import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Export scroll management hooks
export { useScrollToTop, useScrollRestore, useScrollToElement } from './useScrollManagement'

// Hook for fade-in animations
export const useFadeInAnimation = (direction = 'up', delay = 0, duration = 0.8) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const initialProps = {
      opacity: 0,
      duration,
      delay,
      ease: "power2.out"
    }

    switch (direction) {
      case 'up':
        initialProps.y = 50
        break
      case 'down':
        initialProps.y = -50
        break
      case 'left':
        initialProps.x = -50
        break
      case 'right':
        initialProps.x = 50
        break
      default:
        break
    }

    gsap.fromTo(element, initialProps, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power2.out"
    })
  }, [direction, delay, duration])

  return ref
}

// Hook for scroll-triggered animations
export const useScrollAnimation = (animationType = 'fadeIn', options = {}) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Kill any existing animations on this element
    gsap.killTweensOf(element)

    const defaultOptions = {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      refreshPriority: 1,
      ...options
    }

    let animation

    switch (animationType) {
      case 'fadeIn':
        animation = gsap.fromTo(element, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            ease: "power2.out",
            scrollTrigger: defaultOptions
          }
        )
        break

      case 'slideInLeft':
        animation = gsap.fromTo(element,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: defaultOptions
          }
        )
        break

      case 'slideInRight':
        animation = gsap.fromTo(element,
          { opacity: 0, x: 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: defaultOptions
          }
        )
        break

      case 'scaleIn':
        animation = gsap.fromTo(element,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: defaultOptions
          }
        )
        break

      case 'staggerChildren':
        const children = element.children
        animation = gsap.fromTo(children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: defaultOptions
          }
        )
        break

      default:
        break
    }

    return () => {
      if (animation) {
        animation.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [animationType, JSON.stringify(options)])

  return ref
}

// Hook for number counter animation
export const useCounterAnimation = (endValue, duration = 2, delay = 0) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Kill any existing animations on this element
    gsap.killTweensOf(element)

    const obj = { value: 0 }
    
    const animation = gsap.to(obj, {
      value: endValue,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        element.textContent = Math.round(obj.value)
      },
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none none",
        once: true // Only play once to prevent repetition
      }
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [endValue, duration, delay])

  return ref
}

// Hook for hover animations
export const useHoverAnimation = (scaleAmount = 1.05, duration = 0.3) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: scaleAmount,
        duration,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease: "power2.out"
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [scaleAmount, duration])

  return ref
}

// Hook for text reveal animation
export const useTextRevealAnimation = (delay = 0) => {
  const ref = useRef()
  const isInitialized = useRef(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isInitialized.current) return

    // Store original text
    const originalText = element.textContent
    
    // Kill any existing animations
    gsap.killTweensOf(element)

    // Split text into words for animation
    const words = originalText.split(' ')
    element.innerHTML = words.map(word => 
      `<span class="inline-block overflow-hidden"><span class="inline-block">${word}</span></span>`
    ).join(' ')

    const wordSpans = element.querySelectorAll('span span')

    const animation = gsap.fromTo(wordSpans,
      { 
        opacity: 0, 
        y: 30,
        rotationX: -45
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.08,
        delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none none",
          once: true
        }
      }
    )

    isInitialized.current = true

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
      // Restore original text on cleanup
      element.textContent = originalText
      isInitialized.current = false
    }
  }, [delay])

  return ref
}

// Hook for parallax scrolling
export const useParallaxAnimation = (speed = 0.5) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const animation = gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    return () => animation.kill()
  }, [speed])

  return ref
}

// Hook for loading animation
export const useLoadingAnimation = () => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const tl = gsap.timeline({ repeat: -1 })
    
    tl.to(element, {
      rotation: 360,
      duration: 1,
      ease: "none"
    })

    return () => tl.kill()
  }, [])

  return ref
}

// Advanced scroll-triggered animation with stagger
export const useStaggerRevealAnimation = (selector = '.stagger-item', options = {}) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Kill any existing animations on child elements
    const items = element.querySelectorAll(selector)
    if (items.length === 0) return

    gsap.killTweensOf(items)

    const defaultOptions = {
      trigger: element,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      refreshPriority: 1,
      ...options
    }

    const animation = gsap.fromTo(items,
      { 
        opacity: 0, 
        y: 40,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: defaultOptions
      }
    )

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [selector, JSON.stringify(options)])

  return ref
}

// Progress bar animation
export const useProgressAnimation = (targetValue = 100, duration = 2) => {
  const ref = useRef()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const progressBar = element.querySelector('.progress-fill')
    const progressText = element.querySelector('.progress-text')

    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
        once: true
      }
    })

    animation
      .fromTo(progressBar, 
        { width: '0%' },
        { 
          width: `${targetValue}%`,
          duration,
          ease: "power2.out"
        }
      )
      .fromTo({ value: 0 },
        { value: targetValue },
        {
          duration,
          ease: "power2.out",
          onUpdate: function() {
            if (progressText) {
              progressText.textContent = Math.round(this.targets()[0].value) + '%'
            }
          }
        },
        "<"
      )

    return () => animation.kill()
  }, [targetValue, duration])

  return ref
}
