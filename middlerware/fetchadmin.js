const jwt = require("jsonwebtoken");
const JWT_SECTET = process.env.SECRET_KEY;

const Admin = require("../models/adminSchema");

const fetchadmin = async (req, res, next) => {
  try {
    const token = req.header("admin-token");
    

    if (!token) {
      return res.status(401).json({ error: "please authenticate the user" });
    }
    const data = jwt.verify(token, JWT_SECTET);
    req.admin = data.admin
   
    next();
  } catch (error) {
    res.status(401).json({ error: "please authenticate the user" });
  }
};

module.exports = fetchadmin;
