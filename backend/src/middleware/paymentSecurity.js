const rateLimit = require('express-rate-limit');

// Payment-specific rate limiting
const paymentLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 3, // Max 3 payment attempts per IP in 5 minutes
  message: {
    success: false,
    message: 'Too many payment attempts. Please wait before trying again.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Order creation limiter
const orderCreationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Max 5 order creation attempts per IP per minute
  message: {
    success: false,
    message: 'Too many order creation attempts. Please wait before trying again.'
  }
});

// Enhanced request validation middleware
const validatePaymentRequest = (req, res, next) => {
  const { body } = req;
  
  // Check for required fields
  const requiredFields = ['amount', 'customerName', 'customerEmail', 'customerPhone', 'dateOfBirth', 'whatsappNumber', 'reasonForReport'];
  const missingFields = requiredFields.filter(field => !body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }
  
  // Sanitize input data
  Object.keys(body).forEach(key => {
    if (typeof body[key] === 'string') {
      body[key] = body[key].trim();
    }
  });
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script|javascript:|data:|vbscript:/i,
    /union\s+select|drop\s+table|insert\s+into/i
  ];
  
  const hassuspicious = Object.values(body).some(value => {
    if (typeof value === 'string') {
      return suspiciousPatterns.some(pattern => pattern.test(value));
    }
    return false;
  });
  
  if (hassuspicious) {
    console.warn('Suspicious request detected:', {
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      body: body
    });
    
    return res.status(400).json({
      success: false,
      message: 'Invalid request data'
    });
  }
  
  next();
};

module.exports = {
  paymentLimiter,
  orderCreationLimiter,
  validatePaymentRequest
};