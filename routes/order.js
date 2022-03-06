const express = require("express");
const fetchuser = require("../middlerware/fetchuser");
const order = require("../models/orderSchema");
const router = express.Router();

router.post("/checkout", fetchuser, async (req, res) => {
  const { address, data } = req.body;

  const carts = await new order({
    address,
    data,
    user: req.user.id,
  });
  carts.save();
  res.send(carts);
});

router.get("/getcheckout", fetchuser, async (req, res) => {
  const user = req.user.id;
  const data = await cart.find({ user });
  res.send(data);
});

module.exports = router;
