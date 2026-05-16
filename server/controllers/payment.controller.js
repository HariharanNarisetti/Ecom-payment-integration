import Stripe from 'stripe';
import Order from '../models/order.model.js';

// @desc    Create Stripe Payment Intent
// @route   POST /api/payments/stripe/create-intent
// @access  Private
export const createStripePaymentIntent = async (req, res) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const { itemsPrice, taxPrice, shippingPrice } = req.body;
        
        // Calculate total amount in cents
        const totalAmount = Math.round((Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)) * 100);

        if (totalAmount < 50) {
            return res.status(400).json({ success: false, message: 'Amount too low for Stripe payment' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'inr',
            metadata: { integration_check: 'accept_a_payment' }
        });

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get PayPal Client ID
// @route   GET /api/config/paypal
// @access  Public
export const getPayPalClientId = (req, res) => {
    res.json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
};
