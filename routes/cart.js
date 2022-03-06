const express = require("express");
const fetchuser = require("../middlerware/fetchuser");
const cart = require("../models/cartSchema");
const router = express.Router();

router.post("/addtocart", fetchuser, async (req, res) => {
  try {
    const findcart = await cart.findOne({ user: req.user.id });

    if (findcart) {
      // return res.status(400).json({ error: "cart is alerady exist" }
      // );

      const updatecart = await cart.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            details: req.body.details,
          },
        }
      );
      res.status(200).json(updatecart);
    } else {
      const carts = await new cart({
        details: req.body.details,
        user: req.user.id,
      });
      carts.save();
      res.send(carts);
    }
  } catch (error) {
    console.log(error.message);
    res.json(500).json({ error: "internal server error" });
  }
});

router.get("/getcartorder", fetchuser, async (req, res) => {
  const user = req.user.id;
  const data = await cart
    .find({ user })
    .select("-user")
    .select("-updatedAt")
    .select("-createdAt")
    .select("-_id")
    .select("-__v");
  res.send(data);
});

module.exports = router;

// const express = require("express");
// const fetchuser = require("../middlerware/fetchuser");
// const cart = require("../models/cartSchema");
// const router = express.Router();

// router.post("/addtocart", fetchuser, async (req, res) => {
//   const {  address, details } = req.body;

//   const carts = await  cart.create({
//     address,
//     details,
//     user: req.user.id,
//   });
//   carts.save();
//   res.send(carts);
// });

// router.get("/getcartorder", fetchuser, async (req, res) => {
//   const user = req.user.id;
//   const data = await cart.find({ user });
//   res.send(data);
// });

// module.exports = router;
