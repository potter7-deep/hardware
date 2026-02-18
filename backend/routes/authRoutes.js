import express from 'express';
import { register, login, getMe, updateProfile, getAllUsers } from '../controllers/authController.js';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getMe);
router.put('/profile', authenticate, updateProfile);

// Admin routes
router.get('/users', authenticate, authorizeAdmin, getAllUsers);

export default router;

