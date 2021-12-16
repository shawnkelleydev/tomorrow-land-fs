var express = require("express");
var router = express.Router();
const User = require("../models").User;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const body = req.body;
    let hash;

    //encrypt password if provided
    if (
      body.password !== "" &&
      body.password !== null &&
      body.password !== undefined
    ) {
      hash = bcrypt.hashSync(body.password, salt);
    } else {
      hash = null;
    }

    //store encrypted password
    const newUser = {
      firstName: body.firstName,
      lastName: body.lastName,
      emailAddress: body.emailAddress,
      password: hash,
    };

    //add user to database
    await User.create(newUser);
    res.set("Location", "/");
    res.status(201).send();
  } catch (err) {
    console.error("Man down! ", err);
    if (err.name.toLowerCase().includes("sequelize")) {
      //return validation errors
      const errors = err.errors.map((err) => err.message);
      res.status(400).json({ errors });
    }
  }
});

module.exports = router;
