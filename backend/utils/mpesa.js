import axios from 'axios';
import db from '../config/database.js';

// M-Pesa Configuration
// In production, use environment variables
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || 'your_consumer_key',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'your_consumer_secret',
  shortCode: process.env.MPESA_SHORT_CODE || '174379',
  passkey: process.env.MPESA_PASSKEY || 'your_passkey',
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://modern-hardware-app.onrender.com/api/mpesa/callback',
  environment: process.env.MPESA_ENVIRONMENT || 'sandbox'
};

const MPESA_BASE_URL = MPESA_CONFIG.environment === 'production' 
  ? 'https://api.safaricom.co.ke' 
  : 'https://sandbox.safaricom.co.ke';

// Generate M-Pesa password
const generateMpesaPassword = () => {
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
  const password = Buffer.from(`${MPESA_CONFIG.shortCode}${MPESA_CONFIG.passkey}${timestamp}`).toString('base64');
  return { password, timestamp };
};

// Get M-Pesa Access Token
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');
    
    const response = await axios.get(
      `${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
      {
        headers: { Authorization: `Basic ${auth}` }
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('M-Pesa access token error:', error.response?.data || error.message);
    throw new Error('Failed to get M-Pesa access token');
  }
};

// STK Push - Real M-Pesa API Call
export const initiateSTKPush = async (phone, amount, orderId) => {
  try {
    // Validate phone number - must be in format 254XXXXXXXXX
    let formattedPhone = phone.replace(/[^0-9]/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    } else if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Validate amount
    const validAmount = Math.ceil(amount);
    if (validAmount < 1) {
      throw new Error('Amount must be at least 1 KES');
    }

    const accessToken = await getAccessToken();
    const { password, timestamp } = generateMpesaPassword();
    
    const requestBody = {
      BusinessShortCode: MPESA_CONFIG.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerBuyGoodsOnline',
      Amount: validAmount,
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.shortCode,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: `MH${orderId}`,
      TransactionDesc: 'Modern Hardware Payment'
    };
    
    console.log('Initiating STK Push:', { phone: formattedPhone, amount: validAmount, orderId });
    
    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('STK Push Response:', response.data);
    
    // Update order payment status
    db.prepare(`
      UPDATE orders 
      SET payment_method = 'mpesa', payment_status = 'pending'
      WHERE id = ?
    `).run(orderId);
    
    return {
      success: true,
      checkoutRequestId: response.data.CheckoutRequestID,
      merchantRequestId: response.data.MerchantRequestID,
      message: 'STK Push initiated. Please complete payment on your phone.'
    };
  } catch (error) {
    console.error('STK Push error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.errorMessage || error.message || 'Failed to initiate payment'
    };
  }
};

// Handle M-Pesa Callback
export const handleMpesaCallback = async (callbackData) => {
  try {
    const { Body } = callbackData;
    
    if (Body.stkCallback.ResultCode === 0) {
      const metadata = Body.stkCallback.CallbackMetadata?.Item || [];
      const receipt = metadata.find(i => i.Name === 'MpesaReceiptNumber')?.Value;
      const amount = metadata.find(i => i.Name === 'Amount')?.Value;
      const phone = metadata.find(i => i.Name === 'PhoneNumber')?.Value;
      
      // Extract order ID from account reference
      const accountRef = metadata.find(i => i.Name === 'AccountReference')?.Value;
      const orderId = accountRef?.replace('MH', '');
      
      if (orderId) {
        db.prepare(`
          UPDATE orders 
          SET payment_status = 'paid', 
              mpesa_receipt = ?,
              payment_method = 'mpesa'
          WHERE id = ?
        `).run(receipt, orderId);
        
        return { success: true, orderId, receipt };
      }
    } else {
      // Payment failed
      const accountRef = Body.stkCallback.CallbackMetadata?.Item?.find(i => i.Name === 'AccountReference')?.Value;
      const orderId = accountRef?.replace('MH', '');
      
      if (orderId) {
        db.prepare(`
          UPDATE orders 
          SET payment_status = 'failed'
          WHERE id = ?
        `).run(orderId);
      }
      
      return { 
        success: false, 
        error: Body.stkCallback.ResultDesc 
      };
    }
  } catch (error) {
    console.error('M-Pesa callback error:', error);
    return { success: false, error: error.message };
  }
};

// Check payment status
export const checkPaymentStatus = async (checkoutRequestId) => {
  try {
    // For demo, always return success
    // In production, query M-Pesa API
    return { success: true, paymentStatus: 'paid' };
  } catch (error) {
    console.error('Check payment status error:', error);
    return { success: false, error: error.message };
  }
};

// Verify payment with M-Pesa API
export const verifyPayment = async (checkoutRequestId) => {
  try {
    const accessToken = await getAccessToken();
    const { password, timestamp } = generateMpesaPassword();
    
    const requestBody = {
      BusinessShortCode: MPESA_CONFIG.shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    };
    
    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkquery/v1/query`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return {
      success: response.data.ResultCode === 0,
      paymentStatus: response.data.ResultCode === 0 ? 'paid' : 'failed',
      resultDesc: response.data.ResultDesc
    };
  } catch (error) {
    console.error('Verify payment error:', error);
    return { success: false, error: error.message };
  }
};

export default {
  initiateSTKPush,
  handleMpesaCallback,
  checkPaymentStatus,
  verifyPayment
};

