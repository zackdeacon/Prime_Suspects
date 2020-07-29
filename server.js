var express = require("express");
const session = require("express-session");
require('dotenv').config();
var db = require("./models");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
var app = express();

app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7200000
  }
}))

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// FOR HEROKU
// app.get("/seeding", (req, res) => {
//   const csv = require('csv-parser');
//   const fs = require('fs');
//   var db = require("./models");
//   let csvData = [];
//   fs.createReadStream('DatafinitiElectronicsProductsPricingData.csv')
//     .pipe(csv())
//     .on('data', (row) => {
//       csvData.push(row);
//     })
//     .on('end', () => {
//       console.log('CSV file successfully processed');
//       db.item.bulkCreate(csvData).then(function (data) {
//         res.send("seeded")
//       }).catch(err => console.log(err));
//     });
// })

const userCreateRoutes = require("./controllers/userCreateController.js");
app.use(userCreateRoutes);

const shoppingRoutes = require("./controllers/shoppingController.js");
app.use(shoppingRoutes);

const cartRoutes = require("./controllers/cartController.js");
app.use(cartRoutes);

const userAdjustRoutes = require("./controllers/adjustController.js");
app.use(userAdjustRoutes);

const stripeRoutes = require("./controllers/stripeController.js");
app.use(stripeRoutes);

app.get('/checkout', async (req, res) => {
  const session = // ... Fetch or create the Checkout Session
    res.render('checkout', { session_id: session.id });
});

var PORT = process.env.PORT || 4351;
db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App now listening on port:", PORT);
  });
});
