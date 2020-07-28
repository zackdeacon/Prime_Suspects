const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");


// NOT COMPLETE updating user profile with address,phone number etc. 
router.put("/item/update/:id", function (req, res) {
    db.item.update({
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

  router.get('/users',(req,res)=>{
    if(!req.session.user){
      res.redirect('/login')
    }else{
    res.render('users')
    }
})


  // EXPORT
// ===============================================================
module.exports = router;