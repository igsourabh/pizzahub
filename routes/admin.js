const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
var uuid = require("uuid");
const router = express.Router();
const Admin = require("../models/adminSchema");
const { body, validationResult } = require("express-validator");
const fetchadmin = require("../middlerware/fetchadmin");
const fetchapi = require("../middlerware/fetchapi");
const notesSchema = require("../models/notesSchema");
const JWT_SECTET = process.env.SECRET_KEY;


router.post(
  "/createadmin",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res.status(400).json({ error: "aready exists" });
      }

      var id = uuid.v4();
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
        apikey: id,
      });

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const key = {
        adminkey: {
          id: admin.apikey,
        },
      };
      const authToken = jwt.sign(data, JWT_SECTET);

      res.json({ authtoke: authToken, apikey: admin.apikey });
    } catch (error) {
      console.error(error.mssage);
      res.status(500).json({ error: "internal server error" });
    }
  }
);
router.post(
  "/adminlogin",
  [body("email").isEmail(), body("password").exists()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(401)
          .json({ error: "please enter the correct credentials" });
      }
      const Passwordcompare = bcrypt.compare(password, admin.password);
      if (!Passwordcompare) {
        return res
          .status(401)
          .json({ error: "please enter the correct credentials" });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECTET);

      res.json(authToken);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

// fetching admin details
router.get("/getadmin", fetchadmin, async (req, res) => {
  const id = req.admin.id;
  const data = await Admin.findById(id);

  res.json(data);
});

// get all notes useing admins api key
router.use("/", fetchadmin, async (req, res) => {
  const apikey = req.header("admin-apikey");
  const match = await Admin.findOne({ apikey });
  if (!match) {
    return res.status(401).json({ error: "please enter valide api key" });
  }
  const data = await notesSchema.find().select("title").select("description").select("tag").select("date")
  res.json(data.reverse());
});

module.exports = router;
