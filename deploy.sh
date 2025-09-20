#!/bin/bash

# Production Deployment Script for Astrology Website

echo "🚀 Starting production deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (will prompt for authentication if not logged in)
echo "🔐 Verifying Vercel authentication..."
vercel whoami

# Deploy to production
echo "📦 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Post-deployment checklist:"
echo "- [ ] Test API endpoints: https://your-domain.vercel.app/api/payments/create-order"
echo "- [ ] Verify payment flow works end-to-end"
echo "- [ ] Check Cashfree webhook URL configuration"
echo "- [ ] Verify environment variables in Vercel dashboard"
echo ""
echo "📖 For detailed deployment guide, see: PRODUCTION_DEPLOYMENT.md"