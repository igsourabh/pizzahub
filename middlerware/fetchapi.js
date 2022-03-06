const jwt = require("jsonwebtoken");
const Admin = require("../models/adminSchema");
const JWT_SECTET = process.env.SECRET_KEY;

const Notes = require("../models/adminSchema");

const fetchapi = async (req, res, next) => {
  try {
    const apikey = req.header("admin-apikey");
    if (!apikey) {
      return res.status(401).json({ error: "please provide your api key" });
    }
    const key= await Admin.findOne()
    if (!key) {
      return res.status(401).json({ error: "please provide your api key" });
        
    }
    req
    next();
  } catch (error) {
    res.status(401).json({ error: "please provide your api key" });
  }
};

module.exports = fetchapi;
