const paymentService = require('../services/paymentService');

class PaymentController {
  /**
   * Create a new payment order
   */
  async createOrder(req, res) {
    try {
      const {
        amount,
        customerName,
        customerEmail,
        customerPhone,
        dateOfBirth,
        whatsappNumber,
        reasonForReport,
        serviceType = 'Astrology Consultation'
      } = req.body;

      // Validate required fields
      if (!amount || !customerName || !customerEmail || !customerPhone || !dateOfBirth || !whatsappNumber || !reasonForReport) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: amount, customerName, customerEmail, customerPhone, dateOfBirth, whatsappNumber, reasonForReport'
        });
      }

      // Validate amount
      if (!paymentService.validateAmount(amount)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid amount. Amount should be between 1 and 100000'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerEmail)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Validate phone format (10 digits)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(customerPhone)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number. Please provide a valid 10-digit Indian mobile number'
        });
      }

      // Validate WhatsApp number format (10 digits)
      if (!phoneRegex.test(whatsappNumber)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid WhatsApp number. Please provide a valid 10-digit Indian mobile number'
        });
      }

      // Validate date of birth
      const dobDate = new Date(dateOfBirth);
      if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Invalid date of birth'
        });
      }

      const orderId = paymentService.generateOrderId();

      const orderData = {
        orderId,
        orderAmount: amount,
        customerDetails: {
          customerName,
          customerEmail,
          customerPhone: '+91' + customerPhone,
          dateOfBirth,
          whatsappNumber: '+91' + whatsappNumber,
          reasonForReport
        },
        orderNote: `Payment for ${serviceType} - DOB: ${dateOfBirth}`
      };

      const result = await paymentService.createOrder(orderData);

      res.status(200).json({
        success: true,
        message: 'Order created successfully',
        data: {
          orderId: result.data.order_id,
          paymentSessionId: result.data.payment_session_id,
          orderAmount: result.data.order_amount,
          orderCurrency: result.data.order_currency,
          orderStatus: result.data.order_status
        }
      });

    } catch (error) {
      console.error('Create order error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create payment order'
      });
    }
  }

  /**
   * Handle payment webhook from Cashfree
   */
  async handleWebhook(req, res) {
    try {
      const signature = req.headers['x-webhook-signature'];
      const timestamp = req.headers['x-webhook-timestamp'];
      const webhookData = req.body;

      console.log('Received webhook:', {
        signature,
        timestamp,
        data: webhookData
      });

      // Verify webhook signature
      const isValidSignature = paymentService.verifyWebhookSignature(
        webhookData,
        signature,
        timestamp
      );

      if (!isValidSignature) {
        console.error('Invalid webhook signature');
        return res.status(400).json({
          success: false,
          message: 'Invalid signature'
        });
      }

      // Process the webhook based on event type
      const { type, data } = webhookData;

      switch (type) {
        case 'PAYMENT_SUCCESS_WEBHOOK':
          console.log('Payment successful:', data);
          // Here you can update your database, send confirmation emails, etc.
          break;
        
        case 'PAYMENT_FAILED_WEBHOOK':
          console.log('Payment failed:', data);
          // Handle payment failure
          break;
        
        case 'PAYMENT_USER_DROPPED_WEBHOOK':
          console.log('Payment dropped by user:', data);
          // Handle user drop-off
          break;
        
        default:
          console.log('Unknown webhook type:', type);
      }

      res.status(200).json({
        success: true,
        message: 'Webhook processed successfully'
      });

    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process webhook'
      });
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(req, res) {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
      }

      const result = await paymentService.getPaymentDetails(orderId);

      // Add additional validation to ensure we have meaningful data
      if (!result.data || result.data.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No payment data found. Payment may still be processing.',
          data: []
        });
      }

      // Log payment status for debugging
      const payment = result.data[0];
      console.log(`Payment status for order ${orderId}:`, {
        status: payment.payment_status,
        amount: payment.payment_amount,
        method: payment.payment_method
      });

      res.status(200).json({
        success: true,
        message: 'Payment details fetched successfully',
        data: result.data
      });

    } catch (error) {
      console.error('Get payment status error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to fetch payment status';
      if (error.message && error.message.includes('not found')) {
        errorMessage = 'Payment order not found. Please check your order ID.';
      } else if (error.message && error.message.includes('network')) {
        errorMessage = 'Network error while fetching payment status. Please try again.';
      }
      
      res.status(500).json({
        success: false,
        message: errorMessage
      });
    }
  }

  /**
   * Get payment link for an order
   */
  async getPaymentLink(req, res) {
    try {
      const { orderId } = req.params;

      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
      }

      const result = await paymentService.getPaymentLink(orderId);

      res.status(200).json({
        success: true,
        message: 'Payment link fetched successfully',
        data: result.data
      });

    } catch (error) {
      console.error('Get payment link error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch payment link'
      });
    }
  }

  /**
   * Health check for payment service
   */
  async healthCheck(req, res) {
    try {
      const config = require('../config/cashfree').getConfig();
      
      res.status(200).json({
        success: true,
        message: 'Payment service is healthy',
        data: {
          environment: config.environment,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Payment service is not healthy',
        error: error.message
      });
    }
  }
}

module.exports = new PaymentController();