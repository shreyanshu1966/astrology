# Vercel Deployment Guide for JaydeepShirote.com

This comprehensive guide will walk you through deploying your astrology website to Vercel, including frontend, API endpoints, and payment integration.

## 📋 Prerequisites

Before starting the deployment process, ensure you have:

- [x] Git repository with your code
- [x] Vercel account (free at [vercel.com](https://vercel.com))
- [x] Domain name (optional, Vercel provides free subdomain)
- [x] Cashfree payment gateway account
- [x] Node.js and npm installed locally

## 🚀 Step 1: Prepare Your Repository

### 1.1 Verify Project Structure
Your project should have this structure:
```
astrology/
├── frontend/           # React frontend
├── api/               # Serverless API functions
├── vercel.json        # Vercel configuration
├── .env               # Environment variables (local only)
├── .gitignore         # Git ignore rules
└── README.md
```

### 1.2 Environment Variables Setup
Your `.env` file contains sensitive data and should NOT be committed to Git. Instead, you'll configure these on Vercel's dashboard.

Current environment variables in your `.env`:
```bash
CASHFREE_APP_ID=TEST10626626be3c3ac101f26090bbb862662601
CASHFREE_SECRET_KEY=cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92
CASHFREE_ENVIRONMENT=sandbox
CASHFREE_WEBHOOK_SECRET=test_webhook_secret_12345
```

### 1.3 Verify Dependencies
Make sure your `frontend/package.json` has all required dependencies:
```bash
cd frontend
npm install
npm run build  # Test build locally
```

## 🌐 Step 2: Deploy to Vercel

### 2.1 Connect Repository to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to your project root
cd d:\astrology

# Deploy
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Select the repository containing your astrology website

### 2.2 Configure Project Settings

When prompted or in the dashboard:

**Framework Preset:** Other
**Root Directory:** `./` (leave empty)
**Build Command:** Will use `vercel.json` configuration
**Output Directory:** Will use `vercel.json` configuration
**Install Command:** Will use `vercel.json` configuration

## ⚙️ Step 3: Configure Environment Variables

### 3.1 Add Environment Variables in Vercel Dashboard

**IMPORTANT**: You have two options for setting up environment variables:

#### Option A: Direct Environment Variables (Recommended for beginners)
1. Go to your project dashboard on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable directly:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `CASHFREE_APP_ID` | `TEST10626626be3c3ac101f26090bbb862662601` | Development, Preview, Production |
| `CASHFREE_SECRET_KEY` | `cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92` | Development, Preview, Production |
| `CASHFREE_ENVIRONMENT` | `sandbox` | Development, Preview |
| `CASHFREE_ENVIRONMENT` | `live` | Production (when ready for live payments) |
| `CASHFREE_WEBHOOK_SECRET` | `test_webhook_secret_12345` | Development, Preview, Production |

#### Option B: Using Vercel Secrets (Advanced)
If you want to use the current `vercel.json` configuration, you need to create secrets first:

**Step 1: Create Vercel Secrets using CLI**
```bash
# Install and login to Vercel CLI
npm i -g vercel
vercel login

# Create secrets (run these commands one by one)
vercel secrets add cashfree_app_id "TEST10626626be3c3ac101f26090bbb862662601"
vercel secrets add cashfree_secret_key "cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92"
vercel secrets add cashfree_environment "sandbox"
vercel secrets add cashfree_webhook_secret "test_webhook_secret_12345"
```

**Step 2: Verify Secrets**
```bash
# List all your secrets
vercel secrets ls
```

### 3.2 Fix for Current Error

If you're getting the error "Environment Variable 'CASHFREE_APP_ID' references Secret 'cashfree_app_id', which does not exist", choose one of these solutions:

#### Solution 1: Create the Missing Secrets (Quick Fix)
```bash
vercel secrets add cashfree_app_id "TEST10626626be3c3ac101f26090bbb862662601"
vercel secrets add cashfree_secret_key "cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92"
vercel secrets add cashfree_environment "sandbox"
vercel secrets add cashfree_webhook_secret "test_webhook_secret_12345"
```

#### Solution 2: Remove Secret References from vercel.json
Update your `vercel.json` to remove the `env` section entirely and use direct environment variables instead:
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "@vercel/node"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/frontend/$1"
    }
  ],
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install"
}
```

### 3.2 Environment Variable Setup Process

**For Development/Testing:**
```bash
CASHFREE_APP_ID = TEST10626626be3c3ac101f26090bbb862662601
CASHFREE_SECRET_KEY = cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92
CASHFREE_ENVIRONMENT = sandbox
CASHFREE_WEBHOOK_SECRET = test_webhook_secret_12345
```

**For Production (when ready):**
```bash
CASHFREE_APP_ID = YOUR_LIVE_APP_ID
CASHFREE_SECRET_KEY = YOUR_LIVE_SECRET_KEY
CASHFREE_ENVIRONMENT = live
CASHFREE_WEBHOOK_SECRET = YOUR_SECURE_WEBHOOK_SECRET
```

## 🔧 Step 4: Verify Deployment Configuration

### 4.1 Check vercel.json Configuration
Your `vercel.json` is configured with the legacy builds format for better compatibility:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/frontend/$1"
    }
  ]
}
```

**Note**: This configuration uses Vercel's legacy builds format which has better compatibility with complex project structures.

### 4.2 Test API Endpoints
After deployment, your API endpoints will be available at:
- `https://your-app.vercel.app/api/payments/create-order`
- `https://your-app.vercel.app/api/payments/verify-payment`
- `https://your-app.vercel.app/api/payments/webhook`

## 🌍 Step 5: Domain Configuration (Optional)

### 5.1 Custom Domain Setup
1. In Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain (e.g., `jaydeepshirote.com`)
3. Configure DNS records as instructed by Vercel
4. Vercel will automatically provision SSL certificate

### 5.2 DNS Configuration Example
For domain `jaydeepshirote.com`:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

## 💳 Step 6: Configure Cashfree Webhook

### 6.1 Set Webhook URL in Cashfree Dashboard
1. Login to Cashfree merchant dashboard
2. Go to **Developers** → **Webhooks**
3. Set webhook URL to: `https://your-app.vercel.app/api/payments/webhook`
4. Enable the webhook for payment events

### 6.2 Webhook Events to Enable
- Payment Success
- Payment Failed
- Payment User Dropped
- Refund Status

## 🧪 Step 7: Testing Deployment

### 7.1 Frontend Testing
1. Visit `https://your-app.vercel.app`
2. Navigate through all pages
3. Test responsive design on mobile
4. Verify all animations and interactions work

### 7.2 Payment Integration Testing
1. Go to Services page
2. Click "Pay Now" on any service
3. Fill the payment form with test data:
   ```
   Name: Test Customer
   Email: test@example.com
   Phone: 9876543210
   ```
4. Use test card: `4111 1111 1111 1111`
5. CVV: `123`, Expiry: Any future date
6. Complete payment and verify success page

### 7.3 API Endpoint Testing
Test your API endpoints using curl or Postman:

```bash
# Test create order
curl -X POST https://your-app.vercel.app/api/payments/create-order \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 499,
    "customerDetails": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "9876543210"
    }
  }'
```

## 📊 Step 8: Monitor Deployment

### 8.1 Vercel Analytics
1. Enable Vercel Analytics in project settings
2. Monitor page performance and user behavior
3. Track Core Web Vitals

### 8.2 Function Logs
1. Go to **Functions** tab in Vercel dashboard
2. Monitor API function executions
3. Check for any errors in payment processing

### 8.3 Error Monitoring
Set up error tracking:
1. Enable Vercel's built-in error tracking
2. Monitor function invocations and failures
3. Set up alerts for critical errors

## 🔄 Step 9: Continuous Deployment

### 9.1 Automatic Deployments
Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you push to any other branch
- **Development**: Local development with `vercel dev`

### 9.2 Deployment Commands
```bash
# Deploy to production
git push origin main

# Deploy preview
git push origin feature-branch

# Local development
vercel dev
```

## 🛡️ Step 10: Security Checklist

### 10.1 Environment Variables
- [x] No sensitive data in repository
- [x] Environment variables configured in Vercel
- [x] Different keys for sandbox/live environments

### 10.2 API Security
- [x] CORS headers configured
- [x] Webhook signature verification enabled
- [x] Input validation on all endpoints
- [x] HTTPS enforced

### 10.3 Frontend Security
- [x] No API keys exposed in frontend code
- [x] Secure payment form handling
- [x] CSP headers (if needed)

## 🚀 Step 11: Go Live Checklist

When ready for production:

### 11.1 Cashfree Live Account
1. Complete KYC verification with Cashfree
2. Get live API credentials
3. Update environment variables in Vercel:
   ```
   CASHFREE_ENVIRONMENT = live
   CASHFREE_APP_ID = YOUR_LIVE_APP_ID
   CASHFREE_SECRET_KEY = YOUR_LIVE_SECRET_KEY
   ```

### 11.2 Final Testing
- [ ] Test with small amount (₹1)
- [ ] Verify webhook receives live events
- [ ] Test refund process
- [ ] Verify email notifications work
- [ ] Check all payment methods (Card, UPI, Net Banking)

### 11.3 Launch
- [ ] Update DNS to point to custom domain
- [ ] Enable SSL certificate
- [ ] Set up monitoring and alerts
- [ ] Announce launch!

## 🔧 Troubleshooting

### Common Issues and Solutions

**1. Function Runtime Version Error**
```
Error: Function Runtimes must have a valid version, for example `now-php@1.0.0`.
```

**Solution**: Update your `vercel.json` to specify the Node.js runtime version:
```json
{
  "functions": {
    "api/**/*.js": {
      "runtime": "@vercel/node@20.x"
    }
  }
}
```

**2. Environment Variable References Secret Error**
```
Error: Environment Variable "CASHFREE_APP_ID" references Secret "cashfree_app_id", which does not exist.
```

**Solution A: Create the missing secrets**
```bash
vercel secrets add cashfree_app_id "TEST10626626be3c3ac101f26090bbb862662601"
vercel secrets add cashfree_secret_key "cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92"
vercel secrets add cashfree_environment "sandbox"
vercel secrets add cashfree_webhook_secret "test_webhook_secret_12345"
```

**Solution B: Update vercel.json to remove secret references**
Edit your `vercel.json` and remove the entire `env` section, then add environment variables directly in Vercel dashboard.

**2. Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common fixes:
cd frontend && npm install
npm run build
```

**3. API Function Errors**
- Check function logs in Vercel dashboard
- Verify environment variables are set
- Test API endpoints with Postman

**4. Payment Issues**
- Verify Cashfree credentials
- Check webhook URL configuration
- Monitor payment logs

**5. Domain Issues**
- Verify DNS configuration
- Wait for propagation (24-48 hours)
- Check SSL certificate status

## 📞 Support Resources

- **Vercel Documentation**: [docs.vercel.com](https://docs.vercel.com)
- **Cashfree Documentation**: [docs.cashfree.com](https://docs.cashfree.com)
- **React/Vite Documentation**: [vitejs.dev](https://vitejs.dev)

## 🎉 Conclusion

Your astrology website is now deployed on Vercel with:
- ✅ Fast, global CDN delivery
- ✅ Serverless API functions
- ✅ Automatic SSL certificates
- ✅ Payment gateway integration
- ✅ Continuous deployment from Git

The website should now be accessible at your Vercel URL and ready for users to explore numerology services and make payments!

---

**Need Help?** If you encounter any issues during deployment, check the Vercel dashboard logs or contact support with specific error messages.