import React, { useState } from 'react';

const PaymentForm = ({ service, amount, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone } = customerDetails;
    
    if (!name.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }
    
    if (!phone.trim() || !/^\d{10}$/.test(phone.replace(/[^0-9]/g, ''))) {
      alert('Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const initiatePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Create payment order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'INR',
          customerDetails,
          orderNote: `Payment for ${service}`
        })
      });

      const orderData = await response.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Load Cashfree SDK
      const cashfree = window.Cashfree({
        mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
      });

      // Configure checkout options
      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        returnUrl: `${window.location.origin}/payment-success?order_id=${orderData.order_id}`,
        notifyUrl: `${window.location.origin}/api/payments/webhook`,
        theme: {
          color: '#6366f1' // Customize theme color
        }
      };

      // Open Cashfree checkout
      cashfree.checkout(checkoutOptions).then((result) => {
        console.log('Payment result:', result);
        
        if (result.error) {
          console.error('Payment error:', result.error);
          onError?.(result.error);
        } else if (result.redirect) {
          console.log('Redirecting to:', result.redirect);
          // Let the redirect happen naturally
        } else {
          // Payment completed, verify the status
          verifyPayment(orderData.order_id);
        }
      }).catch((error) => {
        console.error('Cashfree checkout error:', error);
        onError?.(error);
      });

    } catch (error) {
      console.error('Payment initiation error:', error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (orderId) => {
    try {
      const response = await fetch(`/api/payments/verify-payment?order_id=${orderId}`);
      const result = await response.json();
      
      if (result.success && result.payment_status === 'SUCCESS') {
        onSuccess?.(result);
      } else {
        onError?.('Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      onError?.(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Payment Details
      </h3>
      
      <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
        <p className="text-sm text-gray-600">Service: <span className="font-medium">{service}</span></p>
        <p className="text-lg font-bold text-indigo-600">Amount: ₹{amount}</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); initiatePayment(); }} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerDetails.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={customerDetails.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={customerDetails.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          }`}
        >
          {loading ? 'Processing...' : `Pay ₹${amount}`}
        </button>
      </form>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>🔒 Secure payment powered by Cashfree</p>
        <p>Your payment information is encrypted and secure</p>
      </div>
    </div>
  );
};

export default PaymentForm;