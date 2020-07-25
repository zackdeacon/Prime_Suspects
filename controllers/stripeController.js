
const express = require("express");
const router = express.Router();



// THIS IS FOR STRIPE
router.get('/public-keys', (req, res) => {
    res.send({ key: process.env.STRIPE_PUBLISHABLE_KEY })
  })
  // THIS IS FOR STRIPE BUT IS NOT HOOKED UP
  router.post('/my-route', (req, res) => {
    console.log('body', req.body)
    // PUT DATA IN DB
    res.send(req.body);
  })
  // THIS IS FOR STRIPE WEBHOOKS. WE DON'T HAVE TO USE, BUT I WOULD LIKE TO
  router.post('/webhook', (req, res) => {
    const event = req.body;
  
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log("Checkout Session ID: ", session.id)
        break;
  
      case 'payment_intent.created':
        const paymentIntent = event.data.object
        console.log('PaymentIntent Created ', paymentIntent.id)
        break;
  
      default:
        console.log('Unknown event type: ' + event.type)
    }
    res.send({ message: 'success' });
  })

  // EXPORT
// ===============================================================
module.exports = router;