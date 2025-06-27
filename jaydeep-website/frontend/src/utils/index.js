import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 * @param {...(string | object | Array)} inputs - Class names or conditional objects
 * @returns {string} Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'INR')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Utility function to validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Utility function to validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone is valid
 */
export function isValidPhone(phone) {
  const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Utility function to generate a random ID
 * @returns {string} Random ID
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

/**
 * Utility function to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Utility function to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Utility function to scroll to element smoothly
 * @param {string} elementId - ID of element to scroll to
 * @param {number} offset - Offset from top (default: 0)
 */
export function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Utility function to check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Utility function to get numerology number from name
 * @param {string} name - Name to calculate numerology for
 * @returns {number} Numerology number
 */
export function calculateNumerology(name) {
  const letterValues = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
  }
  
  let sum = 0
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '')
  
  for (let char of cleanName) {
    sum += letterValues[char] || 0
  }
  
  // Reduce to single digit
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
  }
  
  return sum
}

/**
 * Utility function to format date
 * @param {Date} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long')
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'medium') {
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    medium: { year: 'numeric', month: 'long', day: 'numeric' },
    long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  }
  
  return new Intl.DateTimeFormat('en-IN', options[format]).format(date)
}

/**
 * Utility function to scroll to top of page
 * @param {string} behavior - 'smooth' or 'instant' (default: 'instant')
 */
export function scrollToTop(behavior = 'instant') {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior
  })
}

/**
 * Utility function to save scroll position
 * @param {string} key - Key to save scroll position under
 */
export function saveScrollPosition(key = 'scrollPosition') {
  const scrollPosition = {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  }
  sessionStorage.setItem(key, JSON.stringify(scrollPosition))
}

/**
 * Utility function to restore scroll position
 * @param {string} key - Key to restore scroll position from
 * @param {string} behavior - 'smooth' or 'instant' (default: 'instant')
 */
export function restoreScrollPosition(key = 'scrollPosition', behavior = 'instant') {
  const savedPosition = sessionStorage.getItem(key)
  if (savedPosition) {
    const { x, y } = JSON.parse(savedPosition)
    window.scrollTo({
      top: y,
      left: x,
      behavior: behavior
    })
    // Clear the saved position after restoring
    sessionStorage.removeItem(key)
  }
}
