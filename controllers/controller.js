
var express = require("express");

var router = express.Router();

var db = require("../models/");


router.get("/", function(req, res) {
  
  // res.send("hello home page");

    db.item.findAll()

    .then(function(dbitems) {
      res.json(dbitems);
    }).catch(err => res.status(500).json(err));

});

router.get('/public-keys', (req, res) => {
  res.send({ key: process.env.STRIPE_PUBLISHABLE_KEY})
})

router.post('/my-route', (req, res) => {
  console.log('body', req.body)
  // PUT DATA IN DB
  res.send(req.body);
})

router.post('/webhook', (req, res) => {
  const event = req.body;

  switch(event.type) {
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

// router.get("/burgers", function(req, res) {

//   db.Burger.findAll()

//     .then(function(dbBurger) {
//       console.log(dbBurger);
//       const dbBurgersJson = dbBurger.map(burger=>burger.toJSON());
//       var hbsObject = { burger: dbBurgersJson };
//       return res.render("index", hbsObject);
//     });
// });

// router.post("/burgers/create", function(req, res) {
//   db.Burger.create({
//     burger_name: req.body.burger_name
//   }).then(function(dbBurger) {
//       console.log(dbBurger);
//       res.redirect("/");
//     });
// });


// router.put("/burgers/update/:id", function(req, res) {
//   db.Burger.update({
//     devoured: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbBurger) {
//     res.json("/");
//   });
// });

module.exports = router;