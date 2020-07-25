const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");

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

  router.get('/cart',(req,res)=>{
    res.render('cart')
})

  // EXPORT
// ===============================================================
module.exports = router;