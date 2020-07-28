const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();

const db = require("../models/");
const Op = Sequelize.Op;
// route to find all items and then to loop over for 25 with pic price name and brand
router.get("/", function (req, res) {

  // res.send("hello home page");
//  let items25 = []; 
    db.item.findAll({
      order:  Sequelize.literal('rand()'),
      limit: 24
  })
    .then(function (dbitems) {
      // res.json(dbitems);
      const dbitemssJson = dbitems.map(items => items.toJSON());
      var hbsObject = { items: dbitemssJson };
      return res.render("index", hbsObject);
    
    }).catch(err => res.status(500).json(err));

});

// route to find all items based on search values 
router.get("/search/:value", function (req, res) {

      db.item.findAll({
        where: {name: {
            [Op.like]: `%${req.params.value}%`
        }
    }
    })
      .then(function (dbitems) {
        // res.json(dbitems);
        const dbitemssJson = dbitems.map(items => items.toJSON());
        var hbsObject = { searchItems: dbitemssJson };
        return res.render("search", hbsObject);
      
      }).catch(err => res.status(500).json(err));
  
  });

router.get('/signup',(req,res)=>{
    res.render('adduser')
})

router.get("/success", (req, res) => {
    res.render('success')
})

router.get("/failure", (req, res) => {
    res.render('failure')
})
router.get('/settings',(req,res)=>{
    res.render('settings')
})

router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/developers',(req,res)=>{
    res.render('developers')
})

router.get("/cart/:id",(req,res)=>{
    db.cart.findOne({
        where:{
            id:req.params.id
        },
        include:[db.Blog]
    }).then(dbUser=>{
        // const hbsUser = dbUser.toJSON();
        // res.render("cart",hbsUser)
    })
})


// EXPORT
// ===============================================================
module.exports = router;