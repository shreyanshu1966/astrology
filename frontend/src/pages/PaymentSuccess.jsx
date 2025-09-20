import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (orderId) {
      verifyPayment(orderId);
    } else {
      setError('No order ID found');
      setLoading(false);
    }
  }, [orderId]);

  const verifyPayment = async (orderIdToVerify) => {
    try {
      const response = await fetch(`/api/payments/verify-payment?order_id=${orderIdToVerify}`);
      const result = await response.json();
      
      if (result.success) {
        setPaymentData(result);
      } else {
        setError('Payment verification failed');
      }
    } catch (err) {
      console.error('Payment verification error:', err);
      setError('Failed to verify payment');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      case 'pending':
        return '⏳';
      default:
        return '❓';
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying your payment...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.href = '/services'}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Back to Services
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Status Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">
                {getStatusIcon(paymentData?.payment_status)}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {paymentData?.payment_status === 'SUCCESS' ? 'Payment Successful!' : 'Payment Status'}
              </h1>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(paymentData?.payment_status)}`}>
                Status: {paymentData?.payment_status || 'Unknown'}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-mono text-sm text-gray-800">{paymentData?.order_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment ID</p>
                  <p className="font-mono text-sm text-gray-800">{paymentData?.cf_payment_id || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-lg font-bold text-indigo-600">
                    ₹{paymentData?.payment_amount || paymentData?.order_amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="text-gray-800">{paymentData?.payment_method || 'N/A'}</p>
                </div>
                {paymentData?.payment_time && (
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-600">Payment Time</p>
                    <p className="text-gray-800">
                      {new Date(paymentData.payment_time).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Success Actions */}
            {paymentData?.payment_status === 'SUCCESS' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-2">What's Next?</h3>
                <ul className="text-green-700 space-y-2">
                  <li>✅ Payment confirmed and recorded</li>
                  <li>✅ Confirmation email will be sent shortly</li>
                  <li>✅ Our team will contact you within 24 hours</li>
                  <li>✅ Service delivery will begin as scheduled</li>
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.href = '/services'}
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View More Services
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
              >
                Contact Support
              </button>
            </div>

            {/* Receipt Note */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>📧 A detailed receipt has been sent to your email address</p>
              <p>For any queries, please contact our support team</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;