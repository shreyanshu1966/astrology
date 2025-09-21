const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { paymentLimiter, orderCreationLimiter, validatePaymentRequest } = require('../middleware/paymentSecurity');

// Health check route
router.get('/health', paymentController.healthCheck);

// Create payment order with enhanced security
router.post('/create-order', 
  orderCreationLimiter,
  validatePaymentRequest,
  paymentController.createOrder
);

// Create test payment order (₹1-10 for testing)
router.post('/test-order', 
  orderCreationLimiter,
  paymentController.createTestOrder
);

// Handle Cashfree webhook (no rate limiting for webhooks)
router.post('/webhook', paymentController.handleWebhook);

// Get payment status by order ID
router.get('/status/:orderId', paymentController.getPaymentStatus);

// Get payment link by order ID
router.get('/link/:orderId', paymentController.getPaymentLink);

// Check email confirmation status for an order
router.get('/email-status/:orderId', paymentController.checkEmailStatus);

// Manually send confirmation email for an order
router.post('/send-email/:orderId', paymentController.sendConfirmationEmail);

module.exports = router;