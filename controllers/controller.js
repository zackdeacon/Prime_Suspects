
var express = require("express");

var router = express.Router();

var db = require("../models/");

// route to find all items 
router.get("/", function(req, res) {
  
  // res.send("hello home page");

    db.item.findAll()

    .then(function(dbitems) {
      res.json(dbitems);
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