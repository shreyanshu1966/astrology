import React from 'react'

const Terms = () => {
  return (
    <div className="min-h-screen pt-20 cosmic-bg">
      <div className="section-container">
        <div className="text-center mb-16">
          <h1 className="heading-hero text-cosmic-contrast mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read our terms and conditions carefully before 
            using our services.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the services provided by Jaydeep Shirote Astrology Services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">2. Service Description</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We provide personalized astrology and numerology reports for self-awareness and personal growth. Our services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Self-Awareness Reports based on numerology and astrology</li>
                <li>Personal growth guidance and insights</li>
                <li>Digital reports delivered via email</li>
                <li>WhatsApp support for clarifications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">3. Payment and Pricing</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our current service is priced at ₹499 (Introductory Offer). Payment must be made in advance through our secure payment gateway powered by Cashfree.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>All payments are processed securely through Cashfree Payment Gateway</li>
                <li>Prices are in Indian Rupees (INR) and include applicable taxes</li>
                <li>Payment confirmation will be sent via email</li>
                <li>Services begin only after successful payment verification</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">4. Report Delivery</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your personalized report will be delivered within 2-3 business days after payment confirmation:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reports are delivered digitally via email</li>
                <li>We may contact you via WhatsApp for clarifications</li>
                <li>Delivery time excludes weekends and public holidays</li>
                <li>You will receive an email confirmation upon report delivery</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">5. Accuracy and Limitations</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our reports are designed for self-awareness and personal growth purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reports are not predictions but tools for self-revelation</li>
                <li>Accuracy depends on the correctness of information provided by you</li>
                <li>Results are based on astrological and numerological principles</li>
                <li>Reports should be used as guidance, not absolute truth</li>
                <li>We do not guarantee specific life outcomes based on our reports</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">6. Privacy and Data Protection</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We respect your privacy and protect your personal information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Personal information is used solely for report generation</li>
                <li>We do not share your data with third parties</li>
                <li>Payment information is processed securely through Cashfree</li>
                <li>You may request deletion of your data at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content, reports, methodologies, and materials provided are the intellectual property of Jaydeep Shirote. You may not reproduce, distribute, or commercially use any content without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                Our liability is limited to the amount paid for the service. We are not responsible for any indirect, incidental, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">9. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Continued use of our services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-cosmic-contrast mb-4">10. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                For questions about these terms and conditions, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2">📧 Email: jaydeepshirote9@gmail.com</p>
                <p className="text-gray-700">📱 WhatsApp: +91 99212 30963</p>
              </div>
            </section>

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

export default Terms
