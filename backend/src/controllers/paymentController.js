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
          console.log('Payment successful via webhook:', data);
          
          // Send confirmation email for successful payment
          try {
            const payment = data.payment || data;
            const orderId = payment.order_id;
            
            // Check if email has already been sent for this order
            const emailAlreadySent = emailSentTracker.has(orderId);
            
            if (!emailAlreadySent && payment.payment_status === 'SUCCESS') {
              // Extract customer details from order or payment data
              const orderNote = payment.order_note || '';
              
              // Parse customer details from order note
              const dobMatch = orderNote.match(/DOB:\s*([^-]+)/);
              const whatsappMatch = orderNote.match(/WhatsApp:\s*([^-]+)/);
              const reasonMatch = orderNote.match(/Reason:\s*(.+)$/);
              const serviceMatch = orderNote.match(/Payment for\s*([^-]+)/);
              
              if (payment.customer_email && payment.customer_name) {
                await emailService.sendOrderConfirmation({
                  customerName: payment.customer_name,
                  customerEmail: payment.customer_email,
                  orderId: payment.order_id,
                  orderAmount: payment.order_amount,
                  serviceType: serviceMatch ? serviceMatch[1].trim() : 'Complete Self-Awareness Report',
                  dateOfBirth: dobMatch ? dobMatch[1].trim() : 'Not specified',
                  whatsappNumber: whatsappMatch ? whatsappMatch[1].trim() : payment.customer_phone || 'Not specified',
                  reasonForReport: reasonMatch ? reasonMatch[1].trim() : 'Astrology consultation requested'
                });
                
                // Mark email as sent
                emailSentTracker.set(orderId, {
                  sentAt: new Date(),
                  customerEmail: payment.customer_email,
                  method: 'webhook'
                });
                
                console.log(`✅ Confirmation email sent via webhook for order: ${orderId}`);
              } else {
                console.log(`⚠️ Missing customer details in webhook for order ${orderId}`);
              }
            } else if (emailAlreadySent) {
              console.log(`📧 Confirmation email already sent for order ${orderId}`);
            }
          } catch (emailError) {
            console.error('❌ Failed to send confirmation email via webhook:', emailError.message);
            // Don't fail the webhook processing if email fails
          }
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

      // Send confirmation email if payment is successful and email hasn't been sent yet
      if (payment.payment_status === 'SUCCESS') {
        try {
          // Check if email has already been sent for this order
          const emailAlreadySent = emailSentTracker.has(orderId);
          
          if (!emailAlreadySent) {
            // Get order details to retrieve customer information
            const orderResult = await paymentService.getOrderDetails(orderId);
            
            if (orderResult.data && orderResult.data.customer_details) {
              const order = orderResult.data;
              const customer = order.customer_details;
              
              // Extract additional details from order note
              const orderNote = order.order_note || '';
              const dobMatch = orderNote.match(/DOB:\s*([^-]+)/);
              const whatsappMatch = orderNote.match(/WhatsApp:\s*([^-]+)/);
              const reasonMatch = orderNote.match(/Reason:\s*(.+)$/);
              const serviceMatch = orderNote.match(/Payment for\s*([^-]+)/);
              
              await emailService.sendOrderConfirmation({
                customerName: customer.customer_name,
                customerEmail: customer.customer_email,
                orderId: orderId,
                orderAmount: payment.payment_amount,
                serviceType: serviceMatch ? serviceMatch[1].trim() : 'Complete Self-Awareness Report',
                dateOfBirth: dobMatch ? dobMatch[1].trim() : 'Not specified',
                whatsappNumber: whatsappMatch ? whatsappMatch[1].trim() : customer.customer_phone || 'Not specified',
                reasonForReport: reasonMatch ? reasonMatch[1].trim() : 'Astrology consultation requested'
              });
              
              // Mark email as sent
              emailSentTracker.set(orderId, {
                sentAt: new Date(),
                customerEmail: customer.customer_email,
                method: 'status-check'
              });
              
              console.log(`✅ Confirmation email sent via status check for order: ${orderId}`);
            } else {
              console.log(`⚠️ No customer details found in order for ${orderId}`);
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

  /**
   * Manually send confirmation email for an order (for testing/recovery)
   */
  async sendConfirmationEmail(req, res) {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: 'Order ID is required'
        });
      }

      // Get payment details first
      const paymentResult = await paymentService.getPaymentDetails(orderId);
      
      if (!paymentResult.data || paymentResult.data.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found'
        });
      }

      const payment = paymentResult.data[0];
      
      if (payment.payment_status !== 'SUCCESS') {
        return res.status(400).json({
          success: false,
          message: 'Email can only be sent for successful payments'
        });
      }

      // Check if email already sent
      const emailAlreadySent = emailSentTracker.has(orderId);
      
      if (emailAlreadySent) {
        return res.status(200).json({
          success: true,
          message: 'Email already sent for this order',
          data: emailSentTracker.get(orderId)
        });
      }

      // Extract customer details from order note
      const orderNote = payment.order_note || '';
      const dobMatch = orderNote.match(/DOB:\s*([^-]+)/);
      const whatsappMatch = orderNote.match(/WhatsApp:\s*([^-]+)/);
      const reasonMatch = orderNote.match(/Reason:\s*(.+)$/);
      const serviceMatch = orderNote.match(/Payment for\s*([^-]+)/);

      if (!payment.customer_email || !payment.customer_name) {
        return res.status(400).json({
          success: false,
          message: 'Customer email or name not found in payment details'
        });
      }

      // Send email
      await emailService.sendOrderConfirmation({
        customerName: payment.customer_name,
        customerEmail: payment.customer_email,
        orderId: payment.order_id,
        orderAmount: payment.payment_amount,
        serviceType: serviceMatch ? serviceMatch[1].trim() : 'Complete Self-Awareness Report',
        dateOfBirth: dobMatch ? dobMatch[1].trim() : 'Not specified',
        whatsappNumber: whatsappMatch ? whatsappMatch[1].trim() : payment.customer_phone || 'Not specified',
        reasonForReport: reasonMatch ? reasonMatch[1].trim() : 'Astrology consultation requested'
      });

      // Mark email as sent
      emailSentTracker.set(orderId, {
        sentAt: new Date(),
        customerEmail: payment.customer_email,
        method: 'manual'
      });

      console.log(`✅ Manual confirmation email sent for order: ${orderId}`);

      res.status(200).json({
        success: true,
        message: 'Confirmation email sent successfully',
        data: {
          orderId,
          customerEmail: payment.customer_email,
          sentAt: new Date()
        }
      });

    } catch (error) {
      console.error('Manual email sending error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send confirmation email',
        error: error.message
      });
    }
  }

  /**
   * Create a test payment order (₹1-10 for testing purposes)
   */
  async createTestOrder(req, res) {
    try {
      const {
        amount = 1,
        customerName,
        customerEmail,
        customerPhone,
        dateOfBirth,
        whatsappNumber,
        reasonForReport,
        serviceType = 'Payment Test'
      } = req.body;

      // Validate required fields
      if (!customerName || !customerEmail || !customerPhone || !dateOfBirth || !whatsappNumber || !reasonForReport) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields for test payment'
        });
      }

      // Validate test amount (₹1-10 only)
      if (!amount || amount < 1 || amount > 10) {
        return res.status(400).json({
          success: false,
          message: 'Test amount should be between ₹1 and ₹10'
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

      const orderId = 'TEST_' + paymentService.generateOrderId();

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
        orderNote: `TEST PAYMENT - ${serviceType} - Amount: ₹${amount} - ${reasonForReport.substring(0, 50)}`
      };

      const result = await paymentService.createOrder(orderData);

      console.log('Test order created:', {
        orderId: orderId,
        amount: amount,
        customer: customerEmail
      });

      res.status(200).json({
        success: true,
        message: 'Test order created successfully',
        data: {
          orderId: result.data.order_id,
          paymentSessionId: result.data.payment_session_id,
          orderAmount: result.data.order_amount,
          orderCurrency: result.data.order_currency,
          orderStatus: result.data.order_status,
          isTest: true
        }
      });

    } catch (error) {
      console.error('Create test order error:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create test payment order'
      });
    }
  }
}

module.exports = new PaymentController();