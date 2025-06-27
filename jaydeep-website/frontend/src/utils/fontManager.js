/**
 * Font Manager
 * Handles font loading and fallbacks to prevent font loading errors
 */

class FontManager {
  constructor() {
    this.loadedFonts = new Set()
    this.fallbackFonts = {
      'Inter': 'system-ui, -apple-system, sans-serif',
      'Playfair Display': 'Georgia, serif',
      'Dancing Script': 'cursive'
    }
  }

  /**
   * Initialize font loading with error handling
   */
  async initializeFonts() {
    try {
      // Check if FontFace API is supported
      if (!('FontFace' in window)) {
        console.warn('FontFace API not supported, using fallback fonts')
        this.applyFallbackFonts()
        return
      }

      // Load Google Fonts with error handling
      await this.loadGoogleFonts()
    } catch (error) {
      console.warn('Error loading fonts, using fallbacks:', error)
      this.applyFallbackFonts()
    }
  }

  /**
   * Load Google Fonts with timeout
   */
  async loadGoogleFonts() {
    const fontPromises = [
      this.loadFont('Inter', 'normal', '400'),
      this.loadFont('Playfair Display', 'normal', '400'),
      this.loadFont('Dancing Script', 'normal', '400')
    ]

    // Use Promise.allSettled to handle individual font failures
    const results = await Promise.allSettled(fontPromises)
    
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.warn(`Failed to load font ${index}:`, result.reason)
      }
    })
  }

  /**
   * Load individual font with timeout
   */
  async loadFont(family, style = 'normal', weight = '400') {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Font loading timeout: ${family}`))
      }, 5000) // 5 second timeout

      try {
        document.fonts.load(`${weight} 16px "${family}"`).then(() => {
          clearTimeout(timeout)
          this.loadedFonts.add(family)
          resolve(family)
        }).catch((error) => {
          clearTimeout(timeout)
          reject(error)
        })
      } catch (error) {
        clearTimeout(timeout)
        reject(error)
      }
    })
  }

  /**
   * Apply fallback fonts when primary fonts fail
   */
  applyFallbackFonts() {
    const style = document.createElement('style')
    style.textContent = `
      .font-heading {
        font-family: ${this.fallbackFonts['Playfair Display']};
      }
      .font-body {
        font-family: ${this.fallbackFonts['Inter']};
      }
      .font-accent {
        font-family: ${this.fallbackFonts['Dancing Script']};
      }
    `
    document.head.appendChild(style)
  }

  /**
   * Check if a font is loaded
   */
  isFontLoaded(fontFamily) {
    return this.loadedFonts.has(fontFamily)
  }

  /**
   * Get fallback for a font family
   */
  getFallback(fontFamily) {
    return this.fallbackFonts[fontFamily] || 'sans-serif'
  }
}

// Create singleton instance
export const fontManager = new FontManager()

/**
 * React hook for font loading
 */
import { useEffect, useState } from 'react'

export function useFontLoader() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [fontError, setFontError] = useState(null)

  useEffect(() => {
    fontManager.initializeFonts()
      .then(() => {
        setFontsLoaded(true)
      })
      .catch((error) => {
        setFontError(error)
        setFontsLoaded(true) // Still mark as loaded with fallbacks
      })
  }, [])

  return { fontsLoaded, fontError }
}

export default fontManager
