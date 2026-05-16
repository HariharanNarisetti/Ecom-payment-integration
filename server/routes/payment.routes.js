import express from 'express';
import { createStripePaymentIntent, getPayPalClientId } from '../controllers/payment.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/stripe/create-intent', protect, createStripePaymentIntent);
router.get('/config/paypal', getPayPalClientId);

export default router;
