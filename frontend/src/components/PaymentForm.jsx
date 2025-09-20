import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PaymentForm = ({ service, onPaymentSuccess, onPaymentError }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    amount: service?.price || 0,
    serviceType: service?.name || 'Astrology Consultation'
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Invalid email format';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.customerPhone)) {
      newErrors.customerPhone = 'Invalid phone number. Enter 10-digit Indian mobile number';
    }
    
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Invalid amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create payment order
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to create payment order');
      }
      
      // Initialize Cashfree payment
      await initiateCashfreePayment(result.data);
      
    } catch (error) {
      console.error('Payment error:', error);
      onPaymentError?.(error.message || 'Payment failed. Please try again.');
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
        mode: 'sandbox' // Change to 'production' for live environment
      });
      
      const checkoutOptions = {
        paymentSessionId: orderData.paymentSessionId,
        returnUrl: `${window.location.origin}/payment/success?order_id=${orderData.orderId}`,
      };
      
      const result = await cashfree.checkout(checkoutOptions);
      
      if (result.error) {
        throw new Error(result.error.message || 'Payment failed');
      }
      
      // Payment successful
      onPaymentSuccess?.(result.paymentDetails);
      
    } catch (error) {
      console.error('Cashfree payment error:', error);
      onPaymentError?.(error.message || 'Payment initialization failed');
    }
  };

  const loadCashfreeSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.Cashfree) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Cashfree SDK'));
      document.head.appendChild(script);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Complete Your Payment
      </h2>
      
      {service && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800">{service.name}</h3>
          <p className="text-blue-600">₹{service.price}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.customerName && (
            <p className="mt-1 text-sm text-red-600">{errors.customerName}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="customerEmail"
            name="customerEmail"
            value={formData.customerEmail}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerEmail ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.customerEmail && (
            <p className="mt-1 text-sm text-red-600">{errors.customerEmail}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="customerPhone"
            name="customerPhone"
            value={formData.customerPhone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.customerPhone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter 10-digit mobile number"
            maxLength="10"
          />
          {errors.customerPhone && (
            <p className="mt-1 text-sm text-red-600">{errors.customerPhone}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹) *
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter amount"
            min="1"
            max="100000"
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          }`}
        >
          {isLoading ? 'Processing...' : `Pay ₹${formData.amount}`}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secured by Cashfree Payments
        </p>
      </div>
    </motion.div>
  );
};

export default PaymentForm;