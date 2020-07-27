const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

router.get('/id', async (req, res) => {
  const session = // ... Fetch or create the Checkout Session
  res.json({session_id: session.id});
});

router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity, locale } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(', '),
    mode: 'payment',
    locale: locale,
    line_items: [
      {
        price: process.env.PRICE,
        quantity: quantity
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  });

  res.send({
    sessionId: session.id,
  });
});

// // THIS IS FOR STRIPE
// router.get('/public-keys', (req, res) => {
//   res.send({ key: process.env.STRIPE_PUBLISHABLE_KEY })
// })

// // THIS IS FOR STRIPE BUT IS NOT HOOKED UP
// router.post('/my-route', (req, res) => {
//   console.log('body', req.body)
//   // PUT DATA IN DB
//   res.send(req.body);
// })

// // THIS IS FOR STRIPE WEBHOOKS. WE DON'T HAVE TO USE, BUT I WOULD LIKE TO
// router.post('/webhook', (req, res) => {
//   const event = req.body;

//   switch (event.type) {
//     case 'checkout.session.completed':
//       const session = event.data.object;
//       console.log("Checkout Session ID: ", session.id)
//       break;

//     case 'payment_intent.created':
//       const paymentIntent = event.data.object
//       console.log('PaymentIntent Created ', paymentIntent.id)
//       break;

//     default:
//       console.log('Unknown event type: ' + event.type)
//   }
//   res.send({ message: 'success' });
// })

// EXPORT
// ===============================================================
module.exports = router;