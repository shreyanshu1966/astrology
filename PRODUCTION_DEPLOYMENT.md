# Production Deployment Guide

## Environment Variables Setup

Before deploying, make sure to set up the following environment variables in Vercel:

### Required Environment Variables:
```
CASHFREE_APP_ID=your_production_app_id
CASHFREE_SECRET_KEY=your_production_secret_key
CASHFREE_ENVIRONMENT=live  # or 'sandbox' for testing
CASHFREE_WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
```

### Setting Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each variable with the production values

## Deployment Steps:

1. **Update Vercel Project Domain** (if needed):
   ```bash
   # Update the production URL in the API files if your domain changes
   # Current default: https://astrology-website.vercel.app
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy to production
   vercel --prod
   ```

3. **Verify Deployment**:
   - Check that all API endpoints are accessible:
     - `https://your-domain.vercel.app/api/payments/create-order`
     - `https://your-domain.vercel.app/api/payments/verify-payment`
     - `https://your-domain.vercel.app/api/payments/webhook`

## Post-Deployment Checklist:

- [ ] Test payment flow end-to-end
- [ ] Verify webhook URL in Cashfree dashboard
- [ ] Test payment success/failure scenarios
- [ ] Check environment variables are properly set
- [ ] Verify CORS is working correctly

## Troubleshooting:

### 404 Errors on API Endpoints:
- Check that the API files are in the correct `/api/payments/` directory
- Verify Vercel configuration in `vercel.json`
- Check function deployment logs in Vercel dashboard

### CORS Errors:
- Verify the production domain is correctly set in CORS headers
- Check that environment variables are properly configured

### Payment Integration Issues:
- Verify Cashfree credentials are correct for production
- Check webhook URL configuration in Cashfree dashboard
- Review function logs in Vercel for detailed error messages

## Local Development vs Production:

### Local Development:
- Uses local API server on port 3002
- Frontend proxies API requests during development
- Uses `.env` file for environment variables

### Production:
- Uses Vercel serverless functions
- Direct API calls to production endpoints
- Uses Vercel environment variables