const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");

//route to delete items from shopping cart 
router.delete("/cartRoute/:id", function (req, res) {
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

  //PLACEHOLDER FROM JOE route to add items to shopping cart 
router.post("/api/items", function (req, res) {
    db.cart.findOne({
        where:{
            id:req.session.user.cartId
        }
  }).then(cartObj=>{
      cartObj.addItem(req.body.itemId)
      res.json(cartObj);
    })
})

router.get("/api/carts/:id", function (req, res){
  db.cart.findOne({
    where: {
      id: req.params.id
    }, include: [db.item]
  }).then(function(cart){
    res.json(cart);
  })
})


//   router.get('/cart',(req,res)=>{
//     res.render('cart')
// })

  // EXPORT
// ===============================================================
module.exports = router;