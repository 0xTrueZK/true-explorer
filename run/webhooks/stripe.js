const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();
const db = require('../lib/firebase');
const stripeLib = require('../lib/stripe');

router.post('/', async (req, res) => {
    try {
        const sig = req.headers['stripe-signature'];
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
        } catch (err) {
            throw err.message;
        }
        switch (event.type) {
            case 'invoice.payment_succeeded':
                await stripeLib.handleStripePaymentSucceeded(event.data.object)
                break;

            case 'customer.subscription.updated':
                await stripeLib.handleStripeSubscriptionUpdate(event.data.object);
                break;

            case 'customer.subscription.deleted':
                await stripeLib.handleStripeSubscriptionDeletion(event.data.object);
                break;
        }

        res.sendStatus(200);
    } catch(error) {
        console.log(req.rawBody)
        console.log(error);
        res.status(401).json({ message: error });
    }
});

module.exports = router;
