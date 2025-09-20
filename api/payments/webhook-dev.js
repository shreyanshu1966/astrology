const crypto = require('crypto');

// Verify webhook signature
const verifyWebhookSignature = (rawBody, signature, timestamp) => {
  try {
    const webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.warn('Webhook secret not configured');
      return false;
    }

    // Create the signature string as per Cashfree documentation
    const signatureString = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(signatureString, 'utf8')
      .digest('base64');

    return crypto.timingSafeEqual(
      Buffer.from(signature, 'base64'),
      Buffer.from(expectedSignature, 'base64')
    );
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

module.exports = async function webhookHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    const rawBody = JSON.stringify(req.body);

    // Verify webhook signature for production
    if (process.env.NODE_ENV === 'production') {
      if (!signature || !timestamp) {
        return res.status(400).json({ error: 'Missing webhook signature or timestamp' });
      }

      if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
        return res.status(401).json({ error: 'Invalid webhook signature' });
      }
    }

    const { type, data } = req.body;

    console.log('Webhook received:', { type, orderId: data?.order?.order_id });

    // Handle different webhook events
    switch (type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        console.log('Payment successful:', {
          orderId: data.order.order_id,
          paymentId: data.payment.cf_payment_id,
          amount: data.payment.payment_amount,
          status: data.payment.payment_status
        });
        // Here you can update your database, send emails, etc.
        break;

      case 'PAYMENT_FAILED_WEBHOOK':
        console.log('Payment failed:', {
          orderId: data.order.order_id,
          paymentId: data.payment.cf_payment_id,
          failureReason: data.payment.failure_reason
        });
        // Handle failed payment
        break;

      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        console.log('Payment dropped by user:', {
          orderId: data.order.order_id
        });
        // Handle user dropping payment
        break;

      default:
        console.log('Unknown webhook type:', type);
    }

    // Always respond with 200 OK to acknowledge receipt
    res.json({ success: true, message: 'Webhook processed successfully' });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};