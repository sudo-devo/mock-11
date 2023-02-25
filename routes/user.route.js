const express = require("express");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
require("dotenv").config();

userRoute.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    bcrypt.hash(password, 5, async (err, hash_pass) => {
      if (err) {
        console.log(err);
      } else {
        const user = new UserModel({ email, password: hash_pass });
        await user.save();
        res.send({ msg: "User Registered" });
      }
    });
  } catch (err) {
    res.send("Error in registration");
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_pas = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_pas, (err, result) => {
        if (result) {
          const token = jwt.sign({ user_Id: user[0]._id }, process.env.KEY);
          res.send({ msg: "Login Succesfully", token: token });
        } else {
          res.send("Please enter right credentials");
        }
      });
    }
  } catch (err) {
    res.send({ msg: "Error in login" });
    console.log(err);
  }
});

module.exports = {
  userRoute,
};
