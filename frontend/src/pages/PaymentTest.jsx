import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentTest = () => {
  const [formData, setFormData] = useState({
    customerName: 'Test User',
    customerEmail: 'test@example.com',
    customerPhone: '9876543210',
    dateOfBirth: '1990-01-01',
    whatsappNumber: '9876543210',
    reasonForReport: 'Testing payment gateway',
    amount: 1,
    serviceType: 'Payment Test'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      // Create payment order for testing
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/payment/test-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create test payment order');
      }
      
      setMessage('✅ Test order created successfully! Initiating payment...');
      
      // Initialize Cashfree payment
      await initiateCashfreePayment(result.data);
      
    } catch (error) {
      console.error('Payment test error:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const initiateCashfreePayment = async (orderData) => {
    try {
      // Load Cashfree SDK if not already loaded
      if (!window.Cashfree) {
        await loadCashfreeSDK();
      }
      
      const cashfree = window.Cashfree({
        mode: import.meta.env.VITE_CASHFREE_ENVIRONMENT || 'sandbox'
      });
      
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        returnUrl: `${window.location.origin}/payment/success?order_id=${orderData.orderId}&test=true`,
      };
      
      const result = await cashfree.checkout(checkoutOptions);
      
      if (result.error) {
        throw new Error(result.error.message || 'Payment failed');
      }
      
      console.log('Test payment checkout completed');
      
    } catch (error) {
      console.error('Cashfree payment error:', error);
      setMessage(`❌ Payment Error: ${error.message}`);
    }
  };

  const loadCashfreeSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = import.meta.env.VITE_CASHFREE_ENVIRONMENT === 'production' 
        ? 'https://sdk.cashfree.com/js/v3/cashfree.js'
        : 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                🧪 Payment Gateway Test
              </h1>
              <p className="text-white/80">
                Test ₹1 payment to verify the payment gateway integration
              </p>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 mt-4">
                <p className="text-yellow-200 text-sm">
                  ⚠️ This is a testing page. Remove before production deployment.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Test Amount (₹)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white/90 text-sm font-medium mb-2">
                  Test Reason
                </label>
                <textarea
                  name="reasonForReport"
                  value={formData.reasonForReport}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Test Payment...
                  </div>
                ) : (
                  `Test Payment Gateway (₹${formData.amount})`
                )}
              </button>
            </form>
            
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-white/10 rounded-lg border border-white/20"
              >
                <p className="text-white text-center">{message}</p>
              </motion.div>
            )}
            
            <div className="mt-8 text-center">
              <a 
                href="/"
                className="text-purple-300 hover:text-purple-200 transition-colors duration-300"
              >
                ← Back to Home
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentTest;