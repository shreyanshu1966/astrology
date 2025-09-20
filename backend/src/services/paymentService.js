const cashfreeConfig = require('../config/cashfree');
const crypto = require('crypto');

class PaymentService {
  constructor() {
    this.cashfree = cashfreeConfig.getCashfreeInstance();
  }

  /**
   * Generate a valid customer ID from email
   * @param {string} email - Customer email
   * @returns {string} - Valid customer ID
   */
  generateCustomerId(email) {
    // Remove special characters and replace with underscores
    const baseId = email
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
    
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString().slice(-6); // Last 6 digits
    return `customer_${baseId}_${timestamp}`;
  }

  /**
   * Create a payment order
   * @param {Object} orderData - Order details
   * @returns {Object} - Payment order response
   */
  async createOrder(orderData) {
    try {
      const {
        orderId,
        orderAmount,
        customerDetails,
        orderNote = 'Astrology Service Payment'
      } = orderData;

      // Generate a valid customer ID from email
      const validCustomerId = this.generateCustomerId(customerDetails.customerEmail);

      const request = {
        order_id: orderId,
        order_amount: orderAmount,
        order_currency: 'INR',
        order_note: orderNote,
        customer_details: {
          customer_id: validCustomerId,
          customer_name: customerDetails.customerName,
          customer_email: customerDetails.customerEmail,
          customer_phone: customerDetails.customerPhone,
        },
        order_meta: {
          return_url: process.env.FRONTEND_URL + '/payment/success?order_id={order_id}',
          notify_url: process.env.BACKEND_URL + '/api/payment/webhook',
        }
      };

      console.log('Creating Cashfree order:', request);
      
      const response = await this.cashfree.PGCreateOrder('2023-08-01', request);
      
      console.log('Cashfree order created:', response.data);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating Cashfree order:', error.response?.data || error.message);
      throw new Error('Failed to create payment order: ' + (error.response?.data?.message || error.message));
    }
  }

  /**
   * Get payment details by order ID
   * @param {string} orderId - Order ID
   * @returns {Object} - Payment details
   */
  async getPaymentDetails(orderId) {
    try {
      const response = await this.cashfree.PGOrderFetchPayments('2023-08-01', orderId);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching payment details:', error.response?.data || error.message);
      throw new Error('Failed to fetch payment details: ' + (error.response?.data?.message || error.message));
    }
  }

  /**
   * Verify payment signature
   * @param {Object} webhookData - Webhook data from Cashfree
   * @returns {boolean} - Signature verification result
   */
  verifyWebhookSignature(webhookData, signature, timestamp) {
    try {
      const secretKey = process.env.CASHFREE_SECRET_KEY;
      const payload = JSON.stringify(webhookData);
      
      const expectedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(timestamp + payload)
        .digest('base64');

      return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      );
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return false;
    }
  }

  /**
   * Generate a unique order ID
   * @returns {string} - Unique order ID
   */
  generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `astro_${timestamp}_${random}`;
  }

  /**
   * Validate order amount
   * @param {number} amount - Amount to validate
   * @returns {boolean} - Validation result
   */
  validateAmount(amount) {
    return typeof amount === 'number' && amount > 0 && amount <= 100000; // Max 1 lakh
  }

  /**
   * Get payment link for an order
   * @param {string} orderId - Order ID
   * @returns {Object} - Payment link response
   */
  async getPaymentLink(orderId) {
    try {
      const response = await this.cashfree.PGOrderFetchPaymentLink('2023-08-01', orderId);
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching payment link:', error.response?.data || error.message);
      throw new Error('Failed to fetch payment link: ' + (error.response?.data?.message || error.message));
    }
  }
}

module.exports = new PaymentService();