const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const verifyToken = require("./verifyToken");
require("dotenv").config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  try {
    const findUser = await user.findOne({ email });
    // console.log(findUser);
    if (findUser) {
      return res.status(409).json({ message: "User already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new user({ username, email, password: hashedPassword });
    await newUser.save();
    // console.log(d);

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await user.findOne({ email });
    // console.log(findUser.username);
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const payload = { id: findUser.id, email: findUser.email, name: findUser.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });

    res.json({ token, userId: findUser.id, name: findUser.username }); // Send name in response
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;