const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");


// NOT COMPLETE updating user profile with address,phone number etc. 
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


  // EXPORT
// ===============================================================
module.exports = router;