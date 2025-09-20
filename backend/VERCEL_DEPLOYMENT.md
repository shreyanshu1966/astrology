# Vercel Deployment Guide

This guide will help you deploy the Astrology Backend API to Vercel.

## Prerequisites

1. [Vercel Account](https://vercel.com/signup)
2. [Vercel CLI](https://vercel.com/docs/cli) (optional but recommended)
3. Git repository

## Deployment Steps

### Method 1: Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import Project in Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository
   - Select the `backend` folder as the root directory

3. **Configure Environment Variables**
   In Vercel dashboard, go to Project Settings > Environment Variables and add:
   ```
   CASHFREE_APP_ID=TEST10807438a146267d08eafdfbd31c83470801
   CASHFREE_SECRET_KEY=cfsk_ma_test_fd020c0939ccd120b170a925af96adb6_464d165b
   CASHFREE_ENVIRONMENT=TEST
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   BACKEND_URL=https://your-backend-domain.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from backend directory**
   ```bash
   cd backend
   vercel
   ```

4. **Configure environment variables**
   ```bash
   vercel env add CASHFREE_APP_ID
   vercel env add CASHFREE_SECRET_KEY
   vercel env add CASHFREE_ENVIRONMENT
   vercel env add FRONTEND_URL
   vercel env add BACKEND_URL
   ```

## Important Configuration Notes

### 1. Environment Variables
Make sure to set these in Vercel:
- `CASHFREE_APP_ID`: Your Cashfree Application ID
- `CASHFREE_SECRET_KEY`: Your Cashfree Secret Key  
- `CASHFREE_ENVIRONMENT`: `TEST` or `PROD`
- `FRONTEND_URL`: Your frontend domain (for CORS)
- `BACKEND_URL`: Your backend domain (for webhooks)

### 2. Domain Configuration
After deployment:
1. Note your Vercel backend URL (e.g., `https://your-backend.vercel.app`)
2. Update your frontend's `.env` file:
   ```
   VITE_BACKEND_URL=https://your-backend.vercel.app
   ```
3. Update CORS settings by adding your frontend domain to allowed origins

### 3. Cashfree Webhook Configuration
1. Go to Cashfree Dashboard
2. Update webhook URL to: `https://your-backend.vercel.app/api/payment/webhook`

## File Structure for Vercel

```
backend/
├── api/
│   └── index.js          # Vercel entry point
├── src/
│   ├── server.js         # Express app
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── config/
├── vercel.json           # Vercel configuration
└── package.json
```

## Testing Deployment

After deployment, test these endpoints:

1. **Health Check**
   ```
   GET https://your-backend.vercel.app/health
   ```

2. **Payment Health Check**
   ```
   GET https://your-backend.vercel.app/api/payment/health
   ```

3. **Create Order** (from your frontend)
   ```
   POST https://your-backend.vercel.app/api/payment/create-order
   ```

## Troubleshooting

### Common Issues:

1. **Function Timeout**
   - Vercel has a 30-second timeout for serverless functions
   - This is configured in `vercel.json`

2. **Environment Variables Not Working**
   - Ensure variables are set in Vercel dashboard
   - Redeploy after adding environment variables

3. **CORS Issues**
   - Update allowed origins in `src/server.js`
   - Make sure frontend domain is correctly added

4. **Module Not Found Errors**
   - Ensure all dependencies are in `package.json`
   - Check file paths are correct for serverless environment

### Logs and Debugging:
- View logs in Vercel dashboard under "Functions" tab
- Use `console.log` for debugging (visible in Vercel logs)

## Production Considerations

1. **Change Cashfree Environment to PROD**
2. **Use Production Cashfree Credentials**
3. **Set up Custom Domain** (optional)
4. **Monitor Function Usage** (Vercel has usage limits)

## Limitations

- Vercel functions are stateless
- 30-second execution time limit
- No persistent file storage
- Cold start latency

For high-traffic applications, consider using dedicated hosting or Vercel Pro plan.