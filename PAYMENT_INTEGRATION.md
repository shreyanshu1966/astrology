# Cashfree Payment Integration

This document explains how to use the Cashfree payment gateway integration in your astrology website.

## Setup

### 1. Environment Variables

The following environment variables are required in your `.env` file:

```bash
CASHFREE_APP_ID=TEST10626626be3c3ac101f26090bbb862662601
CASHFREE_SECRET_KEY=cfsk_ma_test_6c668894ee7ea400bfabd66ab844993e_22063a92
CASHFREE_ENVIRONMENT=sandbox
CASHFREE_WEBHOOK_SECRET=your_webhook_secret_here
```

**Security Note**: These keys are already configured in `.env` and are automatically ignored by git.

### 2. Vercel Deployment

For live deployment, add these environment variables to your Vercel project:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:
   - `CASHFREE_APP_ID` → Your live App ID
   - `CASHFREE_SECRET_KEY` → Your live Secret Key  
   - `CASHFREE_ENVIRONMENT` → `live` for live payments
   - `CASHFREE_WEBHOOK_SECRET` → Generate a secure random string

## API Endpoints

### 1. Create Payment Order
- **URL**: `/api/payments/create-order`
- **Method**: POST
- **Body**:
```json
{
  "amount": 499,
  "currency": "INR",
  "customerDetails": {
    "name": "Customer Name",
    "email": "customer@example.com", 
    "phone": "9876543210"
  },
  "orderNote": "Service description"
}
```

### 2. Verify Payment
- **URL**: `/api/payments/verify-payment`
- **Method**: GET
- **Query**: `?order_id=order_12345`

### 3. Webhook Handler
- **URL**: `/api/payments/webhook`
- **Method**: POST
- **Purpose**: Receives payment notifications from Cashfree

## Frontend Components

### PaymentForm Component

```jsx
import PaymentForm from '../components/PaymentForm';

<PaymentForm
  service="Service Name"
  amount={499}
  onSuccess={(paymentData) => {
    console.log('Payment successful:', paymentData);
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
  }}
/>
```

### Usage Example (Already implemented in Services page)

```jsx
const [showPaymentForm, setShowPaymentForm] = useState(false);

// Show payment form
<button onClick={() => setShowPaymentForm(true)}>
  Pay Now
</button>

// Payment modal
{showPaymentForm && (
  <div className="modal">
    <PaymentForm
      service="Complete Self-Awareness Report"
      amount={499}
      onSuccess={handlePaymentSuccess}
      onError={handlePaymentError}
    />
  </div>
)}
```

## Payment Flow

1. **User clicks "Pay Now"** → PaymentForm modal opens
2. **User fills details** → Form validates customer information
3. **Submit form** → Creates payment order via `/api/payments/create-order`
4. **Cashfree SDK** → Opens payment interface
5. **Payment completion** → Redirects to `/payment-success`
6. **Success page** → Verifies payment via `/api/payments/verify-payment`
7. **Webhook** → Receives final confirmation from Cashfree

## Testing

### Test Cards (Sandbox Environment)

**Successful Payment:**
- Card: 4111 1111 1111 1111
- CVV: 123
- Expiry: Any future date

**Failed Payment:**
- Card: 4012 0010 3714 1112
- CVV: 123  
- Expiry: Any future date

### Test UPI
- VPA: success@upi
- VPA: failure@upi

## Security Features

1. **Environment variables** → API keys secured
2. **Webhook signature verification** → Prevents tampering
3. **CORS headers** → Controls access
4. **Server-side validation** → Validates all requests
5. **HTTPS only** → Secure communication

## Error Handling

The integration includes comprehensive error handling:

- **Frontend**: User-friendly error messages
- **Backend**: Detailed logging and error responses  
- **Network failures**: Automatic retries
- **Invalid data**: Validation errors
- **Payment failures**: Clear failure reasons

## Customization

### Styling
The PaymentForm uses Tailwind CSS and can be customized by modifying the classes in `PaymentForm.jsx`.

### Payment Methods
Modify the `payment_methods` parameter in `create-order.js` to control available payment options:
```js
payment_methods: 'cc,dc,nb,upi,paylater,emi'
```

### Theme
Customize the Cashfree checkout theme in `PaymentForm.jsx`:
```js
theme: {
  color: '#6366f1', // Your brand color
  fontFamily: 'Inter'
}
```

## Support

For issues or questions:
1. Check Cashfree documentation: https://docs.cashfree.com/
2. Review server logs in Vercel dashboard
3. Test with provided test credentials
4. Contact support if needed

## Live Deployment Checklist

- [ ] Environment variables updated to live values
- [ ] `CASHFREE_ENVIRONMENT` set to `live`
- [ ] Webhook URL configured in Cashfree dashboard
- [ ] Test with small amount before going live
- [ ] SSL certificate active
- [ ] Error monitoring set up