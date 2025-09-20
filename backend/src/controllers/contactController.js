const emailService = require('../services/emailService');

class ContactController {
  /**
   * Handle contact form submission
   */
  async sendMessage(req, res) {
    try {
      const {
        name,
        email,
        phone,
        subject,
        message
      } = req.body;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: name, email, subject, message'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Validate phone format if provided (optional field)
      if (phone && phone.trim()) {
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
          return res.status(400).json({
            success: false,
            message: 'Invalid phone number. Please provide a valid 10-digit Indian mobile number'
          });
        }
      }

      // Validate message length
      if (message.length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Message should be at least 10 characters long'
        });
      }

      if (message.length > 2000) {
        return res.status(400).json({
          success: false,
          message: 'Message should not exceed 2000 characters'
        });
      }

      const contactDetails = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject.trim(),
        message: message.trim()
      };

      // Send email to Jaydeep
      try {
        await emailService.sendContactMessage(contactDetails);
        console.log('Contact form email sent to Jaydeep successfully');
      } catch (emailError) {
        console.error('Failed to send contact form email:', emailError.message);
        return res.status(500).json({
          success: false,
          message: 'Failed to send your message. Please try again later.'
        });
      }

      // Send auto-reply to customer (optional, don't fail if this fails)
      try {
        await emailService.sendContactAutoReply(contactDetails);
        console.log('Contact auto-reply email sent successfully');
      } catch (autoReplyError) {
        console.error('Failed to send auto-reply email:', autoReplyError.message);
        // Don't fail the request if auto-reply fails
      }

      res.status(200).json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });

    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while sending your message. Please try again later.'
      });
    }
  }

  /**
   * Get contact information
   */
  async getContactInfo(req, res) {
    try {
      const contactInfo = {
        email: 'jaydeep.shirote@gmail.com',
        phone: '+91 [Your Phone Number]', // Replace with actual phone number
        whatsapp: '+91 [Your WhatsApp Number]', // Replace with actual WhatsApp number
        address: 'Your Address Here', // Replace with actual address
        businessHours: {
          monday: '9:00 AM - 6:00 PM',
          tuesday: '9:00 AM - 6:00 PM',
          wednesday: '9:00 AM - 6:00 PM',
          thursday: '9:00 AM - 6:00 PM',
          friday: '9:00 AM - 6:00 PM',
          saturday: '10:00 AM - 4:00 PM',
          sunday: 'Closed'
        },
        socialMedia: {
          facebook: 'https://facebook.com/jaydeepshirote',
          instagram: 'https://instagram.com/jaydeepshirote',
          youtube: 'https://youtube.com/jaydeepshirote'
        }
      };

      res.status(200).json({
        success: true,
        data: contactInfo
      });

    } catch (error) {
      console.error('Get contact info error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch contact information'
      });
    }
  }
}

module.exports = new ContactController();