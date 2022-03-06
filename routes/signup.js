const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlerware/fetchuser");
const JWT_SECTET = process.env.SECRET_KEY;

router.post(
  "/signup",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        sucess = false;
        return res.json({ error: "this user is already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECTET);
      sucess = true;
      res.json({ sucess, user: authtoken });
    } catch (error) {
      console.error(error.message);
    }
  }
);

// login
router.post(
  "/login",
  [
    body("email", "please enter your email address").isEmail(),
    body("password", "please enter your password").exists(),
  ],
  async (req, res) => {
    let sucess = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        sucess = false;
        return res
          .json({ sucess, error: "please login with correct credentials" })
          .status(401);
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        sucess = false;
        return res
          .json({ sucess, error: "please login with correct credentials" })
          .status(401);
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECTET);
      sucess = true;
      res.status(200).json({ sucess, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
