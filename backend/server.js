// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/webhook/coinbase', express.raw({ type: 'application/json' }));

// Coinbase API configuration
const coinbaseAPI = axios.create({
  baseURL: process.env.COINBASE_BASE_URL || 'https://api.commerce.coinbase.com',
  headers: {
    'Content-Type': 'application/json',
    'X-CC-Api-Key': process.env.COINBASE_API_KEY,
    'X-CC-Version': process.env.COINBASE_API_VERSION || '2018-03-22'
  }
});

// In-memory storage for donations (replace with database in production)
const donations = new Map();

// Create charge endpoint
app.post('/create-charge', async (req, res) => {
  try {
    const { amount, currency, productName, customerEmail, customerId } = req.body;

    // Validate required fields
    if (!amount || !currency || !productName) {
      return res.status(400).json({
        error: 'Missing required fields: amount, currency, productName'
      });
    }

    // Generate unique order ID
    const orderId = `donation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const chargeData = {
      name: productName,
      description: `Donation for: ${productName}`,
      pricing_type: 'fixed_price',
      local_price: {
        amount: amount.toString(),
        currency: currency.toUpperCase()
      },
      metadata: {
        order_id: orderId,
        customer_email: customerEmail || '',
        customer_id: customerId || '',
        donation_purpose: productName
      },
      redirect_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/donation-success`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/donation-cancelled`
    };

    console.log('Creating charge with data:', chargeData);

    const response = await coinbaseAPI.post('/charges', chargeData);
    const charge = response.data;

    // Store donation info temporarily
    donations.set(charge.data.id, {
      orderId,
      amount,
      currency,
      purpose: productName,
      status: 'pending',
      createdAt: new Date(),
      chargeId: charge.data.id
    });

    console.log('Charge created successfully:', charge.data.id);

    // Return the hosted URL for redirect
    res.json({
      success: true,
      charge_id: charge.data.id,
      hosted_url: charge.data.hosted_url,
      order_id: orderId
    });

  } catch (error) {
    console.error('Error creating charge:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to create payment charge',
      details: error.response?.data?.error || error.message
    });
  }
});

// Get charge status
app.get('/charge-status/:chargeId', async (req, res) => {
  try {
    const { chargeId } = req.params;
    
    const response = await coinbaseAPI.get(`/charges/${chargeId}`);
    const charge = response.data;

    // Update local storage
    if (donations.has(chargeId)) {
      const donation = donations.get(chargeId);
      donation.status = charge.data.timeline[charge.data.timeline.length - 1].status;
      donations.set(chargeId, donation);
    }

    res.json({
      success: true,
      charge: charge.data,
      timeline: charge.data.timeline
    });

  } catch (error) {
    console.error('Error fetching charge status:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to fetch charge status',
      details: error.response?.data?.error || error.message
    });
  }
});

// Webhook handler for Coinbase Commerce
app.post('/webhook/coinbase', (req, res) => {
  try {
    const signature = req.headers['x-cc-webhook-signature'];
    const body = req.body;

    // Verify webhook signature if webhook secret is provided
    if (process.env.COINBASE_WEBHOOK_SECRET) {
      const computedSignature = crypto
        .createHmac('sha256', process.env.COINBASE_WEBHOOK_SECRET)
        .update(body)
        .digest('hex');

      if (signature !== computedSignature) {
        console.error('Invalid webhook signature');
        return res.status(401).send('Invalid signature');
      }
    }

    const event = JSON.parse(body);
    console.log('Webhook received:', event.type, event.data.id);

    // Handle different event types
    switch (event.type) {
      case 'charge:created':
        handleChargeCreated(event.data);
        break;
      case 'charge:confirmed':
        handleChargeConfirmed(event.data);
        break;
      case 'charge:failed':
        handleChargeFailed(event.data);
        break;
      case 'charge:delayed':
        handleChargeDelayed(event.data);
        break;
      case 'charge:pending':
        handleChargePending(event.data);
        break;
      case 'charge:resolved':
        handleChargeResolved(event.data);
        break;
      default:
        console.log('Unhandled event type:', event.type);
    }

    res.status(200).send('OK');

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Webhook processing failed');
  }
});

// Webhook event handlers
function handleChargeCreated(chargeData) {
  console.log('Charge created:', chargeData.id);
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'created';
    donations.set(chargeData.id, donation);
  }
}

function handleChargeConfirmed(chargeData) {
  console.log('Payment confirmed:', chargeData.id);
  
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'confirmed';
    donation.confirmedAt = new Date();
    donation.cryptoAmount = chargeData.payments[0]?.value?.crypto?.amount;
    donation.cryptoCurrency = chargeData.payments[0]?.value?.crypto?.currency;
    donations.set(chargeData.id, donation);
    
    // Here you would typically:
    // 1. Update your database
    // 2. Send confirmation email
    // 3. Trigger any post-payment actions
    console.log('Donation confirmed:', donation);
  }
}

function handleChargeFailed(chargeData) {
  console.log('Payment failed:', chargeData.id);
  
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'failed';
    donation.failedAt = new Date();
    donations.set(chargeData.id, donation);
  }
}

function handleChargeDelayed(chargeData) {
  console.log('Payment delayed:', chargeData.id);
  
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'delayed';
    donations.set(chargeData.id, donation);
  }
}

function handleChargePending(chargeData) {
  console.log('Payment pending:', chargeData.id);
  
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'pending';
    donations.set(chargeData.id, donation);
  }
}

function handleChargeResolved(chargeData) {
  console.log('Payment resolved:', chargeData.id);
  
  if (donations.has(chargeData.id)) {
    const donation = donations.get(chargeData.id);
    donation.status = 'resolved';
    donation.resolvedAt = new Date();
    donations.set(chargeData.id, donation);
  }
}

// Get all donations (for admin purposes)
app.get('/donations', (req, res) => {
  const donationList = Array.from(donations.values());
  res.json({
    success: true,
    donations: donationList,
    total: donationList.length
  });
});

// Get specific donation by order ID
app.get('/donation/:orderId', (req, res) => {
  const { orderId } = req.params;
  const donation = Array.from(donations.values()).find(d => d.orderId === orderId);
  
  if (!donation) {
    return res.status(404).json({
      error: 'Donation not found'
    });
  }

  res.json({
    success: true,
    donation
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /create-charge');
  console.log('- GET /charge-status/:chargeId');
  console.log('- POST /webhook/coinbase');
  console.log('- GET /donations');
  console.log('- GET /donation/:orderId');
  console.log('- GET /health');
});

module.exports = app;