const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { generateToken } = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;

    if (!email || !password || !fullname) {
      return res.status(400).send("Invalid Request");
    }

    if (await userModel.findOne({ email: email })) {
      return res.status(401).render("index", { error: "You already have an account, Please Login." })
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          console.log(user);

          let token = generateToken(user);
          res.cookie("token", token);

          res.flash("error", "Created Successfully");
          return res.redirect("/");
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Invalid Request");
    }

    let user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(401).send("Email or Password incorrect.");
    }

    bcrypt.compare(password, user.password, async (err, result) => {
      console.log(err, result)

      if (result) {
        console.log(user);

        let token = generateToken(user);
        res.cookie("token", token);

        res.send("User Logged In successfully");
      }
      else {
        return res.status(404).render("index", { error: "Email or Password incorrect." });
      }
    });
  } catch (err) { 
    console.log(err);
  }
}

module.exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
}