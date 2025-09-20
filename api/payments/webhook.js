import crypto from 'crypto';

// CORS headers
const getCorsOrigin = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://astrology-website.vercel.app';
  }
  return 'http://localhost:3001';
};

const corsHeaders = {
  'Access-Control-Allow-Origin': getCorsOrigin(),
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-webhook-signature, x-webhook-timestamp',
};

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

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const signature = req.headers['x-webhook-signature'];
    const timestamp = req.headers['x-webhook-timestamp'];
    const rawBody = JSON.stringify(req.body);

    console.log('Webhook received:', {
      signature: signature ? 'present' : 'missing',
      timestamp: timestamp ? 'present' : 'missing',
      bodyLength: rawBody.length
    });

    // Verify webhook signature (optional for development, required for production)
    if (process.env.CASHFREE_ENVIRONMENT === 'PROD' && signature && timestamp) {
      const isValidSignature = verifyWebhookSignature(rawBody, signature, timestamp);
      if (!isValidSignature) {
        console.error('Invalid webhook signature');
        res.status(401).json({ error: 'Invalid signature' });
        return;
      }
    }

    const webhookData = req.body;
    
    // Log the webhook data for debugging
    console.log('Webhook data:', JSON.stringify(webhookData, null, 2));

    // Extract payment information
    const {
      type,
      data: {
        order = {},
        payment = {}
      } = {}
    } = webhookData;

    // Handle different webhook types
    switch (type) {
      case 'PAYMENT_SUCCESS_WEBHOOK':
        console.log(`Payment successful for order ${order.order_id}:`, {
          orderId: order.order_id,
          paymentId: payment.cf_payment_id,
          amount: payment.payment_amount,
          status: payment.payment_status
        });
        
        // Here you can add your business logic:
        // - Update database with payment status
        // - Send confirmation emails
        // - Activate services
        // - etc.
        
        break;

      case 'PAYMENT_FAILED_WEBHOOK':
        console.log(`Payment failed for order ${order.order_id}:`, {
          orderId: order.order_id,
          paymentId: payment.cf_payment_id,
          failureReason: payment.payment_message
        });
        
        // Handle failed payment logic
        break;

      case 'PAYMENT_USER_DROPPED_WEBHOOK':
        console.log(`Payment dropped by user for order ${order.order_id}`);
        // Handle user abandonment
        break;

      default:
        console.log(`Unhandled webhook type: ${type}`);
    }

    // Set headers and respond
    Object.keys(corsHeaders).forEach(key => {
      res.setHeader(key, corsHeaders[key]);
    });

    // Respond with success to acknowledge receipt
    res.status(200).json({ 
      success: true, 
      message: 'Webhook received successfully',
      type: type
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}