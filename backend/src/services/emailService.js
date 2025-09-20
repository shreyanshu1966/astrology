const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      service: 'gmail', // You can change this to your email provider
      auth: {
        user: process.env.EMAIL_USER || 'jaydeep.shirote@gmail.com', // Jaydeep's email
        pass: process.env.EMAIL_PASSWORD // App password for Gmail
      }
    });
  }

  /**
   * Send order confirmation email to customer
   */
  async sendOrderConfirmation(orderDetails) {
    try {
      const {
        customerName,
        customerEmail,
        orderId,
        orderAmount,
        serviceType,
        dateOfBirth,
        whatsappNumber,
        reasonForReport
      } = orderDetails;

      const mailOptions = {
        from: {
          name: 'Jaydeep Shirote - Astrology Services',
          address: process.env.EMAIL_USER || 'jaydeep.shirote@gmail.com'
        },
        to: customerEmail,
        subject: `Order Confirmation - ${serviceType} (Order #${orderId})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0;">Jaydeep Shirote</h1>
              <p style="color: #7f8c8d; margin: 5px 0;">Astrology & Numerology Services</p>
            </div>
            
            <h2 style="color: #27ae60; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">Order Confirmation</h2>
            
            <p>Dear <strong>${customerName}</strong>,</p>
            
            <p>Thank you for your order! We have successfully received your payment and your request is being processed.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2c3e50; margin-top: 0;">Order Details:</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Order ID:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Service:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${serviceType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Amount Paid:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">₹${orderAmount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date of Birth:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${dateOfBirth}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>WhatsApp:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${whatsappNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Consultation Purpose:</strong></td>
                  <td style="padding: 8px 0;">${reasonForReport}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #27ae60; margin-top: 0;">What happens next?</h4>
              <ul style="margin: 10px 0; padding-left: 20px;">
                <li>Your report will be prepared within 2-3 business days</li>
                <li>We will contact you on your WhatsApp number for any clarifications</li>
                <li>The completed report will be sent to this email address</li>
                <li>You can reach out to us anytime for questions</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #7f8c8d; margin: 5px 0;">Contact us:</p>
              <p style="margin: 5px 0;">📧 jaydeep.shirote@gmail.com</p>
              <p style="margin: 5px 0;">📱 WhatsApp: +91 [Your WhatsApp Number]</p>
              <p style="color: #7f8c8d; font-size: 12px; margin-top: 20px;">
                This is an automated confirmation email. Please do not reply to this email.
              </p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation email sent:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending order confirmation email:', error);
      throw new Error('Failed to send order confirmation email: ' + error.message);
    }
  }

  /**
   * Send contact form message to Jaydeep
   */
  async sendContactMessage(contactDetails) {
    try {
      const {
        name,
        email,
        phone,
        subject,
        message
      } = contactDetails;

      const mailOptions = {
        from: {
          name: 'Website Contact Form',
          address: process.env.EMAIL_USER || 'jaydeep.shirote@gmail.com'
        },
        to: process.env.EMAIL_USER || 'jaydeep.shirote@gmail.com',
        replyTo: email,
        subject: `New Contact Form Message: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Message</h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; vertical-align: top;"><strong>Message:</strong></td>
                  <td style="padding: 8px 0;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #e8f4f8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #2c3e50;">
                <strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 20px;">
              <a href="mailto:${email}" style="background-color: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reply to ${name}
              </a>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact form email sent:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending contact form email:', error);
      throw new Error('Failed to send contact form email: ' + error.message);
    }
  }

  /**
   * Send auto-reply to contact form submitter
   */
  async sendContactAutoReply(contactDetails) {
    try {
      const { name, email } = contactDetails;

      const mailOptions = {
        from: {
          name: 'Jaydeep Shirote - Astrology Services',
          address: process.env.EMAIL_USER || 'jaydeep.shirote@gmail.com'
        },
        to: email,
        subject: 'Thank you for contacting us - We will get back to you soon',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2c3e50; margin: 0;">Jaydeep Shirote</h1>
              <p style="color: #7f8c8d; margin: 5px 0;">Astrology & Numerology Services</p>
            </div>
            
            <h2 style="color: #27ae60; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">Thank You for Reaching Out!</h2>
            
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for contacting us! We have received your message and appreciate you taking the time to reach out.</p>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #27ae60;">
                <strong>✓ Your message has been received</strong><br>
                We typically respond within 24 hours during business days.
              </p>
            </div>
            
            <p>In the meantime, feel free to explore our services or connect with us on social media for daily insights and updates.</p>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
              <p style="color: #7f8c8d; margin: 5px 0;">Best regards,</p>
              <p style="margin: 5px 0;"><strong>Jaydeep Shirote</strong></p>
              <p style="margin: 5px 0;">📧 jaydeep.shirote@gmail.com</p>
              <p style="color: #7f8c8d; font-size: 12px; margin-top: 20px;">
                This is an automated response. We will reply to your message personally soon.
              </p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log('Contact auto-reply email sent:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('Error sending contact auto-reply email:', error);
      // Don't throw error for auto-reply failure
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new EmailService();