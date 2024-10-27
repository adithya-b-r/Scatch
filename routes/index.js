const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const products = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  let displayProducts = await products.find();
  let success = req.flash("success");
  res.render("shop", { products: displayProducts, success });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
})

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  console.log(user.cart);
  res.render("cart");
})

router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
})

module.exports = router;