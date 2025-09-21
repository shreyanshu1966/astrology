import React from 'react'

const Refunds = () => {
  return (
    <div className="min-h-screen pt-20 cosmic-bg">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="heading-hero text-cosmic-contrast mb-6">
            Refunds & Cancellations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our refund and cancellation policy for astrology services
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">1. Refund Policy Overview</h2>
              <p className="text-gray-700 leading-relaxed">
                We strive to provide high-quality astrology and numerology services. Due to the personalized and digital nature of our reports, we have specific policies regarding refunds and cancellations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">2. Cancellation Policy</h2>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4">
                <p className="text-amber-800 font-semibold">
                  ⚠️ Cancellation Window: You can cancel your order within 2 hours of payment
                </p>
              </div>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Cancellations must be requested within 2 hours of successful payment</li>
                <li>Once we begin preparing your report (after 2 hours), cancellation is not possible</li>
                <li>To cancel, contact us immediately via WhatsApp or email</li>
                <li>Cancellation requests after report preparation has begun will not be honored</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">3. Refund Eligibility</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Refunds may be considered under the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Eligible for Full Refund:</h4>
                  <ul className="list-disc pl-4 text-green-700 space-y-1">
                    <li>Cancellation within 2 hours of payment</li>
                    <li>Technical error preventing report generation</li>
                    <li>Duplicate payment made in error</li>
                    <li>Service not delivered within 5 business days without prior notice</li>
                  </ul>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Not Eligible for Refund:</h4>
                  <ul className="list-disc pl-4 text-red-700 space-y-1">
                    <li>Change of mind after report preparation has begun</li>
                    <li>Dissatisfaction with report content (subjective interpretations)</li>
                    <li>Incorrect birth details provided by customer</li>
                    <li>Failure to check email/spam folder for delivered report</li>
                    <li>Reports delivered as per promised timeline</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">4. Refund Process</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If your refund request is approved, here's what you can expect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Processing Time:</strong> 5-7 business days from approval</li>
                <li><strong>Refund Method:</strong> Original payment method via Cashfree</li>
                <li><strong>Notification:</strong> Email confirmation when refund is processed</li>
                <li><strong>Bank Processing:</strong> Additional 2-3 days for bank credit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">5. How to Request Refund/Cancellation</h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                <p className="text-blue-800 font-semibold">
                  📞 Contact us immediately for fastest response
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                To request a refund or cancellation, please contact us with the following information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Order ID (received in payment confirmation email)</li>
                <li>Reason for refund/cancellation request</li>
                <li>Payment transaction details</li>
                <li>Email address used for the order</li>
              </ul>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Contact Information:</h4>
                <p className="text-gray-700 mb-2">📧 Email: jaydeepshirote9@gmail.com</p>
                <p className="text-gray-700 mb-2">📱 WhatsApp: +91 99212 30963</p>
                <p className="text-gray-600 text-sm">Response time: Within 24 hours during business days</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">6. Partial Refunds</h2>
              <p className="text-gray-700 leading-relaxed">
                In exceptional circumstances, we may offer partial refunds or service credits. This is evaluated on a case-by-case basis and is at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">7. Service Credits</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Instead of monetary refunds, we may offer service credits in certain situations:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Minor delays in service delivery</li>
                <li>Technical issues that cause inconvenience but don't prevent service delivery</li>
                <li>As goodwill gesture for loyal customers</li>
                <li>Credits are valid for 6 months from issue date</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">8. Dispute Resolution</h2>
              <p className="text-gray-700 leading-relaxed">
                If you're not satisfied with our refund decision, you may escalate the matter through email. We commit to reviewing all disputes fairly and providing a final decision within 7 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">9. Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed">
                This refund policy may be updated from time to time. Changes will be posted on our website and will apply to orders placed after the update date.
              </p>
            </section>

            <div className="bg-golden-wisdom/10 border border-golden-wisdom/20 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-cosmic-contrast mb-3">💡 Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed">
                We believe in providing value through our services. If you have any concerns about your order or experience, please reach out to us. We're committed to finding a fair solution that ensures your satisfaction while maintaining the integrity of our service.
              </p>
            </div>

            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Last updated: September 21, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Refunds