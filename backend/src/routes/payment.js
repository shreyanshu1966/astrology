const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Health check route
router.get('/health', paymentController.healthCheck);

// Create payment order
router.post('/create-order', paymentController.createOrder);

// Handle Cashfree webhook
router.post('/webhook', paymentController.handleWebhook);

// Get payment status by order ID
router.get('/status/:orderId', paymentController.getPaymentStatus);

// Get payment link by order ID
router.get('/link/:orderId', paymentController.getPaymentLink);

module.exports = router;