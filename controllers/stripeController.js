const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const db = require("../models/");

// router.get('/checkout', async (req, res) => {
//   const session = // ... Fetch or create the Checkout Session
//   res.render('checkout', { session_id: session.id });
// });

router.get('/config', async (req, res) => {
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;
  db.cart.findOne({
    where: {
      cartId: req.session.user.cartId
    }, include: [db.item]
  }).then(function (cartitems) {
    console.log(cartitems)
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [],
    //   mode: 'payment',
    //   // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    //   success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${domainURL}/canceled.html`,
    // });

    res.send({
      sessionId: session.id,
    });
  })
})

router.post('/webhook', async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  if (eventType === 'checkout.session.completed') {
    console.log(`🔔  Payment received!`);
  }

  res.sendStatus(200);
});
// EXPORT
// ===============================================================
module.exports = router;