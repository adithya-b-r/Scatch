const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owners-model")

router.get("/admin", (req, res) => {
  let success = req.flash("success");
  res.render("createproducts", { success })
});

// use set NODE_ENV=development 
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV == "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(401)
        .send("You don't have permission to create a new owner.");
    }

    let { fullname, email, password } = req.body;

    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password
    });

    res.status(201).send("Created Owner: " + createdOwner);
  });
}

module.exports = router;