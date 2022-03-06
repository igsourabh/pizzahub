const jwt = require("jsonwebtoken");
const JWT_SECTET = process.env.SECRET_KEY;

const express = require("express");

const fetchuser = (req, res, next) => {
  const token = req.header("auth-key");
  if (!token) {
    res.status(401).send({ error: "please authenticate the user" });
  }
  try {
    const data = jwt.verify(token, JWT_SECTET);
    req.user = data.user;
    next();
  } catch (error) {
    console.error({token:"token not avilable", error: error.message });
    res.status(401).json({ error: "please authenticate the usear" });
  }
};
module.exports = fetchuser;
