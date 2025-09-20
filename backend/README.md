# Astrology Backend API

Express.js backend server with Cashfree payment gateway integration for the Astrology website.

## Features

- 🔒 Secure payment processing with Cashfree
- 🚀 RESTful API endpoints
- 📧 Webhook handling for payment notifications
- 🛡️ Security middleware (Helmet, CORS, Rate Limiting)
- ✅ Input validation and sanitization
- 📊 Payment status tracking

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
copy .env.example .env
```

4. Update the `.env` file with your Cashfree credentials:
```env
CASHFREE_APP_ID=your_app_id
CASHFREE_SECRET_KEY=your_secret_key
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/payment/health` | Health check for payment service |
| POST | `/api/payment/create-order` | Create a new payment order |
| POST | `/api/payment/webhook` | Handle Cashfree webhooks |
| GET | `/api/payment/status/:orderId` | Get payment status by order ID |
| GET | `/api/payment/link/:orderId` | Get payment link by order ID |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |

## API Usage Examples

### Create Payment Order
```javascript
POST /api/payment/create-order
Content-Type: application/json

{
  "amount": 499,
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "9876543210",
  "serviceType": "Astrology Consultation"
}
```

### Response
```javascript
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "astro_1234567890_123",
    "paymentSessionId": "session_xxx",
    "orderAmount": 499,
    "orderCurrency": "INR",
    "orderStatus": "ACTIVE"
  }
}
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `BACKEND_URL` | Backend URL for webhooks | Yes |
| `CASHFREE_APP_ID` | Cashfree Application ID | Yes |
| `CASHFREE_SECRET_KEY` | Cashfree Secret Key | Yes |
| `CASHFREE_ENVIRONMENT` | TEST or PROD | Yes |

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configured for frontend domain
- **Helmet**: Security headers
- **Input Validation**: Comprehensive validation for all inputs
- **Webhook Signature Verification**: Ensures webhook authenticity

## Error Handling

The API returns standardized error responses:

```javascript
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `500`: Internal Server Error

## Payment Flow

1. Frontend calls `/api/payment/create-order`
2. Backend creates order with Cashfree
3. Frontend receives payment session ID
4. Customer completes payment on Cashfree
5. Cashfree sends webhook to `/api/payment/webhook`
6. Backend processes webhook and updates status
7. Customer is redirected to success page

## Webhook Security

Webhooks are verified using HMAC SHA256 signature to ensure they come from Cashfree.

## Testing

Use the health check endpoint to verify the server is running:
```bash
curl http://localhost:3001/health
```

Check payment service health:
```bash
curl http://localhost:3001/api/payment/health
```

## Production Deployment

### Vercel Deployment

This backend is configured for deployment on Vercel. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.

Quick deployment:
1. Push to GitHub/GitLab/Bitbucket
2. Import project in Vercel dashboard
3. Set environment variables in Vercel
4. Deploy

### Environment Setup for Production

1. Set `NODE_ENV=production`
2. Update `CASHFREE_ENVIRONMENT=PROD`
3. Configure production Cashfree credentials
4. Set proper `FRONTEND_URL` and `BACKEND_URL`
5. Use a reverse proxy (nginx) for SSL termination
6. Set up monitoring and logging

## Support

For issues or questions, contact the development team.