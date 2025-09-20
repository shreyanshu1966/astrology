# Production Deployment Script for Astrology Website (PowerShell)

Write-Host "🚀 Starting production deployment..." -ForegroundColor Green

# Check if vercel CLI is installed
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
}

# Login to Vercel (will prompt for authentication if not logged in)
Write-Host "🔐 Verifying Vercel authentication..." -ForegroundColor Yellow
vercel whoami

# Deploy to production
Write-Host "📦 Deploying to production..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Post-deployment checklist:" -ForegroundColor Cyan
Write-Host "- [ ] Test API endpoints: https://your-domain.vercel.app/api/payments/create-order"
Write-Host "- [ ] Verify payment flow works end-to-end"
Write-Host "- [ ] Check Cashfree webhook URL configuration"
Write-Host "- [ ] Verify environment variables in Vercel dashboard"
Write-Host ""
Write-Host "📖 For detailed deployment guide, see: PRODUCTION_DEPLOYMENT.md" -ForegroundColor Blue