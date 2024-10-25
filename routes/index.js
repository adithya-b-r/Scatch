const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const products = require('../models/product-model');

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let displayProducts = await products.find();
  res.render("shop", {products: displayProducts});
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
})

module.exports = router;