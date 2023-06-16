const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route("/signup").post(
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ username });

    // Create  new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Generate a JWT token
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ userId: newUser._id, exp: exp }, "adi123");

    res.status(201).json({
      token,
    });
  })
);

router.route("/login").post(
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    console.log("username:", username);
    console.log("password:", password);
    console.log("user:", user);

    if (user) {
      const passwordMatch = await bcrypt.compare(
        req.params.password,
        password,
        function (err, passwordMatch) {
          if (err) {
            console.log(err);
          } else {
            console.log(passwordMatch);
          }
        }
      );

      const exp = Date.now() + 1000 * 60 * 60 * 24 * 7;
      const token = jwt.sign({ userId: user._id, exp: exp }, "adi123");

      res.status(200).json({
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid employee ID or password",
      });
    }
  })
);

module.exports = router;
