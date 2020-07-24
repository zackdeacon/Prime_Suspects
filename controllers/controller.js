
var express = require("express");

var router = express.Router();

var db = require("../models/");

// route to find all items 
router.get("/", function (req, res) {

  // res.send("hello home page");

  db.item.findAll()

    .then(function (dbitems) {
      res.json(dbitems);
    }).catch(err => res.status(500).json(err));

});

//creating user profiles 
router.post("/item/create", function (req, res) {
  db.item.create({
    name: req.body.name,
    prices_amountMax: req.body.priceMax,
    prices_amountMin: req.body.priceMin,
    prices_merchant: req.body.merchantName,
    brand: req.body.brand
  }).then(function (dbitem) {
    console.log(dbitem);
    res.redirect("/");
  });
});

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

//updating user profile with address,phone number etc. 
router.put("/item/update/:id", function (req, res) {
  db.item.update({
    // devoured: true
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(function (dbitem) {
    res.json("/");
  });
});

//route to delete items from shopping cart 
router.delete("/api/items/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  db.item.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// API ROUTES 
// ===============================================================
router.get("/api/users/:id", function(req, res) {

  db.user.findOne({
    where: {
      id: req.params.id
    },
  }).then(function(result) {
    res.sendFile("adduser.html");
  }).catch(err => res.status(500).json(err));
})

router.get("/api/users/", function(req, res) {

  db.user.findAll({
  }).then(function(dbPost) {
    res.json(dbPost);
  }).catch(err => res.status(500).json(err));
})

router.post("/api/users", function (req, res) {
  db.user.create(req.body).then(function (result) {
    res.json(result);
  });
});

router.put("/api/users", function (req, res) {
  db.user.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function (result) {
      res.json(result);
    }).catch(err => res.status(500).json(err));
})

// EXPORT
// ===============================================================
module.exports = router;