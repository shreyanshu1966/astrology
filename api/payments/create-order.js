const { Cashfree } = require('cashfree-pg');

// Initialize Cashfree with environment variables
const initializeCashfree = () => {
  Cashfree.XClientId = process.env.CASHFREE_APP_ID;
  Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
  Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'PROD' 
    ? Cashfree.Environment.PRODUCTION 
    : Cashfree.Environment.SANDBOX;
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
    // Initialize Cashfree
    initializeCashfree();

    const { amount, currency = 'INR', customerDetails, orderNote = 'Astrology Service Payment' } = req.body;

    // Validate required fields
    if (!amount || !customerDetails?.name || !customerDetails?.email || !customerDetails?.phone) {
      res.status(400).json({ 
        error: 'Missing required fields: amount, customerDetails (name, email, phone)' 
      });
      return;
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create order request
    const orderRequest = {
      order_id: orderId,
      order_amount: parseFloat(amount),
      order_currency: currency,
      customer_details: {
        customer_id: `customer_${Date.now()}`,
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
      },
      order_meta: {
        return_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/payment-success?order_id={order_id}`,
        notify_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/api/payments/webhook`,
        payment_methods: 'cc,dc,nb,upi,paylater,emi,cardlessemi,debitcard',
      },
      order_note: orderNote,
    };

    console.log('Creating order with request:', JSON.stringify(orderRequest, null, 2));

    // Create order using Cashfree API
    const response = await Cashfree.PGCreateOrder('2023-08-01', orderRequest);
    
    if (response.data && response.data.payment_session_id) {
      res.status(200).setHeader('Content-Type', 'application/json');
      Object.keys(corsHeaders).forEach(key => {
        res.setHeader(key, corsHeaders[key]);
      });
      
      res.json({
        success: true,
        order_id: orderId,
        payment_session_id: response.data.payment_session_id,
        order_status: response.data.order_status,
        order_amount: response.data.order_amount,
        order_currency: response.data.order_currency,
      });
    } else {
      console.error('Cashfree API error:', response);
      res.status(500).json({ 
        error: 'Failed to create payment order',
        details: response.data || 'Unknown error'
      });
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}