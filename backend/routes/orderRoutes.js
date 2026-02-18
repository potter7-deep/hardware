import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrderStatus, verifyMpesaPayment, mpesaCallback } from '../controllers/orderController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// M-Pesa callback (no auth required - called by Safaricom)
router.post('/mpesa/callback', mpesaCallback);

// Verify M-Pesa payment
router.post('/mpesa/verify', authenticate, verifyMpesaPayment);

// User routes
router.post('/', authenticate, createOrder);
router.get('/', authenticate, getOrders);
router.get('/:id', authenticate, getOrderById);

// Admin routes
router.put('/:id/status', authenticate, authorizeAdmin, updateOrderStatus);

export default router;

