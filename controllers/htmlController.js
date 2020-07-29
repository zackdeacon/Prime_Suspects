// REQUIRE
// ========================================================
const express = require("express");
const Sequelize = require('sequelize');
const router = express.Router();
const db = require("../models/");
const Op = Sequelize.Op;


// ROUTES
// =======================================================

// route that selects 25 random items from the database.
router.get("/", function (req, res) {
    db.item.findAll({
        order: Sequelize.literal('rand()'),
        limit: 24
    })
        .then(function (dbitems) {
            const dbitemssJson = dbitems.map(items => items.toJSON());
            var hbsObject = { items: dbitemssJson };
            return res.render("index", hbsObject);

        }).catch(err => res.status(500).json(err));

});

// route to find all items based on search values 
router.get("/search/:value", function (req, res) {

    db.item.findAll({
        where: {
            name: {
                [Op.like]: `%${req.params.value}%`
            }
        }
    })
        .then(function (dbitems) {
            const dbitemssJson = dbitems.map(items => items.toJSON());
            var hbsObject = { searchItems: dbitemssJson };
            return res.render("search", hbsObject);

        }).catch(err => res.status(500).json(err));

});

// renders the signup page
router.get('/signup', (req, res) => {
    res.render('adduser')
})

// renders the success page
router.get("/success", (req, res) => {
    res.render('success')
})

// renders the failure page
router.get("/failure", (req, res) => {
    res.render('failure')
})

// renders the settings page
router.get('/settings', (req, res) => {
    res.render('settings')
})

// renders the login page
router.get('/login', (req, res) => {
    res.render('login')
})

// renders the developer page
router.get('/developers', (req, res) => {
    res.render('developers')
})

// renders the cart page.
// router.get("/cart/:id", (req, res) => {
//     db.cart.findOne({
//         where: {
//             id: req.params.id
//         },
//         include: [db.Blog]
//     }).then(dbUser => {

//     })
// })

// renders them logout page
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render("loggedout");
})

// renders the cart page
router.get('/cartRoute', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        db.user.findOne({
            where: {
                id: req.session.user.id
            },
            include: [{
                model: db.cart,
                include: [db.item]
            }]
        }).then(userObj => {
            const userObjJSON = userObj.toJSON();
            const finalCart = userObjJSON.cart.items;
            const hbsCartObj = { cartItems: finalCart }
            return res.render("cart", hbsCartObj)
        })
    }
})

// EXPORT
// ===============================================================
module.exports = router;