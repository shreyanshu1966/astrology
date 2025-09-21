// Service catalog with fixed prices - prevents amount manipulation
const SERVICE_CATALOG = {
  'Complete Self-Awareness Report': { price: 499, maxPrice: 499 },
  'Astrology Consultation': { price: 499, maxPrice: 499 },
  'Numerology Report': { price: 499, maxPrice: 499 },
  'Complete Life Reading': { price: 499, maxPrice: 499 },
  // All services are priced at ₹499
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
    return false; // Unknown service
  }
  
  // Since all services are ₹499, validate against this fixed price
  const expectedAmount = 499;
  
  // Only allow exact amount of ₹499
  return amount === expectedAmount;
}

module.exports = {
  SERVICE_CATALOG,
  validateServiceAmount
};