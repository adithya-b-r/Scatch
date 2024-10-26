const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const products = require('../models/product-model');

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let displayProducts = await products.find();
  res.render("shop", { products: displayProducts });
});

router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
  res.send("Working. Product ID: "+req.params.id)
})

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
})

module.exports = router;