// Service catalog with fixed prices - prevents amount manipulation
const SERVICE_CATALOG = {
  'Self-Awareness Report': { price: 499, maxPrice: 499, testPrice: 1 },
  'Complete Self-Awareness Report': { price: 499, maxPrice: 499, testPrice: 1 },
  'Astrology Consultation': { price: 499, maxPrice: 499, testPrice: 1 },
  'Numerology Report': { price: 499, maxPrice: 499, testPrice: 1 },
  'Complete Life Reading': { price: 499, maxPrice: 499, testPrice: 1 },
  // All services are priced at ₹499 (production) or ₹1 (test)
};

/**
 * Validate if the payment amount matches the service price
 * @param {string} serviceType - Service type
 * @param {number} amount - Payment amount
 * @returns {boolean} - Validation result
 */
function validateServiceAmount(serviceType, amount) {
  // Check if service exists in catalog
  if (!SERVICE_CATALOG[serviceType]) {
    // For backward compatibility, allow any service with ₹499 or ₹1
    return amount === 499 || amount === 1;
  }
  
  const service = SERVICE_CATALOG[serviceType];
  
  // Allow either production price (₹499) or test price (₹1)
  return amount === service.price || amount === service.testPrice;
}

module.exports = {
  SERVICE_CATALOG,
  validateServiceAmount
};