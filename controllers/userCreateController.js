const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    db.user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        phoneNumber: req.body.phoneNumber
    }).then(userData => {
        res.json(userData.id)
    }).catch(err => {
        res.status(500).end();
    })
})



router.post('/login', (req, res) => {
    db.user.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send("user doesnt exist")
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                db.cart.create({
                    userId: user.id
                }).then(function(cart){
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    city: user.city,
                    state: user.state,
                    zip: user.zip,
                    phoneNumber: user.phoneNumber,  
                    cartId: cart.id              
                }
                res.send("login successful!");
            })
            } else {
                res.status(401).send("wrong password")
            }
        }
    }).catch(err => {
        return res.status(500).end();
    })
})

router.get("/readsessions", (req, res) => {
    res.json(req.session)
})

router.get('/cartRoute', (req, res) => {
    if(!req.session.user){
        res.redirect('/login')
    } else {
        db.user.findOne({
            where:{
                id:req.session.user.id
            },
            include:[{model: db.cart,
            include:[db.item]}]
        }).then(userObj=>{
         const userObjJSON = userObj.toJSON();
        //  console.log('-------------')
         const finalCart = userObjJSON.cart.items;
         const hbsCartObj = {cartItems: finalCart}
         return res.render("cart", hbsCartObj)
        //  res.render("cart",userObjJSON)
})
    }

})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('logged out!');
})

// EXPORT
// ===============================================================
module.exports = router;