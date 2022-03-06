const express = require("express");
const fetchuser = require("../middlerware/fetchuser");
const { body, validationResult } = require("express-validator");
const Address = require("../models/addressSchema");
const router = express.Router();

// save user  addres to data base
router.post(
  "/address",
  fetchuser,
  [
    body("name", "please enter the name").isLength({ min: 1 }),
    body("phonenumber", "please enter the phonenumber").isLength({ min: 1 }),
    body("address", "please enter the address").isLength({ min: 1 }),
    body("city", "please  enter the city").isLength({ min: 1 }),
    body("state", "please  select the state").isLength({ min: 1 }),
    body("pincode", "please enter the pincode").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const find = await Address.findOne({ user: req.user.id });
      if (find) {
        return res.json("address already exist").status(500);
      }
      const { name, phonenumber, address, city, state, pincode } = req.body;
      const useraddress = await new Address({
        user: req.user.id,
        name: name,
        phonenumber: phonenumber,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
      });
      const savenote = await useraddress.save();

      res.json(savenote);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
);

// geting user address
router.get("/getaddress", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await Address.find({ user: userid }).select();
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// deleteing user address
router.delete("/deleteaddress/:id", fetchuser, async (req, res) => {
  try {
    let address = await Address.findById(req.params.id);

    if (address.user.toString() !== req.user.id) {
      res.status(401).json({ error: "not allowed" });
    }
    address = await Address.findByIdAndDelete(req.params.id);
    res.send("sucessfully deleted");
  } catch (error) {
    res.status(404).json({ error: "notfound" });
  }
});

module.exports = router;
