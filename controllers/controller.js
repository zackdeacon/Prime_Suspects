
var express = require("express");

var router = express.Router();

var db = require("../models/");

// route to find all items and then to loop over for 25 with pic price name and brand
router.get("/", function(req, res) {
  
  // res.send("hello home page");
//  let items25 = []; 
const { Op } = require("sequelize");
    db.item.findAll({
      where: {id: {
        [Op.lte]: 10
      }
    } 
    })
    .then(function(dbitems) {
      // res.json(dbitems);
      const dbitemssJson = dbitems.map(items=>items.toJSON());
      var hbsObject = { items: dbitemssJson };
      return res.render("cart", hbsObject);
    
    }).catch(err => res.status(500).json(err));

});

//creating user profiles 
router.post("/item/create", function(req, res) {
  db.item.create({
    name: req.body.name,
    prices_amountMax: req.body.priceMax,
    prices_amountMin: req.body.priceMin,
    prices_merchant: req.body.merchantName,
    brand: req.body.brand
  }).then(function(dbitem) {
      console.log(dbitem);
      res.redirect("/");
    });
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

//updating user profile with address,phone number etc. 
router.put("/item/update/:id", function(req, res) {
  db.item.update({
    // devoured: true
  },
  {
    where: {
      id: req.params.id
    }
  }
  ).then(function(dbitem) {
    res.json("/");
  });
});

//route to delete items from shopping cart 
router.delete("/api/items/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  db.item.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;