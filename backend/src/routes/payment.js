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

// Handle Cashfree webhook (deprecated - webhooks disabled)
router.post('/webhook', paymentController.handleWebhook);

// Get payment status by order ID
router.get('/status/:orderId', paymentController.getPaymentStatus);

// Get payment link by order ID
router.get('/link/:orderId', paymentController.getPaymentLink);

// Check email confirmation status for an order
router.get('/email-status/:orderId', paymentController.checkEmailStatus);

module.exports = router;