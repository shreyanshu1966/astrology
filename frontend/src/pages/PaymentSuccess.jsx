import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  
  const orderId = searchParams.get('order_id');
  const isTestPayment = searchParams.get('test') === 'true';

  useEffect(() => {
    if (orderId) {
      fetchPaymentStatus();
    } else {
      setPaymentStatus('error');
      setError('No order ID found');
    }
  }, [orderId]);

  // Auto-refresh for pending payments
  useEffect(() => {
    let interval;
    if (paymentStatus === 'pending') {
      // Refresh every 5 seconds for pending payments, max 12 times (1 minute)
      let refreshCount = 0;
      interval = setInterval(() => {
        refreshCount++;
        if (refreshCount < 12) {
          fetchPaymentStatus();
        } else {
          clearInterval(interval);
          // After 1 minute, if still pending, suggest manual refresh
          setError('Payment verification is taking longer than expected. Please refresh the page or contact support.');
        }
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [paymentStatus]);

  const getPaymentMethodDisplay = (paymentMethod) => {
    if (!paymentMethod) return 'N/A';
    
    if (typeof paymentMethod === 'string') {
      return paymentMethod;
    }
    
    if (typeof paymentMethod === 'object') {
      // Handle different payment method types
      if (paymentMethod.netbanking) {
        return `Net Banking (${paymentMethod.netbanking})`;
      }
      if (paymentMethod.card) {
        return `Card (${paymentMethod.card})`;
      }
      if (paymentMethod.upi) {
        return `UPI (${paymentMethod.upi})`;
      }
      if (paymentMethod.wallet) {
        return `Wallet (${paymentMethod.wallet})`;
      }
      // Fallback to first available key
      const firstKey = Object.keys(paymentMethod)[0];
      return firstKey ? `${firstKey.charAt(0).toUpperCase() + firstKey.slice(1)}` : 'N/A';
    }
    
    return 'N/A';
  };

  const fetchPaymentStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'}/api/payment/status/${orderId}`
      );
      
      const result = await response.json();
      
      if (result.success && result.data && result.data.length > 0) {
        const payment = result.data[0];
        setPaymentDetails(payment);
        
        // Be strict about payment status - only SUCCESS is truly successful
        switch (payment.payment_status) {
          case 'SUCCESS':
            setPaymentStatus('success');
            break;
          case 'FAILED':
          case 'CANCELLED':
            setPaymentStatus('failed');
            break;
          case 'PENDING':
            setPaymentStatus('pending');
            break;
          case 'USER_DROPPED':
            setPaymentStatus('failed');
            setError('Payment was cancelled by user');
            break;
          default:
            setPaymentStatus('pending');
            setError('Payment status is being verified. Please wait...');
        }
      } else {
        // If no payment data found, treat as pending (not failed yet)
        setPaymentStatus('pending');
        setError('Payment is being processed. Please wait while we verify your payment.');
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
      setPaymentStatus('error');
      setError('Failed to verify payment status. Please contact support if payment was deducted.');
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'failed':
        return <XCircle className="w-16 h-16 text-red-500" />;
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case 'loading':
        return (
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        );
      default:
        return <XCircle className="w-16 h-16 text-gray-500" />;
    }
  };

  const getStatusTitle = () => {
    switch (paymentStatus) {
      case 'success':
        return isTestPayment ? '🧪 Test Payment Successful!' : 'Payment Successful!';
      case 'failed':
        return isTestPayment ? '🧪 Test Payment Failed' : 'Payment Failed';
      case 'pending':
        return isTestPayment ? '🧪 Test Payment Pending' : 'Payment Pending';
      case 'loading':
        return isTestPayment ? 'Verifying Test Payment...' : 'Verifying Payment...';
      default:
        return isTestPayment ? 'Test Payment Status Unknown' : 'Payment Status Unknown';
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return isTestPayment 
          ? 'Your test payment has been processed successfully. The payment gateway is working correctly!' 
          : 'Your payment has been processed successfully. Thank you for choosing our astrology services!';
      case 'failed':
        return isTestPayment 
          ? 'Your test payment could not be processed or was cancelled. This may indicate an issue with the payment gateway configuration.' 
          : 'Your payment could not be processed or was cancelled. Please try again or contact support if amount was deducted.';
      case 'pending':
        return isTestPayment 
          ? 'Your test payment is being verified. Please wait for confirmation.' 
          : 'Your payment is being verified. Please wait for confirmation. Do not make another payment.';
      case 'loading':
        return 'Please wait while we verify your payment status...';
      default:
        return error || 'Unable to determine payment status. Please contact support if payment was deducted.';
    }
  };

  const getStatusColor = () => {
    switch (paymentStatus) {
      case 'success':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'pending':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
      >
        {isTestPayment && (
          <div className="mb-6 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 text-sm font-medium">
              🧪 This is a test payment transaction
            </p>
          </div>
        )}
        
        <div className="flex justify-center mb-6">
          {getStatusIcon()}
        </div>
        
        <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
          {getStatusTitle()}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {getStatusMessage()}
        </p>
        
        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Order ID</p>
            <p className="font-mono text-sm text-gray-800">{orderId}</p>
          </div>
        )}
        
        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Details</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{paymentDetails.payment_amount || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Method:</span>
                <span className="font-medium">
                  {getPaymentMethodDisplay(paymentDetails.payment_method)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-xs">
                  {paymentDetails.cf_payment_id || paymentDetails.payment_id || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          {paymentStatus === 'pending' && (
            <button
              onClick={fetchPaymentStatus}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Check Status Again
            </button>
          )}
          
          <Link
            to={isTestPayment ? "/payment/test" : "/"}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {isTestPayment ? "Back to Test Page" : "Back to Home"}
          </Link>
        </div>
        
        {paymentStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-700">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>
        )}
        
        {(paymentStatus === 'failed' || paymentStatus === 'error') && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-700">
              Need help? Contact our support team at support@astrology.com
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;