const paymentService = require('../services/paymentService');
const emailService = require('../services/emailService');
const { validateServiceAmount } = require('../utils/serviceValidator');

// In-memory tracking for email confirmations (replace with database in production)
const emailSentTracker = new Map();

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

      // Validate service amount against catalog
      if (!validateServiceAmount(serviceType, amount)) {
        console.warn(`Invalid amount for service: ${serviceType}, amount: ${amount}, IP: ${req.ip}`);
        return res.status(400).json({
          success: false,
          message: 'Invalid amount. All services are priced at ₹499 only.'
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
        orderNote: `Payment for ${serviceType} - DOB: ${dateOfBirth} - WhatsApp: +91${whatsappNumber} - Reason: ${reasonForReport.length > 50 ? reasonForReport.substring(0, 50) + '...' : reasonForReport}`
      };

      const result = await paymentService.createOrder(orderData);

      // Note: Email confirmation will be sent after payment verification, not during order creation

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
   * Handle payment webhook from Cashfree (DEPRECATED - not using webhooks)
   */
  async handleWebhook(req, res) {
    // Webhook functionality disabled as per user request
    // All payment confirmations are handled via status polling
    
    res.status(200).json({
      success: true,
      message: 'Webhook received but not processed (webhooks disabled)'
    });
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

      // Send confirmation email if payment is successful and email hasn't been sent yet
      if (payment.payment_status === 'SUCCESS') {
        try {
          // Check if email has already been sent for this order
          const emailAlreadySent = emailSentTracker.has(orderId);
          
          if (!emailAlreadySent) {
            // Extract customer details from order note or payment data
            const orderNote = payment.order_note || '';
            
            // Try to parse customer details from order note
            const dobMatch = orderNote.match(/DOB:\s*([^-]+)/);
            const whatsappMatch = orderNote.match(/WhatsApp:\s*([^-]+)/);
            const reasonMatch = orderNote.match(/Reason:\s*(.+)$/);
            
            if (payment.customer_email && payment.customer_name) {
              await emailService.sendOrderConfirmation({
                customerName: payment.customer_name,
                customerEmail: payment.customer_email,
                orderId: payment.order_id,
                orderAmount: payment.payment_amount,
                serviceType: 'Astrology Consultation',
                dateOfBirth: dobMatch ? dobMatch[1].trim() : 'Not specified',
                whatsappNumber: whatsappMatch ? whatsappMatch[1].trim() : payment.customer_phone || 'Not specified',
                reasonForReport: reasonMatch ? reasonMatch[1].trim() : 'Astrology consultation requested'
              });
              
              // Mark email as sent
              emailSentTracker.set(orderId, {
                sentAt: new Date(),
                customerEmail: payment.customer_email
              });
              
              console.log(`✅ Confirmation email sent for successful payment: ${orderId}`);
            } else {
              console.log(`⚠️ Missing customer details for order ${orderId}, cannot send confirmation email`);
            }
          } else {
            console.log(`📧 Confirmation email already sent for order ${orderId}`);
          }
        } catch (emailError) {
          console.error(`❌ Failed to send confirmation email for order ${orderId}:`, emailError.message);
          // Don't fail the status request if email fails
        }
      }

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
          timestamp: new Date().toISOString(),
          emailsSent: emailSentTracker.size
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

  /**
   * Check if confirmation email was sent for an order
   */
  async checkEmailStatus(req, res) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
      }

      const emailStatus = emailSentTracker.get(orderId);
      
      res.status(200).json({
        success: true,
        data: {
          orderId,
          emailSent: !!emailStatus,
          sentAt: emailStatus?.sentAt || null,
          customerEmail: emailStatus?.customerEmail || null
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to check email status',
        error: error.message
      });
    }
  }
}

module.exports = new PaymentController();