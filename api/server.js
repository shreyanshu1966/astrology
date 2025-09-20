require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes - convert ES modules to CommonJS for dev server
const createOrderHandler = require('./payments/create-order-dev.js');
const verifyPaymentHandler = require('./payments/verify-payment-dev.js');
const webhookHandler = require('./payments/webhook-dev.js');

// API Routes
app.post('/api/payments/create-order', createOrderHandler);
app.get('/api/payments/verify-payment', verifyPaymentHandler);
app.post('/api/payments/webhook', webhookHandler);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`- POST http://localhost:${PORT}/api/payments/create-order`);
  console.log(`- GET  http://localhost:${PORT}/api/payments/verify-payment`);
  console.log(`- POST http://localhost:${PORT}/api/payments/webhook`);
  console.log(`- GET  http://localhost:${PORT}/api/health`);
});