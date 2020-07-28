const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

// router.get('/checkout', async (req, res) => {
//   const session = // ... Fetch or create the Checkout Session
//   res.render('checkout', { session_id: session.id });
// });

router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

// router.post('/create-checkout-session', async (req, res) => {
//   const domainURL = process.env.DOMAIN;
//   db.cart.findOne({
//     where: {
//       id: req.params.id
//     }, include: [db.item]
//   }).then()
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [],
//     mode: 'payment',
//     // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
//     success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
//     cancel_url: `${domainURL}/canceled.html`,
//   });

//   res.send({
//     sessionId: session.id,
//   });
// })

router.get('/config', async (req, res) => {
  // const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  }).catch(err =>{
    console.log(err)
  })
});

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'T-shirt',
        },
        unit_amount: 2000,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://example.com/cancel',
  });

  res.send({
    sessionId: session.id,
  });
});


// EXPORT
// ===============================================================
module.exports = router;