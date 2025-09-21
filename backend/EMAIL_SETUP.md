# Gmail App Password Setup Guide

## 🚀 Quick Setup for Gmail Email Service

### Step 1: Enable 2-Step Verification
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the steps to enable it (if not already enabled)

### Step 2: Generate App Password
1. Still in **Security** settings
2. Under "Signing in to Google", click **App passwords**
3. You might need to sign in again
4. Select **Mail** as the app
5. Select **Other (Custom name)** as the device
6. Enter "Astrology Backend" as the custom name
7. Click **Generate**

### Step 3: Copy the App Password
- Google will show you a 16-character password like: `abcd efgh ijkl mnop`
- **Copy this password** (you won't see it again)

### Step 4: Update Your .env File
1. Copy `.env.example` to `.env` in the backend folder
2. Update these lines:
```bash
EMAIL_USER=jaydeep.shirote@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

**Important Notes:**
- ✅ Use the 16-character App Password, NOT your regular Gmail password
- ✅ Keep the spaces in the password or remove them (both work)
- ✅ Never share this password publicly
- ✅ You can revoke this password anytime from Google Account settings

### Step 5: Test the Configuration
Run the backend server and check the console for:
```
✅ Email service is ready
```

If you see an error, double-check:
- 2-Step Verification is enabled
- App Password is correct
- Email address is correct

## 🔧 Alternative Email Providers

### For Outlook/Hotmail:
```bash
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-outlook-password
```

### For Custom SMTP:
```bash
EMAIL_SERVICE=custom
EMAIL_HOST=your.smtp.server.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@domain.com
EMAIL_PASSWORD=your-password
```

## 🚨 Troubleshooting

### "Invalid login" error:
- Ensure 2-Step Verification is enabled
- Generate a new App Password
- Check that EMAIL_USER is correct

### "Connection timeout" error:
- Check your internet connection
- Verify firewall settings
- Try a different email service

### "Authentication failed" error:
- Double-check the App Password
- Make sure you're using EMAIL_USER correctly
- Try generating a new App Password

## 📧 What Emails Will Be Sent?

1. **Order Confirmation** - Sent to customers after successful payment
2. **Contact Form Messages** - Sent to Jaydeep when someone uses contact form
3. **Auto-Reply** - Sent to users who submit contact form

All emails are professionally formatted with HTML templates and include proper branding for your astrology services.