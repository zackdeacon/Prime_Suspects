var express = require("express");
const session = require("express-session");
require('dotenv').config();
var db = require("./models");

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


var PORT = process.env.PORT || 4351;
db.sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
    console.log("App now listening on port:", PORT);
  });
});
