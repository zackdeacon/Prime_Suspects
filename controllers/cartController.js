const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");

//route to delete items from shopping cart 
// router.delete("/api/carts/:id", (req, res) => {
//   db.cartitems.destroy({
//     where: {
//       itemId: req.params.id
//     }
//   }).then(function (cartItemDelete) {
//     res.json(cartItemDelete);
//   }).catch(err => {
//     res.status(500).end()
//   })
// })

//PLACEHOLDER FROM JOE route to add items to shopping cart 
router.post("/api/items", function (req, res) {
  db.cart.findOne({
    where: {
      id: req.session.user.cartId
    }
  }).then(cartObj => {
    cartObj.addItem(req.body.itemId)
    res.json(cartObj);
  })
})

router.get("/api/carts/:id", function (req, res) {
  db.cart.findOne({
    where: {
      id: req.params.id
    }, include: [db.item]
  }).then(function (cart) {
    console.log(cart)
    res.json(cart);
  })
})


//   router.get('/cart',(req,res)=>{
//     res.render('cart')
// })

// EXPORT
// ===============================================================
module.exports = router;